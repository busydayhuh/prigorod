import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import ResultsTable from "./components/ResultsPage/ResultsTable";
import ScheduleTable from "./components/SchedulePage/ScheduleTable";
import Direction from "./components/Direction";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/results" element={<ResultsTable />} />
          <Route path="/schedule" element={<ScheduleTable />} />
          <Route path="/direction" element={<Direction />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
