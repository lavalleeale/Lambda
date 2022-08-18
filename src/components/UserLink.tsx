import Link from "next/link";

const UserLink = ({ user }: { user: string }) => {
  return (
    <Link href={`/u/${user}`}>
      <a className="text-gray-500 float-right">u/{user}</a>
    </Link>
  );
};

export default UserLink;
