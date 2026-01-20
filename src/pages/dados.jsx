import "../assets/Css/dadosp.css"
import { getAuthData } from '../utils/dadosuser'

export default function DadosPessoais() {
const authData = getAuthData();
const email = authData?.email;

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
            <p className="perfil-value"></p>
          </div>

          <div className="perfil-item">
            <span className="perfil-label">E-mail</span>
            <p className="perfil-value">{email}</p>
          </div>

          <div className="perfil-item">
            <span className="perfil-label">Telefone</span>
            <p className="perfil-value">(11) 99999-9999</p>
          </div>

          <div className="perfil-item">
            <span className="perfil-label">Cidade</span>
            <p className="perfil-value">São Paulo - SP</p>
          </div>

          <div className="perfil-item">
            <span className="perfil-label">País</span>
            <p className="perfil-value">Brasil</p>
          </div>
        </div>

        <div className="perfil-actions">
          <button className="perfil-btn">
            Editar Dados
          </button>
        </div>
      </div>
    </section>
  );
}
