import { IronSessionData } from "iron-session";
import Link from "next/link";
import Login from "./Login";
import Modal from "./Modal";

type HeaderComponentProps = {
  user: IronSessionData["user"] | null;
  dark: boolean;
  path: string;
};

const Header = ({ user, dark, path }: HeaderComponentProps) => {
  return (
    <div
      className="mb-1 w-full bg-purple-800 p-3 overflow-auto text-white"
      id="header"
    >
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
            <a>
              <p className="inline text-white">{user.name}</p>
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
