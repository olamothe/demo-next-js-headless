import { buildSearchBox } from "@coveo/headless";
import { searchEngine } from "./searchEngine";

export const searchBox = buildSearchBox(searchEngine);
