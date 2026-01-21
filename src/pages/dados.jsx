import "../assets/Css/dadosp.css"
import { getAuthData } from '../utils/dadosuser'

export default function DadosPessoais() {
  const authData = getAuthData();
  const email = authData?.email;
  const name = authData?.name;
  const phone = authData?.phone;

  return (
    <section className="perfil-wrapper">
      <header className="perfil-header">
        <h1>Dados Pessoais</h1>
        <span className="perfil-subtitle">
          Informações da sua conta
        </span>
      </header>

      <div className="perfil-card">
        <div className="perfil-grid">
          <div className="perfil-item">
            <span className="perfil-label">Nome completo</span>
            <p className="perfil-value">{name}</p>
          </div>

          <div className="perfil-item">
            <span className="perfil-label">E-mail</span>
            <p className="perfil-value">{email}</p>
          </div>

          <div className="perfil-item">
            <span className="perfil-label">Telefone</span>
            <p className="perfil-value">{phone}</p>
          </div>


        </div>

        <div className="perfil-actions">
          <a className="perfil-btn" href="/novasenha">
            Editar senha
          </a>
        </div>
      </div>
    </section>
  );
}
