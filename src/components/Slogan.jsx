import circles from "@/assets/circles.svg";
import { useIsMobile } from "@/store/window-size/useIsMobile";
import { useEffect, useRef } from "react";
import { FadeIn } from "./ui/FadeIn";

export function Slogan() {
  const isMobile = useIsMobile();

  if (isMobile)
    return (
      <h1 className="grid">
        <FadeIn delay={120} direction="left" className="h-fit">
          <div className="items-center gap-4 grid grid-cols-[3fr_1fr]">
            <span className="font-headers text-slogan">
              Всегда&nbsp;под&nbsp;рукой
            </span>
            <Line />
          </div>
        </FadeIn>
        <FadeIn delay={120} direction="right" className="h-fit">
          <div className="gap-4 grid grid-cols-[1fr_3fr]">
            <Line />
            <span className="font-headers text-slogan">
              всегда&nbsp;вовремя
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={300} className="justify-self-center h-fit">
          <img src={circles} className="mt-4 w-12 sm:w-14" alt="circles" />
        </FadeIn>
      </h1>
    );

  return (
    <div className="relative">
      <div className="gap-4 grid grid-cols-[1.5fr_2.5fr_1fr] font-headers text-slogan leading-[100%]">
        <FadeIn delay={50}>
          <div>Всегда под&nbsp;рукой</div>
        </FadeIn>

        <div className="flex flex-col justify-center items-end gap-2 w-full">
          <Line />
          <FadeIn delay={650} direction="left">
            <img src={circles} className="mr-2 mb-1 w-20" alt="circles" />
          </FadeIn>
        </div>

        <FadeIn delay={550}>
          <div className="flex justify-end items-end">
            <span className="text-right">всегда вовремя</span>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

function Line() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const length = ref.current.getTotalLength();
    ref.current.style.strokeDasharray = `${length}`;
    ref.current.style.strokeDashoffset = `${length}`;
  }, []);

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 563 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        ref={ref}
        className="line"
        pathLength="100"
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
