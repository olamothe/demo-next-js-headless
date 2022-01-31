import {
  buildProductListing,
  buildFacet,
} from "@coveo/headless/product-listing";
import { productListingEngine } from "./productListingEngine";

export const demoUrlProductListing = "https://saqdemo.coveodemo.com";

export const productListing = buildProductListing(productListingEngine, {
  options: {
    url: demoUrlProductListing,
  },
});

export const facetBrandListing = buildFacet(productListingEngine, {
  options: { field: "ec_brand" },
});
