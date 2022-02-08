import Link from "next/link";
import React from "react";
import { userCookie } from "../lib/user";

const Header = ({ user }: { user: userCookie | null }) => {
  return (
    <div className="mb-1 w-full bg-purple-800 p-3 overflow-auto">
      <Link href="/">
        <a>
          <h1 className="inline text-2xl text-white">λ</h1>
        </a>
      </Link>
      <Link href={user ? `/u/${user.name}` : "/login"}>
        <a className="float-right text-white">
          {user?.name ? (
            <p className="inline">{user.name}</p>
          ) : (
            <p className="inline">Login</p>
          )}
        </a>
      </Link>
    </div>
  );
};

export default Header;
