import React from "react";
import fail from "../images/fail.svg";
import done from "../images/done.svg";

function InfoTooltip({ isOpen, onClose, isStatus }) {
  function toggleImgStatus(isStatus) {
    if(isStatus === "ok"){
      return done;
    } else if (isStatus === "not-ok"){
      return fail;
    }
  }

  const toggleTextStatus = (isStatus) => {
    if(isStatus === 'ok'){
      return "Вы успешно зарегистрировались!";
    } else if (isStatus === "not-ok") {
      return "Что-то пошло не так! Попробуйте ещё раз.";
    } else {
      return "";
    }
  }
console.log(isStatus);
  return (
    <div className={`popup  ${isOpen ? `popup_opened` : ""}`}
    onMouseDown={(e) => e.target === e.currentTarget && onClose()}>

      <div className="popup__container">
        <img
          src={toggleImgStatus(isStatus)}
          className="popup__tooltip"
          alt={"Иконка со статусом"}
        />
        <h2 className="popup__tooltip-title">{toggleTextStatus(isStatus)}
        </h2>

        <button
          className="button popup__close-btn"
          type="button"
          title="Закрыть"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;