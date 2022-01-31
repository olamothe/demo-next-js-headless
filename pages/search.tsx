import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Loading } from "../components/loading";
import {
  brandFacet,
  resultList,
  searchBox,
  searchStatus,
  urlManager,
} from "../headless/index";
import { Header } from "../components/header";

export const SearchPage: React.FC = () => {
  const [facetState, setFacetState] = useState(brandFacet.state);
  const [resultListState, setResultListState] = useState(resultList.state);
  const [searchStatusState, setSearchStatusState] = useState(
    searchStatus.state
  );
  const router = useRouter();

  const subscribeToStateChangesAndReturnCleanup = () => {
    const allunsubscribers: { (): void }[] = [];
    allunsubscribers.push(
      searchStatus.subscribe(() => setSearchStatusState(searchStatus.state))
    );
    allunsubscribers.push(
      brandFacet.subscribe(() => setFacetState(brandFacet.state))
    );
    allunsubscribers.push(
      resultList.subscribe(() => setResultListState(resultList.state))
    );
    allunsubscribers.push(
      urlManager.subscribe(() => {
        router.push({
          hash: urlManager.state.fragment,
        });
      })
    );
    return function cleanup() {
      allunsubscribers.forEach((unsub) => unsub());
    };
  };

  useEffect(subscribeToStateChangesAndReturnCleanup, []);

  if (!searchStatusState.firstSearchExecuted || searchStatusState.isLoading) {
    return (
      <>
        <Header searchBox={searchBox} urlManager={urlManager} />
        <Loading />
      </>
    );
  }

  if (searchStatusState.hasResults) {
    return (
      <>
        <Header searchBox={searchBox} urlManager={urlManager} />

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
                      onChange={() => brandFacet.toggleSelect(facetValue)}
                    ></input>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            {resultListState.results.map((result) => {
              return (
                <div key={result.uniqueId}>
                  <a href={result.clickUri}>{result.title}</a>
                  <p>{result.excerpt}</p>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
};

export default SearchPage;
