import { useEffect, useState } from "react";
import { getAuthData } from "../utils/dadosuser";
import { Link } from "react-router-dom";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const url = import.meta.env.VITE_API_URL;
  const [filtroNome, setFiltroNome] = useState("");

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1024px)");
    const handler = () => setIsMobile(media.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const authData = getAuthData();
    if (!authData?.token) return;

    fetch(`${url}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({ authorization: authData.token }),
    })
      .then(res => res.json())
      .then(data =>
        setUsuarios(
          data.map(u => ({
            id: u.id,
            nome: u.name,
            email: u.email,
            cargo: u.role,
            phone: u.phone,
          }))
        )
      )
      .catch(console.error);
  }, []);
  const produtosFiltrados = usuarios.filter(u => {
    const nomeMatch = u.nome?.toLowerCase().includes(filtroNome.toLowerCase());
    const emailMatch = u.email?.toLowerCase().includes(filtroNome.toLowerCase());
    const numeroMatch = u.phone?.toLowerCase().includes(filtroNome.toLowerCase());

    return nomeMatch || emailMatch || numeroMatch;
  });

  const handleDelete = async (id) => {
    const authData = getAuthData();
    if (!authData?.token) return;

    if (!window.confirm("Deseja excluir este usuário?")) return;

    await fetch(`${url}/users/user/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: id,
        authorization: authData.token,
      }),
    });

    setUsuarios(prev => prev.filter(u => u.id !== id));
  };

  return (
    <div style={{ padding: isMobile ? "10px" : "20px" }}>

      {/* HEADER */}
      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: "12px",
        justifyContent: "space-between",
        marginBottom: "25px",
      }}>
        <h2 style={{ fontSize: isMobile ? "20px" : "26px", color: "#C9A86A" }}>
          Gerenciar Usuários
        </h2>

        <a href="/cadastro">
          <button style={{
            background: "#C9A86A",
            color: "#fff",
            padding: "10px 18px",
            borderRadius: "8px",
            border: "none",
            fontWeight: "600",
            width: isMobile ? "100%" : "auto",
          }}>
            + Adicionar Usuário
          </button>
        </a>
      </div>
       {/* FILTROS */}
      <div style={{
        background: "#fff",
        padding: isMobile ? "15px" : "20px",
        borderRadius: "12px",
        marginBottom: "20px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(5, 1fr)",
        gap: "15px"
      }}>
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#666" }}>
            Nome
          </label>
          <input
            type="text"
            placeholder="Buscar por nome, email e telefone"
            value={filtroNome}
            onChange={(e) => setFiltroNome(e.target.value)}
            style={inputStyle}
          />
        </div>

        {(filtroNome) && (
          <button
            onClick={() => {
              setFiltroNome("");
            }}
            style={{
              background: "#FF0000",
              color: "#fff",
              border: "none",
              padding: "10px",
              borderRadius: "8px",
              cursor: "pointer",
              marginTop: isMobile ? "0" : "25px",
              fontWeight: "600"
            }}
          >
            Limpar Filtros
          </button>
        )}
      </div>

      {/* LISTAGEM */}
      {!isMobile ? (
        /* ===== DESKTOP ===== */
        <div style={box}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F9F5EE" }}>
                <th style={th}>ID</th>
                <th style={th}>Nome</th>
                <th style={th}>Email</th>
                <th style={th}>Telefone</th>
                <th style={th}>Cargo</th>
                <th style={th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtosFiltrados.map(u => (
                <tr key={u.id}>
                  <td style={td}>{u.id}</td>
                  <td style={td}>{u.nome}</td>
                  <td style={td}>{u.email}</td>
                  <td style={td}>{u.phone}</td>
                  <td style={td}>{u.cargo}</td>
                  <td style={td}>
                     <Link to={`/admin/usuarios/edituser/${u.id}`}>
                      <button style={btnEdit}>Editar</button>
                    </Link>
                    <button style={btnDel} onClick={() => handleDelete(u.id)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* ===== MOBILE ===== */
        produtosFiltrados.map(u => (
          <div key={u.id} style={card}>
            <strong>{u.nome}</strong>
            <span>ID: {u.id}</span>
            <span>{u.email}</span>
            <span>Telefone: {u.phone}</span>
            <span>Cargo: {u.cargo}</span>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button style={btnEdit}>Editar</button>
              <button style={btnDel} onClick={() => handleDelete(u.id)}>
                Excluir
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}


// ...existing code...

const box = {
  background: "#fff",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "14px",
  outline: "none",
  transition: "border-color 0.3s"
};

const th = {
  padding: "12px",
  borderBottom: "2px solid #eee",
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #eee",
};

const card = {
  background: "#fff",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "12px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const btnEdit = {
  background: "#C9A86A",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
};

const btnDel = {
  background: "#d9534f",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
};