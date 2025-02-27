/* eslint-disable react/prop-types */
import React from "react";
import { Badge } from "@/components/shadcn/badge";

function Stop({ time, stop, platform }) {
  return (
    <div className="flex flex-col align-top gap-1">
      <div className="text-3xl font-medium">{time}</div>
      <div className="text-sm text-muted-foreground">{stop}</div>
      {!!platform && <Badge variant="secondary">{platform}</Badge>}
    </div>
  );
}

export default Stop;
