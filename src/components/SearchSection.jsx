import React from "react";
import { useNavigate } from "react-router";
import useStations from "@/hooks/useStations";
import useApi from "@/hooks/useFetch";

function SearchSection() {
  const navigate = useNavigate();

  const { data: stations, isLoading, isError } = useApi("stations_list");

  if (!isLoading) console.log(stations[0]);

  const query = "?parameter1=value1&parameter2=value2";
  return (
    <>
      <div>SearchSection</div>
      <button onClick={() => navigate(`/results${query}`)}>Поиск</button>
    </>
  );
}

export default SearchSection;
