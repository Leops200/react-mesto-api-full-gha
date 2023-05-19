//https://iphone-image.apkpure.com/v2/app/d/f/d/dfde02292072ff8a42cbcc754dde7f09.jpg
// Делаем выборку ДОМ элементов:
//  Глобальные переменные:
//  для работы с попАп:

export const popups = document.querySelectorAll('.popup');//* здесь назначили переменную, которая работает со всеми блоками '.popup'

export const popuProfileEdit = document.querySelector('.popup_profile');//* эта переменная добавляет класс открытия попапу профиля при клике
export const popupNewCardAdd = document.querySelector('.popup_new-card');//* эта переменная добавляет класс открытия попапу новой карточки при клике


//--  Переменные для  профиля
export const popuProfile = document.querySelector('.profile');//* назначаем конкретный блок - профиль 
export const popuProfileName = popuProfile.querySelector('.profile__user-name');//* имя в профиле
export const popuProfileActivity = popuProfile.querySelector('.profile__user-activity');//* хобби в профиле
export const popupProfileButtonOpen = popuProfile.querySelector('.profile__edit-btn');//* кнопка "включения" профиля
export const popupCardButtonOpen = popuProfile.querySelector('.profile__add-btn');//* кнопка добавления нового профиля
export const popupAvatarEditBtn = popuProfile.querySelector('.profile__avatar-btn');//* кнопка редактирования аватарки

//--  Переменные для работы с формой профиля:
export const formProfileEdit = document.querySelector('.popup__form-edit');//* окно редактирования профиля
export const formNameInput = formProfileEdit.querySelector('.popup__form-input_other-name');//* окно редактирования имени
export const formAboutInput = formProfileEdit.querySelector('.popup__form-input_other-about');//* окно редактирования хобби

//--  Переменные для работы с формой карточек:
export const formAddCard = document.querySelector('.popup__form-new-card');
export const formPlaceNameInput = formAddCard.querySelector('.popup__form-input_place-name');
export const formPlaceLinkInput = formAddCard.querySelector('.popup__form-input_link');

//-- Переменные для работы с формой аватарки
export const formEditAvatar = document.querySelector('.popup__form-avatar');
export const formAvatarLinkInput = formEditAvatar.querySelector('.popup__form-input');

//--  Переменные для зум-контейнера
export const zoomPopup = document.querySelector('.popup_zoom');//* весь контейнер зум
export const imgPopupZoom = zoomPopup.querySelector('.popup__img');//* переменная для хранения изображения
export const imgTitlePopupZoom = zoomPopup.querySelector('.popup__img-title');//* переменная для хранения названия изображения

//--  Переменные для аватар-контейнера
export const formAvatar = document.querySelector('.popup__form-avatar');

//--  Переменные для Card и Template
export const cardsContainer = '.elements';
//export const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

export const initialCards = [

  {
    name: 'Улан-Удэ',
    link: './images/Улан-Удэ.jpg',
  },
  {
    name: 'Гора Эльбрус',
    link: './images/Гора_Эльбрус.png',
  },
  {
    name: 'Домбай',
    link: './images/Домбай.png',
  },
  {
    name: 'Сулак',
    link: './images/Сулак.jpg',
  },
  {
    name: 'Байкал',
    link: './images/Байкал.jpg',
  },
  {
    name: 'Судак',
    link: './images/Судак.jpg',
  },
];

 export const validationObj = {
  formSelector: '.popup__form',// поле всей формы
  inputSelector: '.popup__form-input', // поле ввода
  submitButtonSelector: '.popup__form-btn-save', // кнопка
  inactiveButtonClass: 'popup__form-btn-save_dsbl', //мдфктр кнопки
  inputErrorClass: 'popup__form-input_type-err', //мдфктр поля ввода
  errorClass: 'popup__form-inpt-err_on' //add to span
};

export const CLICK = 'click'; //клик левой кнопки мыши 
