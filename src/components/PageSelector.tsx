import Link from "next/link";

type PageSelectorComponentProps = {
  page: number;
  postsCount: number;
};

const PageSelector = ({ page, postsCount }: PageSelectorComponentProps) => {
  return (
    <div className="paper justify-between flex items-center">
      {page > 0 ? (
        <Link
          href={{
            pathname: "/home",
            query: { page: page - 1 },
          }}
        >
          <a className="btn btn-blue">{"<"}</a>
        </Link>
      ) : (
        <div></div>
      )}
      <p className="inline">Page {page + 1}</p>
      {postsCount === 10 ? (
        <Link
          href={{
            pathname: "/home",
            query: { page: page + 1 },
          }}
        >
          <a className="btn btn-blue">{">"}</a>
        </Link>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default PageSelector;
