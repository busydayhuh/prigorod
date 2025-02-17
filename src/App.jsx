import React from "react";
import "./App.css";
import { Outlet } from "react-router";
import Header from "./components/Header";
import SearchSection from "./components/SearchSection";
import Footer from "./components/Footer";
import useFetch from "./hooks/useFetch";

function App() {
  const { data, isLoading, isError } = useFetch("search", {
    from: "c146",
    to: "c213",
    date: "2025-02-18",
  });

  console.log(data);

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
