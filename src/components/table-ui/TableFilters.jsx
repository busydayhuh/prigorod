/* eslint-disable react/prop-types */
import { Toggle } from "../shadcn/toggle";
import { Rabbit, Eye, EyeClosed } from "lucide-react";

export function Toggles({ name, tableFilters, setTableFilters }) {
  return (
    <Toggle
      className="table-toggle oval-btn-icon"
      onClick={() =>
        setTableFilters((prev) => ({
          ...prev,
          [name]: !prev[name],
        }))
      }
    >
      {name === "expressOnly" ? (
        <>
          <Rabbit />
          Только экспресс
        </>
      ) : tableFilters.isDepartedOpen ? (
        <>
          <Eye />
          Ушедшие
        </>
      ) : (
        <>
          <EyeClosed />
          Ушедшие
        </>
      )}
    </Toggle>
  );
}
