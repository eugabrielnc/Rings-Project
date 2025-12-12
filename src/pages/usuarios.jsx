import { useEffect, useState } from "react";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const url = import.meta.env.VITE_API_URL;
  // ===== GET NA API AO CARREGAR A PÁGINA =====
  useEffect(() => {
    fetch(`${url}/`)   // ⬅ troque pelo seu endpoint
      .then(response => response.json())
      .then(data => {
        // A API retorna name e email — adaptamos para a tabela
        const usuariosFormatados = data.map(u => ({
          id: u.id,
          nome: u.name,
          email: u.email,
          cargo: "—" // API não tem cargo, então deixei vazio
        }));

        setUsuarios(usuariosFormatados);
      })
      .catch(err => console.error("Erro ao buscar usuários:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      
      {/* TÍTULO E BOTÃO */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "25px"
      }}>
        
        <h2 style={{ fontSize: "26px", color: "#C9A86A" }}>
          Gerenciar Usuários
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
          + Adicionar Usuário
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
              <th style={thStyle}>Nome</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Cargo</th>
              <th style={thStyle}>Ações</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.map(user => (
              <tr key={user.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={tdStyle}>{user.id}</td>
                <td style={tdStyle}>{user.nome}</td>
                <td style={tdStyle}>{user.email}</td>
                <td style={tdStyle}>{user.cargo}</td>
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

/* ======= ESTILOS ======= */

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
