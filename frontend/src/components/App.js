
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import Login from './Login.js';
import Register from './Register.js'
import Footer from './Footer.js';
import Header from './Header.js';
import Main from './Main.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
// import api from '../utils/api.js';
import PopupAccept from './PopupAccept.js';
import * as auth from '../utils/auth.js';
import ProtectedRouteElement from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";


function App() {
  const [isLogged, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupChanging, setIsEditProfilePopupChanging] = useState(false);
  const [isEditAvatarPopupChanging, setIsEditAvatarPopupChanging] = useState(false);
  const [isAddPlacePopupChanging, setIsAddPlacePopupChanging] = useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAcceptPopupOpen, setIsAcceptPopupOpen] = useState(false);
  const [isAcceptPopupChanging, setAcceptPopupButtonText] = useState(false);
  const [cardDel, setCardDel] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [mailName, setMailName] = useState("");
  const navigate = useNavigate();
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoTooltipStatus, setInfoTooltipStatus] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    isLogged &&
      Promise.all([auth.getUserInfo(), auth.getInitCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          //setUserName(userData.name);
          //setUserActivity(userData.about);
          console.log("params");
          setCards(cardsData.reverse());
        })
        .catch((err) => { console.log(err); })
        .finally(() => { console.log("loading promise") });
  }, [isLogged]);

  const handleEditProfileClick = () => { setIsEditProfilePopupOpen(true); };

  const handleAddPlaceClick = () => { setIsAddPlacePopupOpen(true); };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCardDelClick = (card) => {
    setIsAcceptPopupOpen(true);
    setCardDel(card);
  };

  // Обрабатываем клик по лайку
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    auth.changeLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((i) => (i._id === card._id ? newCard : i)));
      })
      .catch((err) => {
        console.log(err);
      })
  };
  //удаление карточки 
  const handleCardDel = (card) => {
    setAcceptPopupButtonText(true);
    auth.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((i) => i._id !== card._id));
        setCardDel({});
        closePopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setAcceptPopupButtonText(false);
      });
  };

  //Обновляем информацию пользователя
  const updateUserInfo = (data) => {
    setIsEditProfilePopupChanging(true);
    auth.addInfo(data)
      .then((newData) => { setCurrentUser(newData); })
      .then(() => { closePopups(); })
      .catch((err) => { console.log(err); })
      .finally(() => { setIsEditProfilePopupChanging(false); })
  };
  //Обновляем аватарку
  const updateAvatar = (data) => {
    setIsEditAvatarPopupChanging(true);
    auth.addAvatar(data)
      .then((newData) => { setCurrentUser(newData); })
      .then(() => { closePopups(); })
      .catch((err) => { console.log(err); })
      .finally(() => { setIsEditAvatarPopupChanging(false); })
  };

  const handleAddCardSubmit = (data) => {
    setIsAddPlacePopupChanging(true)
    auth.addNewCard(data)
      .then((newData) => { setCards([newData, ...cards]); })
      .then(() => { closePopups(); })
      .catch((err) => { console.log(err); })
      .finally(() => { setIsAddPlacePopupChanging(false); })
  }

/*
  // Закрытие по ESC
  const isOpen = isAcceptPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen

  useEffect(() => {
    function handleEscClose(e) {
      if (e.key === "Escape") {
        closePopups();
        console.log('ESCpress');
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleEscClose);
      return () => window.removeEventListener("keydown", handleEscClose);
    }
  }, [isOpen]);
  */

  // закрываем попапы
  const closePopups = useCallback(() => {
    console.log('closePopups');
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsAcceptPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setInfoTooltipStatus("");
    setSelectedCard({});
  }, []);

  /* отключаем проверку токена из заголовков
  const authIdent = useCallback((data) => {
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      setIsLoggedIn(true);
      setMailName(data.email);
    }
    if (!data) throw console.log("invalid data")
  }, []);
  */
  // авторизация =========================================
  const onLogin = useCallback(async (email, password) => {
    try {
      const data = await auth.login(email, password);
      if (data) {
        //localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        navigate("/", { replace: true });
        setIsInfoTooltipOpen(false);
        setInfoTooltipStatus("ok");
        setMailName(email.email);
      }
    } catch (err) {
      console.log(err);
      setIsInfoTooltipOpen(true);
      setInfoTooltipStatus("not-ok");
    } finally { console.log("попытка залогиниться"); }
  }, [navigate]
  );

  // регистрация ============================================
  const onRegister = useCallback(async (email, password) => {
    try {
      const data = await auth
        .registration(email, password);
      if (data) {
        setInfoTooltipStatus("ok")
        navigate("/sign-in", { replace: true });
      };
    } catch (err) {
      console.log(err + "fail!!((");
      setInfoTooltipStatus("not-ok");
    } finally {
      setIsInfoTooltipOpen(true)
      console.log("Была попытка регистрации");
    }
  }, [navigate]);

  const infoTooltipOpen = () => {
    // authIdent(true);
    console.log(setInfoTooltipStatus);
  }

  // Здесь переделать проверку авторизации
  const checkAuth = useCallback(async () => {
    //после отладки удалить!
    //localStorage.removeItem("jwt");
    // const token = localStorage.getItem("jwt");
    // if (token) {
      try {
        const user = await auth.checkToken();
        if (!user) {
          throw console.log("invalid userData");
        }
        setIsLoggedIn(true);
        setMailName(user.data.email);
        navigate("/", { replace: true });
      }
      catch (err) { console.log(err) }
      finally { console.log("check token"); }
    /* }
    else {
      console.log("jwt invalid !")
    } */
  }, [navigate]);

/*
  const onSignOut = useCallback( async () => {
    // localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setMailName("");
    navigate("/sign-in", { replace: true });
  }, [navigate]); */

  const onSignOut = useCallback(async () => {
    try {
      const data = await auth.logout();
      if (data) {
        setIsLoggedIn(false);
        setMailName("");
        navigate("/sign-in", { replace: true });
      }
    } catch (err) {
      console.error(err);
    }
  }, [navigate]);


  useEffect(() => { checkAuth(); }, [checkAuth]);

  return (

    <CurrentUserContext.Provider value={currentUser}>

      <div className="App page" >
        <Header
          title='Выйти'
          onLogOut={onSignOut}
          email={mailName}
          route='*'
        />
        <Routes>
          <Route
            path="/sign-in" element=
            {
              <Login onLogin={onLogin}
             />
            }
          />
          <Route
            path="/sign-up"
            element={<Register
              onRegister={onRegister}
              infoTooltipOpen={infoTooltipOpen} />}
          />
          <Route
            path='/'
            element={
              <ProtectedRouteElement
                component={Main}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelClick}
                isLogged={isLogged}
              />
            }
          />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closePopups}
          onSaving={isEditProfilePopupChanging}
          onUseUpdates={updateUserInfo}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closePopups}
          onSaving={isAddPlacePopupChanging}
          onAddCard={handleAddCardSubmit}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closePopups}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closePopups}
          onSaving={isEditAvatarPopupChanging}
          onAvatarUpdates={updateAvatar}
        />
        <PopupAccept
          isOpen={isAcceptPopupOpen}
          onClose={closePopups}
          onDeleteCard={handleCardDel}
          onSaving={isAcceptPopupChanging}
          card={cardDel}
        />
        <InfoTooltip
          isStatus={infoTooltipStatus}
          isOpen={isInfoTooltipOpen}
          onClose={() => setIsInfoTooltipOpen(false)}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
