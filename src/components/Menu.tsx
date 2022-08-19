/* eslint-disable @next/next/no-img-element */
type MenuComponentProps = {
  id: string;
  options: { image: string; name: string; action: string }[];
};

const Menu = ({ options, id }: MenuComponentProps) => {
  return (
    <div className="float-right flex justify-end">
      <input type="checkbox" id={`${id}-menu`} className="menu-checker" />
      <label htmlFor={`${id}-menu`} />
      <div className="menu paper w-52 absolute top-24">
        {options.map((option, index) => (
          <form action={option.action} key={option.name}>
            <button
              type="submit"
              className={`w-full flex ${
                index !== 0
                  ? "border-t border-gray-300 dark:border-gray-700 pt-2 mt-1"
                  : ""
              }`}
            >
              <img
                width={32}
                height={32}
                src={option.image}
                alt={option.name}
                className="dark:filter dark:invert inline"
              />
              <p className="inline ml-auto self-center">{option.name}</p>
            </button>
          </form>
        ))}
      </div>
    </div>
  );
};

export default Menu;
