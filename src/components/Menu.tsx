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
        <>
          <div className="float-right flex justify-end w-6 h-6 text-center">
            <input type="checkbox" id={`${id}-menu`} className="menu-checker" />
            <label htmlFor={`${id}-menu`} />
            <div className="menu w-52 absolute top-44 p-0">
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
        </>
      );
  }
};

export default Menu;
