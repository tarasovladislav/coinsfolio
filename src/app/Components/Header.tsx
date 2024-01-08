import React from "react";
import { Toolbar } from "@mui/material";

type Props = {};

const Header = (props: Props) => {
  return (
    <Toolbar className="bg-gray-700 flex justify-between">
      <h1 className="text-3xl font-semibold text-zinc-100	">CoinsFolio</h1>
      <span className=" text-zinc-100">Sign In</span>
    </Toolbar>
  );
};

export default Header;
