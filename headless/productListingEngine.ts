import { buildProductListingEngine } from "@coveo/headless/product-listing";

export const productListingEngine = buildProductListingEngine({
  configuration: {
    organizationId: "saqdemo5fjlck8f",
    accessToken: "xx2cdb71a4-0406-4d9f-ad2a-4bcf524eabef",
    platformUrl: "https://platformdev.cloud.coveo.com",
  },
});
