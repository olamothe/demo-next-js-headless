import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { urlManager } from "../headless/index";

const isSearchPage = (path: string) => path === "/search";

const windowExists = () => typeof window !== "undefined";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (windowExists() && isSearchPage(router.pathname)) {
    urlManager.synchronize(window.location.hash.slice(1));
  }

  return <Component {...pageProps} />;
}

export default MyApp;
