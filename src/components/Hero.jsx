import { cn } from "@/lib/utils";
import { useMatch } from "react-router";
import Header from "./Header";
import Searchbar from "./Searchbar";
import { Slogan } from "./Slogan";

function Hero() {
  const isHome = useMatch("/");

  return (
    <div
      className={cn(
        "flex flex-col gap-5 lg:gap-16 w-main",
        !isHome && "lg:gap-8 items-center",
      )}
    >
      <Header />
      {isHome && <Slogan />}
      <Searchbar />
    </div>
  );
}

export default Hero;
