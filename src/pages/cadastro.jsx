import React, { useState } from 'react';

import '../assets/Css/login.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('A senha e a confirmação de senha não coincidem.');
      return;
    }

    
    console.log('Tentativa de Cadastro:', { name, email, password });
    alert('Cadastro submetido com sucesso! (Lógica real deve ser implementada)');
  };

  return (
    <div className="login-page"> 
      <div className="login-container">
        <h2 className="login-title">Criar Nova Conta</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          
          {/* Campo: Nome Completo */}
          <div className="input-group">
            <label htmlFor="name" className="input-label">Nome Completo</label>
            <input
              type="text"
              id="name"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Campo: E-mail */}
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

          {/* Campo: Senha */}
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

          {/* Campo: Confirmar Senha */}
          <div className="input-group">
            <label htmlFor="confirmPassword" className="input-label">Confirme a Senha</label>
            <input
              type="password"
              id="confirmPassword"
              className="input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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