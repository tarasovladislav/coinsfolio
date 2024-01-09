import React from "react";
import SideBar from "./Components/SideBar/SideBar";
import AddPortfolio from "./Components/AddPortfolio";
import AddTranscation from "./Components/AddTranscation/AddTranscation";

type Props = {};

const Home = (props: Props) => {
  return (
    <main className="flex flex-row">
      <AddPortfolio />
      <AddTranscation />
      <SideBar />
    </main>
  );
};

export default Home;
