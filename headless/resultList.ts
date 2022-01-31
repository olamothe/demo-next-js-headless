import { buildResultList } from "@coveo/headless";
import { searchEngine } from "./searchEngine";

export const resultList = buildResultList(searchEngine);
