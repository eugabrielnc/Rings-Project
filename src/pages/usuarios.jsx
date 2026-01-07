import { useEffect, useState } from "react";
import { getAuthData } from "../utils/dadosuser";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const url = import.meta.env.VITE_API_URL;

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
          }))
        )
      )
      .catch(console.error);
  }, []);

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
                <th style={th}>Cargo</th>
                <th style={th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(u => (
                <tr key={u.id}>
                  <td style={td}>{u.id}</td>
                  <td style={td}>{u.nome}</td>
                  <td style={td}>{u.email}</td>
                  <td style={td}>{u.cargo}</td>
                  <td style={td}>
                    <button style={btnEdit}>Editar</button>
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
        usuarios.map(u => (
          <div key={u.id} style={card}>
            <strong>{u.nome}</strong>
            <span>ID: {u.id}</span>
            <span>{u.email}</span>
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



const box = {
  background: "#fff",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
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