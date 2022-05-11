import React, { useEffect, useState } from 'react';
import * as EmailValidator from 'email-validator';
import Style from './Login.module.css';

const SIX = 6;

function Login() {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });
  const [bttnIsDisabled, setBttnIsDisabled] = useState(true);

  const { email, password } = formState;

  const handleInput = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value });
  };

  useEffect(() => {
    const verifyButton = () => {
      const validateEmail = EmailValidator.validate(email);
      const validadePassword = password.length > SIX;
      if (validateEmail && validadePassword) {
        setBttnIsDisabled(false);
      } else {
        setBttnIsDisabled(true);
      }
    };
    verifyButton();
  }, [email, password]);

  const redirect = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    window.location.href = '/foods';
  };

  return (
    <div className={ Style.conteiner__box }>
      <div className={ Style.Logo_box }>
        <img src="https://cdn-icons-png.flaticon.com/512/287/287000.png" alt="icone" />
        <h1>TRYBE</h1>
        <h2>Foods</h2>
        <p>APP de Receitas</p>
      </div>
      <form className={ Style.form_login }>
        <label htmlFor="email-input">
          <input
            id="email-input"
            type="text"
            name="email"
            data-testid="email-input"
            autoComplete="off"
            value={ email }
            onChange={ handleInput }
          />
        </label>
        <label htmlFor="password-input">
          <input
            id="password-input"
            type="password"
            name="password"
            data-testid="password-input"
            autoComplete="off"
            value={ password }
            onChange={ handleInput }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ bttnIsDisabled }
          onClick={ () => {
            redirect();
          } }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
