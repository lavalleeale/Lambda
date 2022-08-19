type ModalComponentProps = {
  children: JSX.Element;
  text: string;
};

const Modal = ({ children, text }: ModalComponentProps) => {
  const num = Math.floor(Math.random() * 1000000);
  return (
    <>
      <label htmlFor={`${num}-modal-checkbox`}>{text}</label>
      <input
        id={`${num}-modal-checkbox`}
        type="checkbox"
        className="modal-checker"
        autoComplete="off"
      />
      <div className="modal">{children}</div>
    </>
  );
};

export default Modal;
