import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from '../components/Login.js'
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import MainPage from './MainPage.js';
import { useEffect, useState } from 'react';
import { authApi } from '../utils/authApi.js';
import { api } from '../utils/api.js';
import InfoTooltip from './InfoTooltip.js';

function App() {

    const navigate = useNavigate();

    const [loggedIn, setLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    const [isSuccessPopupOpened, setIsSuccessPopupOpened] = useState(false);

    const [isErrorPopupOpened, setIsErrorPopupOpened] = useState(false);

    const [currentUser, setCurrentUser] = useState(null);
    const [cards, setCards] = useState([]);

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

    const [selectedCard, setSelectedCard] = useState(null);

    const handleRegisterSubmit = (email, password) => {
        authApi.signUp(email, password)
            .then(() => {
                setIsSuccessPopupOpened(true);
            })
            .catch(() => setIsErrorPopupOpened(true))
    }

    const handleLoginSubmit = (email, password) => {
        authApi.signIn(email, password)
            .then((response) => {
                localStorage.setItem('token', response.token);
                setLoggedIn(true);
                setUserEmail(email);
                navigate('/');
            })
            .catch(() => setIsErrorPopupOpened(true))
    }

    const onLogout = () => {
        setLoggedIn(false);
        localStorage.removeItem('token');
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            authApi.checkUser(token)
                .then((response) => {
                    setLoggedIn(true);
                    setUserEmail(response.data.email);
                })
                .catch((error) => alert(`ошибка логина: ${error}`))
        }
    }, []);

    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((prevCards) => prevCards.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((error) => alert(error));
    }

    const handleCardDelete = (card) => {
        api.deleteCard(card._id)
            .then(() => {
                setCards((prevCards) => prevCards.filter((c) => c._id !== card._id));
            })
            .catch((error) => alert(error));
    };

    useEffect(() => {
        if (loggedIn) {
            Promise.all([api.getUserInfo(), api.getInitialCards()])
                .then((response) => {
                    setCurrentUser(response[0]);
                    setCards(response[1]);
                })
                .catch((error) => alert(error));
        }
    }, [loggedIn]);

    const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
    const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
    const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);

    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(null);
        setIsErrorPopupOpened(false);
        setIsSuccessPopupOpened(false);
        setIsErrorPopupOpened(false);
    }

    const handleCardClick = (card) => { setSelectedCard(card) };

    const handleUpdateUser = ({ name, about }) => {
        api.editUserInfo(name, about)
            .then((result) => {
                setCurrentUser(result);
                closeAllPopups();
            })
            .catch((error) => alert(error));
    }

    const handleUpdateAvatar = ({ avatar }) => {
        api.editUserAvatar(avatar)
            .then((result) => {
                setCurrentUser(result);
                closeAllPopups();
            })
            .catch((error) => alert(error));
    }

    const handleAddPlaceSubmit = ({ name, link }) => {
        api.addNewCard(name, link)
            .then((response) => {
                setCards([response, ...cards]);
                closeAllPopups();
            })
            .catch((error) => alert(error));
    }

    return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={<ProtectedRoute
                        element={MainPage}
                        loggedIn={loggedIn}
                        userEmail={userEmail}
                        isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                        isEditProfilePopupOpen={isEditProfilePopupOpen}
                        isAddPlacePopupOpen={isAddPlacePopupOpen}
                        selectedCard={selectedCard}
                        handleCardLike={handleCardLike}
                        handleCardDelete={handleCardDelete}
                        handleEditAvatarClick={handleEditAvatarClick}
                        handleEditProfileClick={handleEditProfileClick}
                        handleAddPlaceClick={handleAddPlaceClick}
                        handleCardClick={handleCardClick}
                        handleUpdateUser={handleUpdateUser}
                        handleUpdateAvatar={handleUpdateAvatar}
                        handleAddPlaceSubmit={handleAddPlaceSubmit}
                        cards={cards}
                        currentUser={currentUser}
                        closeAllPopups={closeAllPopups}
                        onLogout={onLogout}
                    />}
                />
                <Route
                    path="/sign-up"
                    element={<Register 
                        handleRegisterSubmit={handleRegisterSubmit}
                        loggedIn={loggedIn} 
                    />}
                />
                <Route
                    path="/sign-in"
                    element={<Login
                        handleLoginSubmit={handleLoginSubmit}
                        loggedIn={loggedIn}
                    />} />
            </Routes>
            <InfoTooltip image={'./images/reg-error.svg'} isOpen={isErrorPopupOpened} isSuccess={false} onClose={closeAllPopups}/>
            <InfoTooltip image={'./images/reg-success.svg'} isOpen={isSuccessPopupOpened} isSuccess={true} onClose={closeAllPopups}/>
        </div>
    );
}

export default App;
