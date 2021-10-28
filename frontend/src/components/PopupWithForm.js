function PopupWithForm({
  name,
  title,
  children,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <section
      className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
    >
      <div className="popup__container">
        <form
          className="popup__form popup__form_avatar-edit"
          name={name}
          onSubmit={onSubmit}
        >
          <h2 className="popup__form-title">{title}</h2>
          <fieldset className="popup__fieldset">
            {children}
            <button
              type="submit"
              className="popup__button"
              aria-label="Сохранить информацию"
            >
              {buttonText}
            </button>
          </fieldset>
        </form>
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

export default PopupWithForm;
