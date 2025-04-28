import prigorodLogo from "@/assets/prigorod-logo.png";
import { cn } from "@/lib/utils";
import useGeocode from "@/services/useGeocode";
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
        "flex flex-col justify-center items-center gap-3 h-transition"
      )}
    >
      <div className="pt-5 pb-5 bg-foreground w-screen">
        <div className="flex items-center justify-between w-main">
          <Link to={"/"}>
            <img
              src={prigorodLogo}
              className="w-36"
              alt="Пригород — расписание электричек"
            />
          </Link>
          {geo && (
            <div className="text-primary-foreground text-xs flex gap-1 items-baseline">
              <MapPin className="size-3" />
              <span>{geo.city}</span>
            </div>
          )}
        </div>
      </div>
      <div
        className={cn(
          "max-w-[96%] w-6xl mt-4 h-transition",
          isHome ? "max-h-[32rem]" : "max-h-[0rem] invisible mt-0"
        )}
      >
        <h1 className="md:text-6xl text-4xl font-extrabold md:mb-6 mb-3">
          Куда поедем?
        </h1>
        <p className="md:text-base text-sm">Найти подходящую электричку:</p>
      </div>
      <Searchbar />
    </header>
  );
}

export default Header;
