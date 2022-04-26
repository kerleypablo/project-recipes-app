import React, { useState } from 'react';

function Login() {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formState;

  const handleInput = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value });
  };

  return (
    <div>
      <form>
        <label htmlFor="email-input">
          <input
            id="email-input"
            name="email"
            data-testid="email-input"
            value={ email }
            onChange={ handleInput }
          />
        </label>
        <label htmlFor="password-input">
          <input
            id="password-input"
            name="password"
            data-testid="password-input"
            value={ password }
            onChange={ handleInput }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-btn"
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
