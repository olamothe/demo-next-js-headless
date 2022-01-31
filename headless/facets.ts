import { buildCategoryFacet, buildFacet } from "@coveo/headless";
import { searchEngine } from "./searchEngine";

export const categoryFacet = buildCategoryFacet(searchEngine, {
  options: { field: "ec_category" },
});
export const brandFacet = buildFacet(searchEngine, {
  options: { field: "ec_brand" },
});
