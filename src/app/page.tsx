import React from "react";
import SideBar from "./Components/SideBar/SideBar";
import AddPortfolio from "./Components/Portfolio/AddPortfolio";
import AddTranscation from "./Components/AddTranscation/AddTranscation";
import Overview from "./Components/Overview/Overview";
import { auth } from "@/lib/auth";
import { Button } from "antd";
import Link from "next/link";
type Props = {};

const Home = async (props: Props) => {
  const session = await auth();

  if (!session) {
    return (
      <main className="flex flex-1 flex-col p-5">
        <p className="text-2xl">Sign up Today</p>
        <p className="text-5xl">Crypto Portfolio Tracker</p>
        <Button className="self-start">
          <Link href="/api/auth/signin">Create your Portfolio</Link>
        </Button>
      </main>
    );
  }

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
