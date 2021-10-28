function ImagePopup({onClose, card}) {
  return (
    <section
      className={`popup popup_type_view-image ${card.link ? 'popup_opened' : ''}`}
    >
      <div className="popup__container popup__container_image">
        <img className="popup__image" src={card.link} alt={card.name} />
        <p className="popup__image-caption">{card.name}</p>
        <button
          type="button"
          className="popup__close-button"
          aria-label="Закрыть попап"
          onClick={onClose}
        />
      </div>
    </section>
  );
}

export default ImagePopup;
