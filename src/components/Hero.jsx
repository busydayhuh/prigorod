import { cn } from "@/lib/utils";
import { Fragment } from "react";
import { useMatch } from "react-router";
import Header from "./Header";
import Searchbar from "./Searchbar";
import { Slogan } from "./Slogan";
import { FadeIn } from "./ui/FadeIn";

function Hero() {
  const isHome = useMatch("/");
  const Wrapper =
    isHome ?
      ({ children }) => <FadeIn delay={250}>{children}</FadeIn>
    : Fragment;

  return (
    <div
      className={cn(
        "flex flex-col gap-5 lg:gap-16 w-main",
        !isHome && "lg:gap-8 items-center",
      )}
    >
      <Header />
      {isHome && <Slogan />}
      <Wrapper>
        <Searchbar />
      </Wrapper>
    </div>
  );
}

export default Hero;
