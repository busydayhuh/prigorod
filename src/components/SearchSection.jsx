import React from "react";
import { useNavigate } from "react-router";

function SearchSection() {
  const navigate = useNavigate();
  const query = "?parameter1=value1&parameter2=value2";
  return (
    <>
      <div>SearchSection</div>
      <button onClick={() => navigate(`/results${query}`)}>Поиск</button>
    </>
  );
}

export default SearchSection;
