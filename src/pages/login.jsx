import React, { useState } from 'react';
import '../assets/Css/login.css';
import { saveAuthData } from '../utils/dadosuser';
import { useNavigate } from 'react-router-dom';


function Login() {

  const pageStyle = {
    minHeight: "100vh",
    backgroundImage: "url('/img/fundo2.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center top",
    backgroundRepeat: "no-repeat",
    position: "relative",
  };


  const overlayStyle = {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(255,255,255,0.25)",
    zIndex: 0,
  };

  const contentStyle = {
    position: "relative",
    zIndex: 1,
  };

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
          name: data.username,
          phone: data.phone,
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
  const [showPassword, setShowPassword] = useState(false);

  return (

    <div style={pageStyle}>
      {/* Overlay */}
      <div style={overlayStyle}></div>
      <div style={contentStyle}>
        <div className="login-page">
          <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>

              <div className="input-group">
                <label className="input-label">E-mail</label>
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
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name='password'
                  className="input-field"
                  value={dados.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '38px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#666',
                    fontSize: '18px',
                    padding: '5px'
                  }}
                >
                  <i className={showPassword ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                </button>
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
      </div>
    </div>
  );
}

export default Login;
