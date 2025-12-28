import React, { useState, useEffect, use } from 'react';

import '../assets/Css/login.css';

function Signup() {
  const url = import.meta.env.VITE_API_URL;
  const [ userdados, setUserdados ] = useState({
      email: '',
      password: '',
      name: '',
      confirmPassword: ''
    });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserdados({
      ...userdados,
      [name]: value 
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userdados.password !== userdados.confirmPassword) {
      alert('A senha e a confirmação de senha não coincidem.');
      return;
    }

    fetch(`${url}/users/create-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({
        name: userdados.name,
        email: userdados.email,
        password: userdados.password
      }) 
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados:', error);
      });
    console.log('Tentativa de Cadastro:', { name: userdados.name, email: userdados.email, password: userdados.password });
    alert('Cadastro submetido com sucesso! (Lógica real deve ser implementada)');
  };

  return (
    <div className="login-page"> 
      <div className="login-container">
        <h2 className="login-title">Criar Nova Conta</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name" className="input-label">Nome Completo</label>
            <input
              type="text"
              name="name"
              id="name"
              className="input-field"
              value={userdados.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email" className="input-label">E-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              className="input-field"
              value={userdados.email}
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
              value={userdados.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword" className="input-label">Confirme a Senha</label>
            <input
              type="password"
              id="confirmPassword"
              name='confirmPassword'
              className="input-field"
              value={userdados.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">
            CADASTRAR
          </button>
          
        </form>
        
        <p className="forgot-password">
          Já tem uma conta? <a href="/login">Faça Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;