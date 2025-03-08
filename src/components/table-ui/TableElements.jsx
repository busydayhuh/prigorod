/* eslint-disable react/prop-types */
import React from "react";
import { getFormattedTime } from "@/lib/utils";

export function TimeElem({ arrival, departure, date }) {
  return arrival && departure ? (
    <>
      <span className="text-xl text-muted-foreground">
        {date ? getFormattedTime(arrival) : arrival}
      </span>
      <br />
      <span className="text-3xl font-medium">
        {date ? getFormattedTime(departure) : departure}
      </span>
    </>
  ) : (
    <span className="text-3xl font-medium">{`${
      date
        ? getFormattedTime(arrival) || getFormattedTime(departure)
        : arrival || departure
    }`}</span>
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
