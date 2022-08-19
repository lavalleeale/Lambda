import Link from "next/link";

type SectionSidebarProps = {
  name: string;
  mods: {
    name: string;
  }[];
};

const SectionSidebar = ({ name, mods }: SectionSidebarProps) => {
  return (
    <div className="paper overflow-auto w-1/4" id="sidebar">
      <form action={`/d/${name}/submit`} method="POST">
        <button className="btn-pill btn-white w-full">Create Post</button>
      </form>
      <p>Moderators:</p>
      {mods.map((mod) => (
        <Link href={`/u/${mod.name}`} key={mod.name}>
          <a className="text-gray-500">u/{mod.name}</a>
        </Link>
      ))}
    </div>
  );
};

export default SectionSidebar;
