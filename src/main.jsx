import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import ResultsTable from "./components/results/ResultsTable";
import ScheduleTable from "./components/schedule/ScheduleTable";
import ThreadTable from "./components/Thread";
import Home from "./components/Home";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<ResultsTable />} />
          <Route path="/schedule" element={<ScheduleTable />} />
          <Route path="/thread" element={<ThreadTable />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
