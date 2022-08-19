import Link from "next/link";

const IndexSidebar = ({
  topSections,
}: {
  topSections: { name: string; _count: { posts: number } }[];
}) => {
  return (
    <div className="paper w-1/4 inline-block" id="sidebar">
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
