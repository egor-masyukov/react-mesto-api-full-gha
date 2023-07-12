import React from "react";

export default function PopupWithForm(props) {
    const popupOpenClass = props.isOpen ? "popup_opened" : ""
    return (
        <div className={`popup ${popupOpenClass}`}>
            <div className="popup__container">
                <h2 className="popup__label">{props.title}</h2>
                <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
                    {props.children}
                    <button className="popup__button-save" type="submit">{props.buttonText || 'Сохранить'}</button>
                </form>
                <button className="popup__button-close" type="button" onClick={props.onClose} />
            </div>
        </div>
    )
}
