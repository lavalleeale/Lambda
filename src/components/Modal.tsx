import React from "react";

const Modal = ({ children, text }: { children: JSX.Element; text: string }) => {
  return (
    <>
      {/* <form autoComplete="off" className="inline-block"> */}
      <label htmlFor="modal-checkbox">{text}</label>
      <input
        id="modal-checkbox"
        type="checkbox"
        className="modal-checker"
        autoComplete="off"
      />
      <div className="modal">{children}</div>
      {/* </form> */}
    </>
  );
};

export default Modal;
