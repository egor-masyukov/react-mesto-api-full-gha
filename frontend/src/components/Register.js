import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register({ onRegister }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleEmail = event => {
    setEmail(event.target.value);
  };

  const handlePassword = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onRegister(email, password);
  };

  return (
    <section className='auth'>
      <h2 className='auth__title'>Регистрация</h2>
      <form className='auth__form' onSubmit={handleSubmit}>
        <input className='auth__input' type='email' placeholder='Email' value={email} onChange={handleEmail} autoComplete="email" required></input>
        <input className='auth__input' type='password' placeholder='Пароль' value={password} onChange={handlePassword} autoComplete="password" required></input>
        <button className='auth__button'>Зарегистрироваться</button>
      </form>
      <p className='auth__button-register'>Уже зарегистрированы? <Link to="/signin" className='auth__button-register'> Войти</Link></p>
    </section>
  );
};