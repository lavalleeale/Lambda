import Link from "next/link";
import React from "react";
import { userCookie } from "../lib/user";

const Header = ({
  user,
  dark,
  path,
}: {
  user: userCookie | null;
  dark: boolean;
  path: string;
}) => {
  return (
    <div className="mb-1 w-full bg-purple-800 p-3 overflow-auto text-white">
      <Link href="/">
        <a>
          <h1 className="inline text-2xl text-white">λ</h1>
        </a>
      </Link>
      <div className="float-right">
        <Link
          href={{ pathname: path, query: `swapMode=${dark ? "day" : "night"}` }}
        >
          <a className="text-white">{dark ? "Day Mode" : "Night Mode"}</a>
        </Link>
        <p className="inline mx-2">|</p>
        <Link href={user ? `/u/${user.name}` : "/login"}>
          <a className="text-white">
            {user?.name ? (
              <p className="inline">{user.name}</p>
            ) : (
              <p className="inline">Login</p>
            )}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Header;
