//import React from "react";
import { useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";

function PopupChangeAvatar({isOpen, onClose, onSaving, onAvatarUpdates}) {
  const avatar = useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    onAvatarUpdates({avatar: avatar.current.value});
  };
  return(
    <PopupWithForm
      isOpen={isOpen} onClose={onClose}
      name='avatar'
      title='Обновить аватар'
      buttonText={onSaving ? "Сохранение..." : 'Сохранить'}
      onSubmit={handleSubmit}>
        <input
        className="popup__form-input 
        popup__form-input_avatar"
        type="url"
        name="avatar"
        placeholder="Ссылка на картинку"
        id="avatar"
        required
        ref={avatar}
        />
        <span className="popup__form-inpt-err avatar-error"
        id="avatar-err"></span>
    </PopupWithForm>
  )
};

export default PopupChangeAvatar;