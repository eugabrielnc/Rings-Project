import React, { useState } from 'react';
import '../assets/Css/login.css';
import { saveAuthData } from '../utils/dadosuser';
import { useNavigate } from 'react-router-dom';


function Login() {

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [dados, setDados] = useState({
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
    fetch(`${url}/users/auth`, {
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
  console.log("RESPOSTA LOGIN:", data);

  if (!data.access_token?.token) {
    console.error("BACKEND NÃO RETORNOU TOKEN");
    setErrorMessage("E-mail ou senha inválidos");

    return;
  }

  saveAuthData({
    id: data.user_id,
    email: dados.email,
    role: data.role,
    token: data.access_token.token
  });

  console.log("SALVO:", localStorage.getItem("user_data"));

  navigate('/');
})
  .catch((error) => {
    console.error("Erro ao fazer login:", error);
    setErrorMessage("E-mail ou senha inválidos");
  });
};

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>

          <div className="input-group">
            <label  className="input-label">E-mail</label>
            <input
              
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
          <p style={{ color: 'red' }}>{errorMessage}</p>

          <button type="submit" className="login-button">
            ENTRAR
          </button>
        </form>
        <p className="forgot-password">
          <a href="/novasenha">Esqueceu sua senha?</a>
        </p>
        <p className="forgot-password">
          <a href="/cadastro">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
