import NearestStations from "./NearestStations";
import PopularRoutes from "./PopularRoutes";

export default function Home() {
  return (
    <article className="w-main mt-5">
      <PopularRoutes />
      <NearestStations />
    </article>
  );
}
