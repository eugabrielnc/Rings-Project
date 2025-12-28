export default function MeusPedidos() {
  return (
    <section className="perfil-wrapper">
      <header className="perfil-header">
        <h1>Meus Pedidos</h1>
        <span className="perfil-subtitle">
          Acompanhe o status dos seus pedidos
        </span>
      </header>

      <div className="perfil-card">
        <div className="perfil-grid">
          
          {/* Pedido 1 */}
          <div className="perfil-item">
            <span className="perfil-label">Pedido</span>
            <p className="perfil-value">#10234</p>

            <span className="perfil-label">Data</span>
            <p className="perfil-value">12/09/2025</p>

            <span className="perfil-label">Status</span>
            <p className="perfil-value" style={{ color: "#b89634" }}>
              Em processamento
            </p>
          </div>

          {/* Pedido 2 */}
          <div className="perfil-item">
            <span className="perfil-label">Pedido</span>
            <p className="perfil-value">#10210</p>

            <span className="perfil-label">Data</span>
            <p className="perfil-value">05/09/2025</p>

            <span className="perfil-label">Status</span>
            <p className="perfil-value" style={{ color: "#4caf50" }}>
              Entregue
            </p>
          </div>

          {/* Pedido 3 */}
          <div className="perfil-item">
            <span className="perfil-label">Pedido</span>
            <p className="perfil-value">#10188</p>

            <span className="perfil-label">Data</span>
            <p className="perfil-value">28/08/2025</p>

            <span className="perfil-label">Status</span>
            <p className="perfil-value" style={{ color: "#f57c00" }}>
              Enviado
            </p>
          </div>

        </div>

        <div className="perfil-actions">
          <button className="perfil-btn">
            Ver Detalhes
          </button>
        </div>
      </div>
    </section>
  );
}
