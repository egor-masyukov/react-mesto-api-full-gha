import { useState } from 'react';

export default function Login({ onLogin }) {
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
    onLogin(email, password);
  };

  return (
    <div className='auth'>
      <h2 className='auth__title'>Вход</h2>
      <form className='auth__form' onSubmit={handleSubmit}>
        <input className='auth__input' type='email' value={email} onChange={handleEmail} autoComplete="email"
          required placeholder="Email" minLength="3" maxLength="50" ></input>
        <input className='auth__input' type='password' value={password} onChange={handlePassword} autoComplete="password" required placeholder="Пароль" minLength="3" maxLength="50"></input>
        <button className='auth__button'>Войти</button>
      </form>
    </div>
  );
};