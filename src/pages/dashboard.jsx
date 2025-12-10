export default function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "25px", fontSize: "26px", color: "#C9A86A" }}>
        Dashboard Administrativa
      </h2>

      {/* CARDS RESUMO */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        
        <div style={{
          flex: 1,
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}>
          <h3 style={{ color: "#444" }}>Usuários</h3>
          <p style={{ fontSize: "32px", marginTop: "10px", color: "#C9A86A" }}>
            124
          </p>
        </div>

        <div style={{
          flex: 1,
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}>
          <h3 style={{ color: "#444" }}>Produtos</h3>
          <p style={{ fontSize: "32px", marginTop: "10px", color: "#C9A86A" }}>
            58
          </p>
        </div>

      </div>

      {/* GRAFICO FAKE */}
      <div style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        marginBottom: "30px"
      }}>
        <h3 style={{ marginBottom: "10px" }}>Gráfico de Atividade (fake)</h3>

        <div style={{
          height: "200px",
          background: "linear-gradient(to right, #C9A86A33, #ffffff)",
          borderRadius: "10px",
        }} />
      </div>

      {/* LISTAS */}
      <div style={{ display: "flex", gap: "20px" }}>
        
        {/* Últimos usuários */}
        <div style={{
          flex: 1,
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
        }}>
          <h3>Últimos Usuários</h3>
          <ul style={{ marginTop: "15px", paddingLeft: "18px" }}>
            <li>Maria Silva</li>
            <li>João Pereira</li>
            <li>Ana Rodrigues</li>
            <li>Carlos Eduardo</li>
          </ul>
        </div>

        {/* Últimos produtos */}
        <div style={{
          flex: 1,
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
        }}>
          <h3>Últimos Produtos</h3>
          <ul style={{ marginTop: "15px", paddingLeft: "18px" }}>
            <li>Produto A</li>
            <li>Produto B</li>
            <li>Produto C</li>
            <li>Produto D</li>
          </ul>
        </div>

      </div>

    </div>
  );
}
