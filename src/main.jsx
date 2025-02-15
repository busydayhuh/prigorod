import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import ResultsTable from "./components/tables/ResultsTable";
import ScheduleTable from "./components/tables/ScheduleTable";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/results" element={<ResultsTable />} />
          <Route path="/shedule" element={<ScheduleTable />} />
          <Route path="/direction" element={<ScheduleTable />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
