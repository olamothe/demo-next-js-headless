import React from "react";
import { searchBox, popularViewed, urlManager } from "../headless/index";
import { PopularRecommendations } from "../components/popularrecommendations";
import { Header } from "../components/header";

export const HomePage: React.FC = () => {
  return (
    <>
      <Header searchBox={searchBox} urlManager={urlManager} />
      <div>
        Home Page
        <PopularRecommendations popularViewed={popularViewed} />
      </div>
    </>
  );
};

export default HomePage;
