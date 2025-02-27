import React from "react";
import "./App.css";
import { Outlet } from "react-router";
import Header from "./components/Header";
import SearchSection from "./components/Search";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main className="flex flex-col justify-center gap-10">
        <SearchSection />
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
}

export default App;
