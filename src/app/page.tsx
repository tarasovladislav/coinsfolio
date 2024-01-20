import React from "react";
import SideBar from "./Components/SideBar/SideBar";
import AddPortfolio from "./Components/Portfolio/AddPortfolio";
import AddTranscation from "./Components/AddTranscation/AddTranscation";
import Overview from "./Components/Overview/Overview";
type Props = {};

const Home = (props: Props) => {
  return (
    <main className=" flex flex-col md:flex-row">
      <AddPortfolio />
      <AddTranscation />
      <SideBar />
      <Overview />
    </main>
  );
};

export default Home;
