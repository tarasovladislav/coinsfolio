import React from "react";
import SideBar from "./Components/SideBar/SideBar";
import AddPortfolio from "./Components/AddPortfolio";
import Portfolio from "./Components/Portfolio";
import AddTranscation from "./Components/AddTranscation/AddTranscation";

type Props = {};

const Home = (props: Props) => {
  return (
    <main className="flex flex-row">
      <AddPortfolio />
      <AddTranscation />
      <SideBar />
      <Portfolio />
    </main>
  );
};

export default Home;
function dispatch(arg0: { payload: any; type: "Portfolio/setPortfolio" }) {
  throw new Error("Function not implemented.");
}
