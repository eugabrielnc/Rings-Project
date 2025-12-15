import React, { useState } from 'react';
import '../assets/Css/login.css';

function Login() {
  const [dados , setDados ] = useState({
    email: '',
    password: ''
  });
  const url = import.meta.env.VITE_API_URL;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados({
      ...dados,
      [name]: value 
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de autenticação aqui
    fetch (`${url}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({
        email: dados.email,
        password: dados.password
      }) 
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados:', error);
      });
    console.log('Tentativa de Login:', { email, password });
    alert('Login submetido! (Lógica real deve ser implementada)');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          
          <div className="input-group">
            <label htmlFor="email" className="input-label">E-mail</label>
            <input
              type="email"
              id="email"
              name='email'
              className="input-field"
              value={dados.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password" className="input-label">Senha</label>
            <input
              type="password"
              id="password"
              name='password'
              className="input-field"
              value={dados.password}
              onChange={handleChange}
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