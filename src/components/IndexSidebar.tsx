import Link from "next/link";

type IndexSidebarComponentProps = {
  topSections: {
    name: string;
    _count: {
      posts: number;
    };
  }[];
};

const IndexSidebar = ({ topSections }: IndexSidebarComponentProps) => {
  return (
    <div className="paper w-1/4 inline-block" id="sidebar">
      <p className="text-3xl text-center">Home</p>
      <Link href="/d/create">
        <a className="btn-pill btn-white w-full block text-center">
          Create Section
        </a>
      </Link>
      <p className="mt-1">Top Sections:</p>
      {topSections.map((section) => (
        <div key={section.name}>
          <Link href={`/d/${section.name}`}>
            <a className="text-gray-500">d/{section.name}</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default IndexSidebar;
