import IconButton from "./IconButton";

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
      const option = options.filter((option) => option.enabled)[0];
      return (
        <div className="w-max float-right">
          <IconButton
            key={option.name}
            link={option.action}
            image={option.image}
            name={option.name}
          />
        </div>
      );
    default:
      return (
        <div className="float-right w-8 h-8">
          <label htmlFor={`${id}-menu`} className="dark:text-white text-3xl">
            {"\u00a0\u00a0\u2807"}
          </label>
          <input type="checkbox" id={`${id}-menu`} className="peer hidden" />
          <div className="absolute translate-x-[-85%] z-10 hidden peer-checked:block">
            {options
              .filter((option) => option.enabled)
              .map((option) => (
                <IconButton
                  key={option.name}
                  link={option.action}
                  image={option.image}
                  name={option.name}
                  className="m-0"
                />
              ))}
          </div>
        </div>
      );
  }
};

export default Menu;
