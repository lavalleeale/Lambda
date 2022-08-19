import Link from "next/link";

const SectionLink = ({ section }: { section: string }) => {
  return (
    <Link href={`/d/${section}`}>
      <a className="text-gray-500">d/{section}</a>
    </Link>
  );
};

export default SectionLink;
