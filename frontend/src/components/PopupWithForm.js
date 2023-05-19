import React from "react";

function PopupWithForm({
  name,
  isOpen,
  title,
  buttonText,
  onClose,
  onSubmit,
  ...props
}) {
  return (
    <div className={`popup popup__${name} ${isOpen ? "popup_opened" : ""}`}
    onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <button className="button popup__close-btn" onClick={onClose}></button>
        <form className="popup__form" name={`${name}`} onSubmit={onSubmit}>
          {props.children}
          <button className="button popup__form-btn-save" type="submit">{buttonText}</button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;