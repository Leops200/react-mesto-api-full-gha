import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupAccept({ isOpen, onClose, onSaving, onDeleteCard, card }) {

  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard(card);
  }

  return (
    <PopupWithForm
      isOpen={isOpen} onClose={onClose}
      name="popup popup_accept"
      title="Вы уверены?"
      buttonText={onSaving ? "Удаление..." : "Да"}
      onSubmit={handleSubmit}
    />
  )
};

export default PopupAccept;