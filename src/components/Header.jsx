import prigorodLogo from "@/assets/prigorod-logo.png";
import { useGeocode } from "@/hooks/useGeocode";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import { Link, useLocation } from "react-router";
import Searchbar from "./Searchbar";

function Header() {
  const location = useLocation().pathname;
  const isHome = location === "/";
  const { geo } = useGeocode();

  return (
    <header
      className={cn(
        "flex flex-col justify-center items-center gap-3 h-transition",
      )}
    >
      <div className="bg-foreground pt-5 pb-5 w-full">
        <div className="flex justify-between items-center w-main">
          <Link to={"/"}>
            <img
              src={prigorodLogo}
              className="w-36"
              alt="Пригород — расписание электричек"
            />
          </Link>
          {geo && (
            <div className="flex items-baseline gap-1 text-primary-foreground text-xs">
              <MapPin className="size-3" />
              <span>{geo.city}</span>
            </div>
          )}
        </div>
      </div>
      <div
        className={cn(
          "mt-4 w-6xl max-w-[96%] h-transition",
          isHome ? "max-h-128" : "max-h-0 invisible mt-0",
        )}
      >
        <h1 className="mb-3 md:mb-6 font-extrabold text-4xl md:text-6xl">
          Куда поедем?
        </h1>
        <p className="text-sm md:text-base">Найти подходящую электричку:</p>
      </div>
      <Searchbar />
    </header>
  );
}

export default Header;
