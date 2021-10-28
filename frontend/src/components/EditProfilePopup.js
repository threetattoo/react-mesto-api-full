import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

const EditProfilePopup = ({isOpen, onClose, onUpdateUser}) => {
  const currentUser = React.useContext (CurrentUserContext);
  const [name, setName] = React.useState ('');
  const [description, setDescription] = React.useState ('');

  React.useEffect (
    () => {
      setName (currentUser.name);
      setDescription (currentUser.about);
    },
    [currentUser, isOpen]
  );

  function handleChangeName (event) {
    setName (event.target.value);
  }

  function handleChangeDescription (event) {
    setDescription (event.target.value);
  }

  function handleSubmit (event) {
    event.preventDefault ();

    onUpdateUser ({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-label">
        <input
          type="text"
          required
          className="popup__input"
          minLength="2"
          maxLength="40"
          placeholder="Имя"
          name="personName"
          id="person-name"
          value={name || ''}
          onChange={handleChangeName}
        />
        <span className="popup__error person-name-error popup__error-visible" />
      </label>
      <label className="popup__form-label">
        <input
          type="text"
          required
          className="popup__input"
          minLength="2"
          maxLength="200"
          placeholder="Профессия"
          name="personJob"
          id="person-job"
          value={description || ''}
          onChange={handleChangeDescription}
        />
        <span className="popup__error person-job-error popup__error-visible" />
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
