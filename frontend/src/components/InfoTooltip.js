import authorize from '../images/authorize.svg'
import forbidden from '../images/forbidden.svg'

export default function InfoTooltip({ popupStatus, isOpen, onClose }) {
  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <img src={popupStatus ? authorize : forbidden} alt={popupStatus 
        ? 'Вы успешно зарегистрировались!' 
        : 'Что-то пошло не так! Попробуйте ещё раз.'
        } className="popup__icon" />
        <p className="popup__icon-text"> {popupStatus
          ? 'Вы успешно зарегистрировались!'
          : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
        <button onClick={onClose} className="popup__button-close" type="button"></button>
      </div>
    </div>
  );
};