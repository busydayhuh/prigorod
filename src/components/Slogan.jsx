import circles from "@/assets/circles.svg";
import { useIsMobile } from "@/store/window-size/useIsMobile";

export function Slogan() {
  const isMobile = useIsMobile();

  if (isMobile)
    return (
      <div className="grid w-main">
        <div className="items-center gap-4 grid grid-cols-[3fr_1fr]">
          <span className="font-headers slogan-text">
            Всегда&nbsp;под&nbsp;рукой
          </span>
          <Line />
        </div>
        <div className="gap-4 grid grid-cols-[1fr_3fr]">
          <Line />
          <span className="font-headers text-slogan">всегда&nbsp;вовремя</span>
        </div>
        <img
          src={circles}
          className="justify-self-center mt-4 w-12 sm:w-14"
          alt="circles"
        />
      </div>
    );

  return (
    <div className="relative w-main">
      <div className="gap-4 grid grid-cols-[1.5fr_2.5fr_1fr] font-headers leading-[100%] slogan-text">
        <div>Всегда под&nbsp;рукой</div>
        <div className="flex flex-col items-end gap-2 w-full">
          <Line />
          <img src={circles} className="mr-2 mb-1 w-20" alt="circles" />
        </div>
        <div className="flex justify-end items-end">
          <span className="text-right">всегда вовремя</span>
        </div>
      </div>
    </div>
  );
}

function Line() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 563 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="8.13079e-08"
        y1="1"
        x2="563"
        y2="1.00005"
        stroke="black"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
