import React, { useState } from 'react';
import '../assets/Css/login.css';

function Signup() {
  const url = import.meta.env.VITE_API_URL;

  const [userdados, setUserdados] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const [aceitouPolitica, setAceitouPolitica] = useState(false);
  const [mostrarPolitica, setMostrarPolitica] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserdados({
      ...userdados,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!aceitouPolitica) {
      alert('Você precisa aceitar a Política de Privacidade para se cadastrar.');
      return;
    }

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
    });

    alert('Cadastro submetido com sucesso!');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Criar Nova Conta</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Nome Completo</label>
            <input
              type="text"
              name="name"
              className="input-field"
              value={userdados.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">E-mail</label>
            <input
              type="email"
              name="email"
              className="input-field"
              value={userdados.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Senha</label>
            <input
              type="password"
              name="password"
              className="input-field"
              value={userdados.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Confirme a Senha</label>
            <input
              type="password"
              name="confirmPassword"
              className="input-field"
              value={userdados.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* ACEITE DA POLÍTICA */}
          <div className="input-group">
            <label>
              <input
                type="checkbox"
                checked={aceitouPolitica}
                onChange={(e) => setAceitouPolitica(e.target.checked)}
              />{' '}
              Li e aceito a{' '}
              <span
                onClick={() => setMostrarPolitica(!mostrarPolitica)}
                style={{
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  color: '#007bff'
                }}
              >
                Política de Privacidade
              </span>
            </label>
          </div>

          <button type="submit" className="login-button">
            CADASTRAR
          </button>
        </form>

        {/* POLÍTICA DE PRIVACIDADE (ESTILIZADA INLINE) */}
        {mostrarPolitica && (
          <div
            style={{
              marginTop: '20px',
              padding: '20px',
              maxHeight: '300px',
              overflowY: 'auto',
              backgroundColor: '#fafafa',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#333'
            }}
          >
            <h3 style={{ textAlign: 'center', marginBottom: '15px', color: '#222' }}>
              Política de Privacidade – Alianças Eternas
            </h3>

            <p>
              A Alianças Eternas valoriza a sua privacidade e se compromete com a proteção
              dos dados pessoais de todos os usuários que acessam, navegam ou realizam
              compras em nosso site. Esta Política explica de forma clara como coletamos,
              utilizamos, armazenamos e protegemos suas informações, em conformidade com a
              Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018).
            </p>

            <p><strong>1. Objetivo da coleta de dados</strong><br />
              As informações coletadas têm como finalidade proporcionar uma experiência
              segura, eficiente e personalizada, viabilizando a navegação no site, a
              conclusão de compras, o atendimento ao cliente e o cumprimento de obrigações
              legais.
            </p>

            <p><strong>2. Dados coletados</strong><br />
              Podemos coletar os seguintes dados:
            </p>

            <p>
              <strong>a) Informações fornecidas pelo usuário:</strong><br />
              Nome, CPF, e-mail, telefone, endereço de entrega e demais dados necessários
              para cadastro, compra e atendimento.
            </p>

            <p>
              <strong>b) Informações de navegação:</strong><br />
              Endereço IP, tipo de dispositivo, navegador, páginas acessadas, tempo de
              permanência, cookies e dados de localização aproximada, utilizados para
              análise de desempenho e melhorias do site.
            </p>

            <p><strong>3. Utilização dos dados</strong><br />
              Os dados coletados poderão ser utilizados para:
            </p>

            <p>
              – Processamento e entrega de pedidos;<br />
              – Comunicação com o cliente antes, durante e após a compra;<br />
              – Personalização da navegação e melhoria da experiência do usuário;<br />
              – Envio de comunicações promocionais, quando autorizado;<br />
              – Cumprimento de obrigações legais, regulatórias ou judiciais.
            </p>

            <p><strong>4. Compartilhamento de informações</strong><br />
              Seus dados poderão ser compartilhados apenas quando necessário com:
            </p>

            <p>
              – Transportadoras e serviços logísticos;<br />
              – Intermediadores e operadoras de pagamento;<br />
              – Plataformas de atendimento e tecnologia;<br />
              – Autoridades públicas, mediante obrigação legal.
            </p>

            <p>
              A Alianças Eternas não comercializa dados pessoais sob nenhuma hipótese.
            </p>

            <p><strong>5. Segurança das informações</strong><br />
              Adotamos medidas técnicas e organizacionais adequadas para proteger os dados
              contra acessos não autorizados, vazamentos, perdas ou usos indevidos.
            </p>

            <p><strong>6. Cookies e tecnologias semelhantes</strong></p>

            <p><strong>7. Armazenamento e retenção dos dados</strong></p>

            <p><strong>8. Direitos do titular de dados</strong></p>

            <p><strong>9. Atualizações desta Política</strong></p>

            <p><strong>10. Contato</strong></p>
          </div>
        )}

        <p className="forgot-password">
          Já tem uma conta? <a href="/login">Faça Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
