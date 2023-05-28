//import React from "react";
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm.js';

function PopupEditProfile({ isOpen, onClose, onSaving, onUseUpdates }) {
  const currentUser = useContext(CurrentUserContext);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  // Ввод имени
  function handleChangeName(e) {
    setName(e.target.value);
  }

  // Ввод занятий
  function handleChangeDescription(e) {
    e.preventDefault();
    setDescription(e.target.value);
  }

  // Отправка на сервер
  function handleSubmit(e) {
    e.preventDefault();
    console.log('submit!');
    onUseUpdates({ name, about: description });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name='edit'
      title='Редактировать профиль'
      buttonText={onSaving ? 'Сохранение...' : 'Сохранить'}
      onSubmit={handleSubmit}>
      <input
        className="popup__form-input popup__form-input_other-name"
        id="name-input"
        type="text"
        name="name"
        placeholder="Ваше имя"
        onChange={handleChangeName}
        required
        value={name || ""}
      />
      <span className="name-input-error popup__form-inpt-err name-inpt-err"
        id="name-error"></span>
      <input
        className="popup__form-input popup__form-input_other-about"
        id="about-input"
        type="text"
        name="about"
        placeholder="О себе"
        onChange={handleChangeDescription}
        required
        value={description || ""}
      />
      <span className="popup__form-inpt-err about-input-error"
        id="about-error"></span>
    </PopupWithForm>
  )
};

export default PopupEditProfile;