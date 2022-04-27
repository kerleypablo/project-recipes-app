import React, { useEffect, useState } from 'react';
import * as EmailValidator from 'email-validator';
import './Login.css';

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
    <div>
      <form>
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
