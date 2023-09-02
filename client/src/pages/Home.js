import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import HomePage from "../components/HomePage";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="grid grid-rows-8 grid-flow-col ">
      <Sidebar />
      <HomePage />
      <Footer />
    </div>
  );
};

export default Home;
