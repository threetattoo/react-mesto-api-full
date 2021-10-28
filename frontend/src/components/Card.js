import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({onCardClick, onCardLike, onCardDelete, card}) {
  const currentUser = React.useContext (CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some (i => i._id === currentUser._id);

  function handleCardClick () {
    onCardClick (card);
  }

  function handleLikeClick () {
    onCardLike (card, isLiked);
  }

  function handleDeleteClick () {
    onCardDelete (card);
  }

  return (
    <li className="elements__item">
      <img
        className="elements__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <h2 className="elements__title">{card.name}</h2>
      <div className="elements__like-container">
        <button
          type="button"
          className={`elements__like-button ${isLiked ? 'elements__like-button_active' : ''}`}
          onClick={handleLikeClick}
          aria-label="Поставить лайк"
        />
        <p className="elements__like-counter">{card.likes.length}</p>
      </div>
      <button
        type="button"
        className={`elements__delete-button ${isOwn ? 'elements__delete-button_visible' : 'elements__delete-button_hidden'}`}
        onClick={handleDeleteClick}
        aria-label="Удалить фотографию"
      />
    </li>
  );
}

export default Card;
