/* eslint-disable react/prop-types */
import React from "react";

function TravelTime({ travelTime }) {
  return (
    <div className="text-sm text-muted-foreground py-1 border-b-1 border-solid border-accent min-w-[75px] text-center">
      {travelTime}
    </div>
  );
}

export default TravelTime;
