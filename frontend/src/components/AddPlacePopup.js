import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [name, setName] = React.useState ('');
  const [link, setLink] = React.useState ('');

  function handleChangeName (event) {
    setName (event.target.value);
  }

  function handleChangeLink (event) {
    setLink (event.target.value);
  }

  function handleSubmit (event) {
    event.preventDefault ();
    onAddPlace ({name, link});
    setName('');
    setLink('');
  }

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-label">
        <input
          onChange={handleChangeName}
          value={name || ''}
          type="text"
          required
          className="popup__input"
          minLength="2"
          maxLength="30"
          placeholder="Название"
          name="name"
          id="name"
        />
        <span className="popup__error name-error popup__error-visible" />
      </label>
      <label className="popup__form-label">
        <input
          onChange={handleChangeLink}
          value={link || ''}
          type="url"
          required
          className="popup__input"
          placeholder="Ссылка на картинку"
          name="link"
          id="link"
        />
        <span className="popup__error link-error popup__error-visible" />
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
