import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import App from "./App.jsx";
import { HashRouter, Routes, Route } from "react-router";
import Home from "./pages/Home/Home.jsx";
import Schedule from "./pages/Schedule/Schedule.jsx";
import Results from "./pages/Search/Results.jsx";
import Thread from "./pages/Thread/Thread.jsx";
import LocationProvider from "./context/LocationContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LocationProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/thread" element={<Thread />} />
          </Route>
        </Routes>
      </HashRouter>
    </LocationProvider>
  </StrictMode>
);
