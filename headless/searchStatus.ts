import { buildSearchStatus } from "@coveo/headless";
import { searchEngine } from "./searchEngine";

export const searchStatus = buildSearchStatus(searchEngine);
