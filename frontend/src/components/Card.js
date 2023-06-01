import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardDelete, onCardLike }) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((item) => { return item === currentUser._id });

  function handleClick() {
    onCardClick(card);
  }

  function handleDelClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <div className="card card-template">
      <div>
        {isOwn && (
          <button className="button card__del-btn" type="button" onClick={handleDelClick}></button>
        )}
      </div>
      <img src={card.link} alt={card.name} className="card__image"
        onClick={handleClick} />
      <div className="card__about">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like">
          <button className={`button card__like-btn ${isLiked && "card__like-btn_on"}`} onClick={handleLikeClick} type="button"></button>
          <span className="card__like-count">{card.likes.length}</span>
        </div>
      </div>
    </div>
  )
};

export default Card;