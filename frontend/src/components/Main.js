import React, { useContext } from "react";
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';
import avatar from '../images/image.jpg';

export default function Main(props) {
    const currentUser = useContext(CurrentUserContext);
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__zone">
                    <button className="profile__avatar-button" type='button' onClick={props.onEditAvatar}>
                        <img className="profile__avatar-src" src={currentUser.avatar || avatar} alt="Аватар" />
                    </button>

                    <div className="profile__info">
                        <div className="profile__edit-title">
                            <h1 className="profile__title">{currentUser.name || "Жак-Ив Кусто"}</h1>
                            <button className="profile__edit-button" type="button" name="buttonProfile" onClick={props.onEditProfile} />
                        </div>
                        <p className="profile__subtitle">{currentUser.about || "Исследователь океана"}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" name="buttonCards" onClick={props.onAddPlace} />
            </section>
            <section className="places">
                <ul className="places__cards">
                    {props.cards.map((card) => (
                        <Card
                            key={card._id}
                            link={card.link}
                            name={card.name}
                            likes={card.likes.length}
                            onCardClick={props.onCardClick}
                            onCardDelete={props.onCardDelete}
                            onCardLike={props.onCardLike}
                            card={card} />
                    ))
                    }
                </ul>
            </section>
        </main>
    )
}