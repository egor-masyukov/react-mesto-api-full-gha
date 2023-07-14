import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from "./InfoTooltip";
import Register from './Register';
import Login from './Login';
import { register, authorize, checkToken } from '../utils/auth';

export default function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [cards, setCards] = useState([]);
    const [isImageOpen, setIsImageOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState(null);
    const [infoTooltip, setInfoTooltip] = useState(false);
    const [isOkay, setIsOkay] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        if (token) {
            Promise.all([api.getUserData(), api.getInitialCards()])
                .then(([userData, cardData]) => {
                    setCurrentUser(userData);
                    setCards(cardData);
                })
                .catch(err => alert(`Произошла ошибка, ${err}`))
        }
    }, [loggedIn])

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            checkToken(token)
                .then((res) => {
                    if (res) {
                        setLoggedIn(true);
                        setEmail(res.email);
                        navigate('/');
                    }
                })
                .catch( (err) => { localStorage.removeItem('token'); alert(`Произошла ошибка, ${err}`) })
        }
    }, []);

    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i === currentUser._id);
        if (!isLiked) {
            api.setLike(card._id).then((newCard) => {
                setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
            }).catch(err => alert(`Произошла ошибка, ${err}`))
        }

        else {
            api.deleteLike(card._id).then((newCard) => {
                setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
            }).catch(err => alert(`Произошла ошибка, ${err}`))
        }
    }

    const handleCardDelete = (card) => {
        api.deleteCard(card._id)
            .then(() => { setCards((cardsArray) => cardsArray.filter((cardItem) => cardItem._id !== card._id)) })
            .catch(err => alert(`Произошла ошибка, ${err}`))
    }

    const handleUpdateUser = (userData) => {
        api.editUserData(userData.name, userData.about)
            .then((res) => { setCurrentUser(res); closeAllPopups() })
            .catch(err => alert(`Произошла ошибка, ${err}`))
    }

    const handleUpdateAvatar = (link) => {
        api.editAvatar(link)
            .then((res) => { setCurrentUser(res); closeAllPopups() })
            .catch(err => alert(`Произошла ошибка, ${err}`))
    }

    const handleAddPlaceSubmit = (cardData) => {
        api.addCard(cardData.name, cardData.link)
            .then((card) => { setCards([card, ...cards]); closeAllPopups() })
            .catch(err => alert(`Произошла ошибка, ${err}`))
    }

    const handleEditProfileClick = () => { setIsEditProfilePopupOpen(true); }

    const handleAddPlaceClick = () => { setIsAddPlacePopupOpen(true); }

    const handleEditAvatarClick = () => { setIsEditAvatarPopupOpen(true); }

    const openInfoTooltip = (status = true) => { 
        setInfoTooltip(true);
        setIsOkay(status); 
    };

    const handleCardClick = (card) => {
        setIsImageOpen(true);
        setSelectedCard({ ...selectedCard, name: card.name, link: card.link })
    }

    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsImageOpen(false);
        setInfoTooltip(false);
    }

    const handleLogin = (email, password) => {
        authorize(email, password)
            .then(() => {
                const token = localStorage.getItem('token');
                if (token) {setLoggedIn(true);
                setEmail(email);
                navigate("/");}
                
            }).catch(() => {
                setLoggedIn(false);
                openInfoTooltip(false);
            });
    };

    const handleRegister = (email, password) => {
        register(email, password)
            .then(() => {
                openInfoTooltip(true);
                navigate("/sign-in");
            }).catch(() => {
                openInfoTooltip(false);
            })
    };

    const handleLogOut = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
        setEmail(null);
        navigate("/sign-in");
    };

    return (
        <CurrentUserContext.Provider value={currentUser}>

            <Header
                loggedIn={loggedIn}
                email={email}
                signOut={handleLogOut} />

            <Routes>
                <Route exact path='/'
                    element={
                        <ProtectedRoute
                            element={Main}
                            loggedIn={loggedIn}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            onCardClick={handleCardClick}
                            onCardDelete={handleCardDelete}
                            onCardLike={handleCardLike}
                            cards={cards}
                        />
                    }
                />

                <Route path='/sign-up'
                    element={
                        <Register
                            onRegister={handleRegister}
                        />
                    }
                />

                <Route path='/sign-in'
                    element={
                        <Login
                            onLogin={handleLogin}
                        />
                    }
                />

                <Route exact path="*"
                    element={
                        loggedIn ? <Navigate to="/" />
                            : <Navigate to="/sign-in" />
                    }
                />
            </Routes>

            <Footer />

            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser} />

            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar} />

            < AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit} />

            < ImagePopup
                isOpen={isImageOpen}
                onClose={closeAllPopups}
                card={selectedCard} />

            <InfoTooltip
                popupStatus={isOkay}
                isOpen={infoTooltip}
                onClose={closeAllPopups}
            />

        </CurrentUserContext.Provider>
    );
}
