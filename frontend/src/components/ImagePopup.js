import React from 'react';

export default function ImagePopup(props) {
    return (

        <div className={`popup popup-image ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup-image__container">
                <div className="popup-image__opened">
                    <img className="popup-image__opened-src" src={props.card.link} alt={props.card.name} />
                    <p className="popup-image__opened-description">{props.card.name}</p>
                </div>
                <button className="popup__button-close" type="button" onClick={props.onClose} />
            </div>
        </div>
    )
}