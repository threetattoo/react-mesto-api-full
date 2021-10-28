import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const avatarRef = React.useRef (null);

  function handleSubmit (event) {
    event.preventDefault ();
    onUpdateAvatar ({avatar: avatarRef.current.value});
  }

  React.useEffect(() => {
    avatarRef.current.value = '';
  },
    [isOpen]
  )

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-label">
        <input
          ref={avatarRef}
          type="url"
          required
          className="popup__input"
          placeholder="Ссылка на картинку"
          name="avatarLink"
          id="avatar-link"
        />
        <span className="popup__error avatar-link-error popup__error-visible" />
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
