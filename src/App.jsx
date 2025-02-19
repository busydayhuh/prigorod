import React from "react";
import "./App.css";
import { Outlet } from "react-router";
import Header from "./components/Header";
import SearchSection from "./components/SearchSection";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <SearchSection />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
