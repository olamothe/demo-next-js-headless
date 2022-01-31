import { SearchBox, UrlManager } from "@coveo/headless";
import { Navigation } from "./navigation";
import { SearchboxHeader } from "./searchboxheader";

export const Header: React.FC<{
  urlManager: UrlManager;
  searchBox: SearchBox;
}> = ({ urlManager, searchBox }) => {
  return (
    <div>
      <Navigation searchbox={searchBox} />
      <SearchboxHeader urlManager={urlManager} searchBox={searchBox} />
    </div>
  );
};
