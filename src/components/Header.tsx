import Link from "next/link";
import { userCookie } from "../lib/user";
import Login from "./Login";
import Modal from "./Modal";

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
        {user?.name ? (
          <Link href={`/u/${user.name}`}>
            <a className="text-white">
              <p className="inline">{user.name}</p>
            </a>
          </Link>
        ) : (
          <Modal text="Login">
            <Login />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Header;
