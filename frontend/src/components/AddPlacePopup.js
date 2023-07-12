import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen])

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onAddPlace({ name, link });
    }
    const handleName = (event) => { setName(event.target.value) }
    const handleLink = (event) => { setLink(event.target.value) }
    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            title='Новое место'
            buttonText='Создать'
            name='addCard'>

            <input id="input-title" type="text" className='popup__input popup__input_type_name' onChange={handleName} value={name} name="cardName"
                placeholder="Название" minLength="2" maxLength="30" required />
            <span id="input-title-error" className="popup__input-error"></span>
            <input id="input-link" type="url" className='popup__input popup__input_type_description' onChange={handleLink} value={link} name="cardUrl"
                placeholder="Ссылка на картинку" required />
            <span id="input-link-error" className="popup__input-error"></span>

        </PopupWithForm>
    )
}