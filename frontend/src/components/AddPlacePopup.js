import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";

function PopupNewCardAdd({ isOpen, onClose, onSaving, onAddCard }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleAddCardName(e) { setName(e.target.value); };

  function handleAddLink(e) { setLink(e.target.value); };

  function handleSubmit(e) {
    e.preventDefault();
    onAddCard({ name, link });
  };

  useEffect(() => { setName(""); setLink(""); }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen} onClose={onClose}
      name='add'
      title='Новое место'
      buttonText={onSaving ? "Создание..." : 'Создать'}
      onSubmit={handleSubmit}>
      <input
        className="popup__form-input popup__form-input_place-name"
        type="text"
        id="place-name"
        placeholder="Название"
        name="name"
        required
        onChange={handleAddCardName}
        value={name || ""}
      />
      <span className="popup__form-inpt-err place-name-error" id="place-name-error">
      </span>
      <input className="popup__form-input popup__form-input_link"
        id="url-inpt"
        type="url"
        placeholder="Ваша ссылка"
        name="link"
        required
        onChange={handleAddLink}
        value={link || ""}
      />
      <span className="popup__form-inpt-err url-inpt-error" id="url-inpt-error"></span>
    </PopupWithForm>
  )
};

export default PopupNewCardAdd;