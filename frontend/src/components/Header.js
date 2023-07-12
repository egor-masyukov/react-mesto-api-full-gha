import logo from '../images/Vector-logo.svg';
import { Link, useLocation } from 'react-router-dom';


export default function Header({ loggedIn, email, signOut }) {
    const location = useLocation();
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="логотип" />
            <div className='header__auth'>
                {loggedIn ? (
                    <>
                        <p className='header__item'>{email}</p>
                        <Link to='/sign-in' className="header__link" onClick={signOut}>Выйти</Link>
                    </>
                ) : (<>  {location.pathname === '/sign-in' && (
                    <Link to="/sign-up" className="header__item">
                        Регистрация
                    </Link>
                )}
                    {location.pathname === '/sign-up' && (
                        <Link to="/sign-in" className="header__item">
                            Войти
                        </Link>
                    )}
                </>
                )}
            </div>
        </header>
    )
}