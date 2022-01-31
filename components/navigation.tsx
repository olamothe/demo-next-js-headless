import { useRouter } from "next/router";
import { SearchBox } from "@coveo/headless";
import { searchBox } from "../headless/searchbox";

export const Navigation: React.FC<{ searchbox: SearchBox }> = ({
  searchbox,
}) => {
  const router = useRouter();
  const makeLink = (href: string, title: string) => {
    return (
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault();
          searchBox.updateText("");
          router.push({
            pathname: href,
          });
        }}
      >
        {title}
      </a>
    );
  };
  return (
    <ul>
      <li>{makeLink("/", "Go to home page")}</li>
      <li>{makeLink("/plp/porto", "Go to product listing porto")}</li>
    </ul>
  );
};
