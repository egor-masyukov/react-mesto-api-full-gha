import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
    const avatarRef = useRef();
    useEffect(() => {
        avatarRef.current.value = ''
    }, [props.isOpen]);

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onUpdateAvatar({ avatar: avatarRef.current.value });
    }

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            title='Обновить аватар'
            name='avatar'>

            <input id="input-avatar" ref={avatarRef} type="url" className='popup__input popup__input_type_description' name="avatar"
                placeholder="Ссылка на аватар" required />
            <span id="input-avatar-error" className="popup__input-error"></span>

        </PopupWithForm>
    )
}