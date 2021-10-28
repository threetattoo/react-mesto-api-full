import React from 'react';
import regAcceptImg from '../images/RegAccept.svg';
import regDeclineImg from '../images/RegDecline.svg';

function InfoTooltip (props) {
  return (
    <section className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__modal-container">
        <div className="popup__modal-icon-wrapper">
          <img
            className="popup__modal-icon"
            src={props.isSignedUp ? regAcceptImg : regDeclineImg}
            alt={
              props.isSignedUp
                ? 'иконка оповещения об успешной регистрации'
                : 'иконка оповещения о неудачной регистрации'
            }
          />
        </div>
        {props.isSignedUp
          ? <h2 className="popup__modal-title">
              Вы успешно зарегистрировались!
            </h2>
          : <h2 className="popup__modal-title">
              Что-то пошло не так! Попробуйте ещё раз.
            </h2>}
        <button
          className="popup__close-button popup__close-button_modal"
          type="button"
          onClick={props.onClose}
        />
      </div>
    </section>
  );
}

export default InfoTooltip;
