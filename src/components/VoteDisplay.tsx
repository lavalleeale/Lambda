/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

type VoteDisplayComponentProps = {
  votes: number;
  id: string;
  up: boolean;
  down: boolean;
};

const VoteDisplay = ({ votes, id, up, down }: VoteDisplayComponentProps) => {
  return (
    <div className="dark:bg-slate-800 bg-slate-200 rounded-md mr-2 self-stretch p-2 text-center h-fit w-10 hidden sm:block">
      <Link href={`/api/posts/${id}/updoot`}>
        <a className={`block ${up ? "orange" : "dark:filter dark:invert"}`}>
          <img src="/vote.png" alt="updoot" className="w-6" />
        </a>
      </Link>
      <p className="text-gray-500">{votes}</p>
      <Link href={`/api/posts/${id}/downdoot`}>
        <a
          className={`block ${
            down ? "purple rotate-180" : "dark:filter dark:invert rotate-180"
          }`}
        >
          <img src="/vote.png" alt="downdoot" className="w-6" />
        </a>
      </Link>
    </div>
  );
};

export default VoteDisplay;
