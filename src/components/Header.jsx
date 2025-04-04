import React from "react";
import Searchbar from "./Searchbar";
import { ShadowBtn } from "./ui";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import githubLogo from "@/assets/github-alt-icon-original.svg";
import heroImg from "@/assets/hero_homepage.png";
import heroSm from "@/assets/hero_sm.png";
import heroLg from "@/assets/hero_lg.png";
import logo from "@/assets/logo.png";

function Header() {
  const location = useLocation().pathname;
  const isHome = location === "/";

  return (
    <header
      className={cn(
        "flex flex-col justify-center items-center pt-5 bg-secondary border-b-4 border-b-foreground w-screen relative h-transition",
        isHome
          ? "pb-25 gap-2 max-h-[32rem] min-h-[12rem] md:min-h-[32rem]"
          : "pb-15 gap-0 max-h-[12rem] min-h-0"
      )}
    >
      <div className="flex justify-end w-main">
        <a href="https://github.com/busydayhuh/prigorod" target="_blank">
          <ShadowBtn>
            <GithubLogo />
            Github
          </ShadowBtn>
        </a>
      </div>
      <Link to={"/"}>{isHome ? <LogoLg /> : <LogoSm />}</Link>
      <Searchbar />
    </header>
  );
}

function LogoLg() {
  return (
    <picture>
      <img
        src={heroImg}
        srcSet={`${heroImg} 1200w, ${heroLg} 900w, ${heroSm} 600w`}
        className="w-[min(1120px,95%)] aspect-[619/200] mx-auto"
        alt="Пригород — расписание электричек"
      />
    </picture>
  );
}

function LogoSm() {
  return (
    <img
      src={logo}
      className="md:w-sm md:block hidden"
      alt="Пригород — расписание электричек"
    />
  );
}

function GithubLogo() {
  return <img src={githubLogo} className="w-4 h-4" alt="" />;
}

export default Header;
