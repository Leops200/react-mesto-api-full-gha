import React from "react";

function ImagePopup({ card, onClose}) {
  return (
    <div className={`popup popup_zoom ${card.link ? "popup_opened" : ""}`}
    onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="popup__container-zoom">
        <button className="button popup__close-btn popup__close-btn_zoom" type="button" onClick={onClose} />
        <div className="popup__zoom-vis">
          <img className="popup__img" src={card.link} alt={card.name} />
          <h2 className="popup__img-title">{card.name}</h2>
        </div>
      </div>
    </div>
  );
};

export default ImagePopup;