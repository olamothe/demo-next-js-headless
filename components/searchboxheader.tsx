import { SearchBox, UrlManager } from "@coveo/headless";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export const SearchboxHeader: React.FC<{
  searchBox: SearchBox;
  urlManager: UrlManager;
}> = ({ searchBox, urlManager }) => {
  const router = useRouter();

  const submit = () => {
    searchBox.submit();
    if (router.pathname !== "/search") {
      urlManager.synchronize(`q=${searchBox.state.value}`);
      router.push({ hash: urlManager.state.fragment, pathname: "/search" });
    }
  };

  const [searchBoxState, setSearchboxState] = useState(searchBox.state);

  useEffect(() => {
    const unsub = searchBox.subscribe(() => setSearchboxState(searchBox.state));
    return function cleanup() {
      unsub();
    };
  }, []);

  return (
    <div>
      <input
        value={searchBoxState.value}
        placeholder="Search"
        onSubmit={searchBox.submit}
        type="search"
        onKeyDown={(e) => (e.code === "Enter" ? submit() : null)}
        onChange={(e) => searchBox.updateText(e.target.value)}
      ></input>
    </div>
  );
};
