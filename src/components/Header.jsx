import React from "react";
import Searchbar from "./Searchbar";
import { Button } from "./shadcn/button";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";

function Header() {
  const location = useLocation().pathname;
  const isHome = location === "/";

  return (
    <header
      className={cn(
        "flex flex-col justify-center items-center pt-5 bg-secondary w-screen relative h-transition",
        isHome
          ? "pb-25 gap-10 max-h-[32rem] min-h-[12rem] md:min-h-[32rem]"
          : "pb-15 gap-0 max-h-[12rem] min-h-0"
      )}
    >
      <div className="flex justify-end w-main">
        <Link to={"https://github.com/"}>
          <Button className="oval-btn-icon bg-background hover:bg-accent">
            <GithubLogo />
            Github
          </Button>
        </Link>
      </div>
      <Link to={"/"}>{isHome ? <LogoLg /> : <LogoSm />}</Link>
      <Searchbar />
    </header>
  );
}

function LogoLg() {
  return (
    <img
      src="/logo_lg.svg"
      className="w-[98%] max-w-4xl"
      alt="Пригород — расписание электричек"
    />
  );
}

function LogoSm() {
  return (
    <img
      src="/logo_sm.svg"
      className="w-[98%] max-w-xs"
      alt="Пригород — расписание электричек"
    />
  );
}

function GithubLogo() {
  return <img src="/github-alt-icon-original.svg" className="w-4 h-4" alt="" />;
}

export default Header;
