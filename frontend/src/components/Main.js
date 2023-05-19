import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Card from "./Card.js";

function Main({ cards, onCardClick, onEditAvatar, onEditProfile, onAddPlace, onCardDelete, onCardLike }) {

  const currentUser = useContext(CurrentUserContext);

  return (
      <main className="content page__content">
        <section className="profile content__section">
          <div className="profile__box">
            <div className="profile__avatar-box">
              <img src={`${currentUser.avatar}`} className="profile__avatar" alt="Аватарка" />
              <button onClick={onEditAvatar} className="profile__avatar-btn">
              </button>
            </div>
            <div className="profile__user-box">
              <h1 className="profile__user-name">{currentUser.name}</h1>
              <button onClick={onEditProfile}
                className="button profile__edit-btn" type="button"></button>
              <p className="profile__user-activity">{currentUser.about}</p>
            </div>
            <button onClick={onAddPlace}
              className="button profile__add-btn" type="button"></button>
          </div>
        </section>
        <section className="elements content__section" aria-label="Фотогалерея">
          {cards.map((card) => {
            return (
              <Card
                onCardClick={onCardClick}
                card={card}
                name={card.name}
                link={card.link}
                key={card._id}
                onCardDelete={onCardDelete}
                onCardLike={onCardLike}
              />
            );
          })}
        </section>
      </main>
  )
};

export default Main;