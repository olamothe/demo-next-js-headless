import { buildPopularViewedRecommendationsList } from "@coveo/headless/product-recommendation";
import { recommendationEngine } from "./recommendationEngine";
export const popularViewed =
  buildPopularViewedRecommendationsList(recommendationEngine);
