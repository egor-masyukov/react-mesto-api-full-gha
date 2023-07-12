import React, { useContext } from "react";
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function Card(props) {
    const currentUser = useContext(CurrentUserContext);
    const handleClick = () => { props.onCardClick(props.card); }
    const handleDeleteClick = () => { props.onCardDelete(props.card); }
    const handleLikeClick = () => { props.onCardLike(props.card); }

    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `place__like-button ${isLiked && 'place__like-button_active'}`);


    return (
        <li className="place">
            <img className="place__image" onClick={handleClick} src={props.link} alt={props.name} />
            {isOwn && <button className="place__button-delete" type="button" onClick={handleDeleteClick} />}
            <div className="place__title-zone">
                <h2 className="place__title">{props.name}</h2>
                <div className="place__like">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} />
                    <p className="place__like-sum">{props.likes}</p>
                </div>
            </div>
        </li>
    )
}