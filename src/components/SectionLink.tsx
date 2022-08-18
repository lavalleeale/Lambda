import Link from "next/link";

const SectionLink = ({
  section,
  hideLabel = false,
}: {
  section: string;
  hideLabel?: boolean;
}) => {
  return (
    <Link href={`/d/${section}`}>
      <a className="text-gray-500">
        {!hideLabel && "Section: "}d/{section}
      </a>
    </Link>
  );
};

export default SectionLink;
