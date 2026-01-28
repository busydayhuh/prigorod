import illustration from "@/assets/illustration.svg";
import { ArrowButton } from "@/components/ui/ArrowButton";

export default function TrainCapacityInfo() {
  return (
    <div className="flex flex-col px-6 md:px-8 lg:px-10 pt-6 lg:pt-8 pb-14 border-2 rounded-[40px] shadow-(--row-shadow)">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-headers text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          3.24 млн
        </h3>
        <a href="https://company.rzd.ru/ru/9377" target="_blank">
          <ArrowButton size="lg" />
        </a>
      </div>

      <p className="mb-5 font-headers text-sm md:text-base">
        поездок в день в среднем совершили пассажиры пригородных поездов в 2025
        году
      </p>
      <img
        src={illustration}
        alt="person opening a door"
        className="mx-auto my-auto w-[90%] max-w-lg"
      />
    </div>
  );
}
