import { buildUrlManager } from "@coveo/headless";
import { searchEngine } from "./searchEngine";

export const urlManager = buildUrlManager(searchEngine, {
  initialState: { fragment: "" },
});
