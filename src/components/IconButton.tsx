/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

type IconButtonComponentProps = {
  link: string;
  image: string;
  name: string;
  className?: string;
};

const IconButton = ({
  link,
  image,
  name,
  className,
}: IconButtonComponentProps) => {
  return (
    <Link href={link}>
      <a
        className={`paper dark:hover:bg-slate-800 hover:bg-slate-50 flex ${
          className || ""
        }`}
      >
        <img
          width={32}
          height={32}
          src={image}
          alt={name}
          className="dark:filter dark:invert inline"
        />
        <p className="inline ml-auto self-center">{name}</p>
      </a>
    </Link>
  );
};

export default IconButton;
