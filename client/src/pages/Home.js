import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import HomePage from "../components/HomePage";
import SearchComponent from "../components/SearchComponent";

const Home = () => {
  return (
    <div className="grid grid-rows-8 grid-flow-col ">
      <Sidebar />
      <HomePage />
      <SearchComponent />
    </div>
  );
};

export default Home;
