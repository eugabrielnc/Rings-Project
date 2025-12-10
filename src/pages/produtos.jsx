export default function Produtos() {
  const produtos = [
    { id: 1, nome: "Camiseta Premium", preco: "R$ 129,90", estoque: 12 },
    { id: 2, nome: "Tênis Casual", preco: "R$ 249,90", estoque: 5 },
    { id: 3, nome: "Relógio Dourado", preco: "R$ 399,90", estoque: 2 },
    { id: 4, nome: "Bermuda Masculina", preco: "R$ 89,90", estoque: 22 },
  ];

  return (
    <div style={{ padding: "20px" }}>
      
      {/* TÍTULO + BOTÃO */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "25px"
      }}>
        
        <h2 style={{ fontSize: "26px", color: "#C9A86A" }}>
          Gerenciar Produtos
        </h2>
        
        <button style={{
          background: "#C9A86A",
          color: "#fff",
          padding: "10px 18px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          fontWeight: "600",
          transition: "0.3s"
        }}>
          + Adicionar Produto
        </button>

      </div>

      {/* TABELA */}
      <div style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
      }}>
        
        <table style={{
          width: "100%",
          borderCollapse: "collapse"
        }}>
          <thead>
            <tr style={{ background: "#F9F5EE" }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Produto</th>
              <th style={thStyle}>Preço</th>
              <th style={thStyle}>Estoque</th>
              <th style={thStyle}>Ações</th>
            </tr>
          </thead>

          <tbody>
            {produtos.map(produto => (
              <tr key={produto.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={tdStyle}>{produto.id}</td>
                <td style={tdStyle}>{produto.nome}</td>
                <td style={tdStyle}>{produto.preco}</td>
                <td style={tdStyle}>{produto.estoque}</td>
                <td style={tdStyle}>
                  
                  <button style={btnEdit}>Editar</button>
                  <button style={btnDel}>Excluir</button>
                
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

/* ======= ESTILOS COMUNS ======= */

const thStyle = {
  padding: "12px",
  textAlign: "left",
  color: "#444",
  fontWeight: "600",
  borderBottom: "2px solid #eee",
};

const tdStyle = {
  padding: "12px",
  fontSize: "15px",
  color: "#555",
};

const btnEdit = {
  background: "#C9A86A",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  marginRight: "10px",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "0.3s"
};

const btnDel = {
  background: "#d9534f",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "0.3s"
};
