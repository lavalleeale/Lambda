/* eslint-disable @next/next/no-img-element */
type Option = {
  image: string;
  name: string;
  action: string;
  enabled: boolean;
};

type MenuComponentProps = {
  id: string;
  options: Option[];
};

const Menu = ({ options, id }: MenuComponentProps) => {
  switch (options.filter((option) => option.enabled).length) {
    case 0:
      return <></>;
    case 1:
      return (
        <MenuOption
          option={options.filter((option) => option.enabled)[0]}
          showBorder={false}
        />
      );
    default:
      return (
        <>
          <div className="float-right flex justify-end w-6 h-6 text-center">
            <input type="checkbox" id={`${id}-menu`} className="menu-checker" />
            <label htmlFor={`${id}-menu`} />
            <div className="menu paper w-52 absolute top-24">
              {options
                .filter((option) => option.enabled)
                .map((option, index) => (
                  <MenuOption
                    option={option}
                    showBorder={index !== 0}
                    key={option.name}
                  />
                ))}
            </div>
          </div>
        </>
      );
  }
};

const MenuOption = ({
  option,
  showBorder,
}: {
  option: Option;
  showBorder: boolean;
}) => {
  return (
    <form action={option.action}>
      <button
        type="submit"
        className={`w-full flex ${
          showBorder
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
  );
};

export default Menu;
