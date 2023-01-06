type ModalComponentProps = {
  children: JSX.Element;
  text: string;
  id: string;
};

const Modal = ({ children, text, id }: ModalComponentProps) => {
  return (
    <>
      <input
        id={`${id}-modal-checkbox`}
        type="checkbox"
        className="hidden opacity-0 peer checked:w-full checked:h-full checked:z-10 checked:fixed checked:block checked:left-0 checked:top-0"
        autoComplete="off"
      />
      <div className="w-1/2 left-1/4 top-1/4 z-20 fixed hidden rounded-md peer-checked:block [&>*]:w-full [&>*]:h-full">
        {children}
      </div>
      <label
        className="text-blue-600 hover:text-blue-800 cursor-pointer"
        htmlFor={`${id}-modal-checkbox`}
      >
        {text}
      </label>
    </>
  );
};

export default Modal;
