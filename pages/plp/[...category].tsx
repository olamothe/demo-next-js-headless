import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Header } from "../../components/header";
import { Loading } from "../../components/loading";
import {
  productListing,
  facetBrandListing,
  demoUrlProductListing,
} from "../../headless/productListing";
import { searchBox, urlManager } from "../../headless/index";

export const ProductListingPage: React.FC = () => {
  const [facetState, setFacetState] = useState(facetBrandListing.state);
  const [productListingState, setProductListingState] = useState(
    productListing.state
  );

  const subscribeToStateChangesAndReturnCleanup = () => {
    const allunsubscribers: { (): void }[] = [];
    allunsubscribers.push(
      facetBrandListing.subscribe(() => setFacetState(facetBrandListing.state))
    );
    allunsubscribers.push(
      productListing.subscribe(() =>
        setProductListingState(productListing.state)
      )
    );
    return function cleanup() {
      allunsubscribers.forEach((unsub) => unsub());
    };
  };

  useEffect(subscribeToStateChangesAndReturnCleanup, []);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    productListing.setUrl(demoUrlProductListing + router.asPath);
    productListing.refresh();
  }, [router.isReady, router.asPath]);

  if (productListing.state.isLoading) {
    return (
      <>
        <Header urlManager={urlManager} searchBox={searchBox} />
        <Loading />
      </>
    );
  }

  return (
    <>
      <Header urlManager={urlManager} searchBox={searchBox} />
      <div>
        <div>
          <ul>
            {facetState.values.map((facetValue) => {
              return (
                <li key={facetValue.value}>
                  {facetValue.value} ({facetValue.numberOfResults}){" "}
                  <input
                    type="checkbox"
                    checked={facetValue.state === "selected"}
                    onChange={() => facetBrandListing.toggleSelect(facetValue)}
                  ></input>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          {productListingState.products.map((product) => {
            return (
              <div key={product.permanentid}>
                <a href={product.clickUri}>{product.ec_name}</a>
                <p>{product.ec_shortdesc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProductListingPage;
