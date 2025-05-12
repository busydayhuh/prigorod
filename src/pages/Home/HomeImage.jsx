import RoundCorner from "@/assets/RoundCorner.svg";
import Tick from "@/assets/Tick.svg";
import Train from "@/assets/train-image.webp";

function HomeImage() {
  return (
    <figure
      id="home-img"
      className="flex items-center justify-start min-w-[320px] pointer-events-none md:pointer-events-auto"
    >
      <div className="relative max-w-[500px] sm:w-[100%] w-[90%] aspect-square rounded-[50%] bg-foreground">
        <img
          id="train"
          src={Train}
          alt="Поезд Ласточка"
          className="max-w-[569px] sm:w-[140%] w-[95%] absolute left-[15%] top-[22%]"
        />
        <img
          id="tick"
          src={Tick}
          className="absolute max-w-[150px] w-[30%] sm:top-[15%] top-[5%]"
        />
        <img
          src={RoundCorner}
          className="absolute left-[14%] md:left-[16%] top-[40%] md:top-[47%] sm:rotate-[10deg] rotate-[-20deg]"
        />
      </div>
    </figure>
  );
}

export default HomeImage;
