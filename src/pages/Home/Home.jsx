import NearestStations from "./NearestStations";
import PopularRoutes from "./PopularRoutes";
import TrainCapacityInfo from "./TrainCapacityInfo";

export default function Home() {
  return (
    <article className="items-stretch gap-x-5 gap-y-4 lg:gap-y-8 grid lg:grid-cols-2 mt-4 md:mt-7 lg:mt-10 pb-1 w-main">
      <PopularRoutes />
      <TrainCapacityInfo />
      <NearestStations />
    </article>
  );
}
