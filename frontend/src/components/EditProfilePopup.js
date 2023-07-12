import React, { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onUpdateUser({ name: name, about: description });
    }

    const handleName = (event) => { setName(event.target.value) }
    const handleDescription = (event) => { setDescription(event.target.value) }

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            title='Редактировать профиль'
            name='profile'>

            <input id="input-name" onChange={handleName} value={name || ''} type="text" className='popup__input popup__input_type_name' name="userName"
                placeholder="Имя" minLength="2" maxLength="40" required />
            <span id="input-name-error" className="popup__input-error"></span>
            <input id="input-description" onChange={handleDescription} value={description || ''} type="text" className='popup__input popup__input_type_description'
                name="userText" placeholder="О себе" minLength="2" maxLength="200" required />
            <span id="input-description-error" className="popup__input-error"></span>

        </PopupWithForm>
    )
}