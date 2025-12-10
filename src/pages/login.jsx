import React, { useState } from 'react';
import '../assets/Css/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de autenticação aqui
    console.log('Tentativa de Login:', { email, password });
    alert('Login submetido! (Lógica real deve ser implementada)');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Acesso Restrito</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          
          <div className="input-group">
            <label htmlFor="email" className="input-label">E-mail</label>
            <input
              type="email"
              id="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password" className="input-label">Senha</label>
            <input
              type="password"
              id="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">
            ENTRAR
          </button>
          
        </form>
        <p className="forgot-password">
          <a href="/forgot-password">Esqueceu sua senha?</a>
        </p>
        <p className="forgot-password">
          <a href="/cadastro">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
}

export default Login;