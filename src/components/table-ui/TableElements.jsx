/* eslint-disable react/prop-types */
import React from "react";
import { getFormattedTime } from "@/lib/utils";

export function TimeElem({ time, date }) {
  return (
    <span className="text-3xl font-medium">
      {date ? getFormattedTime(time) : time}
    </span>
  );
}

export function ThreadElem() {
  // to do
}

export function StationElem() {
  //to do
}

export function LinkElem() {
  //to do
}

export function TrainTypeElem() {
  //to do
}
