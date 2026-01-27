import Header from "./Header";
import Searchbar from "./Searchbar";
import { Slogan } from "./Slogan";

function Hero() {
  return (
    <div className="flex flex-col justify-center items-center gap-5 lg:gap-10 w-main">
      <Header />
      <Slogan />
      <Searchbar />
    </div>
  );
}

export default Hero;
