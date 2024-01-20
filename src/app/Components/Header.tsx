import React, { useEffect } from "react";
import { Toolbar } from "@mui/material";
import { auth } from "@/lib/auth";
import Link from "next/link";
type Props = {};

const Header = async (props: Props) => {
  const session = await auth();
  return (
    <Toolbar className="flex justify-between bg-primary ">
      <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between ">
        <Link href={"/"} className="text-3xl font-semibold text-zinc-100">
          CoinsFolio
        </Link>

        {!session ? (
          <Link href="/api/auth/signin">
            <span className=" text-zinc-100">Sign In</span>
          </Link>
        ) : (
          <>
            <span className=" text-zinc-100">
              Welcome, {session?.user?.name}
            </span>
            <Link href="/api/auth/signout">
              <span className=" text-zinc-100">Sign Out</span>
            </Link>
          </>
        )}
      </div>
    </Toolbar>
  );
};

export default Header;
