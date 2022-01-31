import { PopularViewedRecommendationsList } from "@coveo/headless/product-recommendation";
import { useEffect, useState } from "react";
import { Loading } from "./loading";

export const PopularRecommendations: React.FC<{
  popularViewed: PopularViewedRecommendationsList;
}> = ({ popularViewed }) => {
  const [popularViewedState, setPopularViewedState] = useState(
    popularViewed.state
  );
  useEffect(() => {
    popularViewed.refresh();
    popularViewed.subscribe(() => setPopularViewedState(popularViewed.state));
  }, []);

  if (popularViewedState.isLoading) {
    return <Loading />;
  }

  return (
    <div>
      Popular products:
      {popularViewedState.recommendations.map((recommendation) => {
        return (
          <div key={recommendation.permanentid}>
            {recommendation.ec_shortdesc}
          </div>
        );
      })}
    </div>
  );
};
