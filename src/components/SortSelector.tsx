import Link from "next/link";

type SortSelectorComponentProps = {
  sort: string;
  page: number;
  path: string;
};

const SortSelector = ({ sort, page, path }: SortSelectorComponentProps) => {
  return (
    <div className="paper">
      <p>Sort By:</p>
      <div className="flex space-x-4">
        {sort !== "old" ? (
          <Link
            href={{
              pathname: path,
              query: { page: page, sort: "old" },
            }}
          >
            <a>Old</a>
          </Link>
        ) : (
          <p>Old</p>
        )}
        {sort !== "new" ? (
          <Link
            href={{
              pathname: path,
              query: { page: page, sort: "new" },
            }}
          >
            <a>New</a>
          </Link>
        ) : (
          <p>New</p>
        )}
        {sort !== "best" ? (
          <Link
            href={{
              pathname: path,
              query: { page: page, sort: "best" },
            }}
          >
            <a>Best</a>
          </Link>
        ) : (
          <p>Best</p>
        )}
        {sort !== "top" ? (
          <Link
            href={{
              pathname: path,
              query: { page: page, sort: "top" },
            }}
          >
            <a>Top</a>
          </Link>
        ) : (
          <p>Top</p>
        )}
      </div>
    </div>
  );
};

export default SortSelector;
