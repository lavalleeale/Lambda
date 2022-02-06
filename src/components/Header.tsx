import Link from "next/link";
import React from "react";
import { UserCircleIcon } from "@heroicons/react/outline";
import { User } from "@prisma/client";
import { userCookie } from "../lib/user";

const Header = ({ user }: { user: userCookie | null }) => {
  return (
    <div className="mb-1 w-full bg-purple-800 p-3 overflow-auto">
      <Link href="/">
        <a>
          <h1 className="inline text-2xl">λ</h1>
        </a>
      </Link>
      <Link href={user ? `/u/${user.name}` : "/login"}>
        <a className="float-right text-white">
          <p className="inline">{user?.name}</p>
          <UserCircleIcon className="w-7 inline" />
        </a>
      </Link>
    </div>
  );
};

export default Header;
