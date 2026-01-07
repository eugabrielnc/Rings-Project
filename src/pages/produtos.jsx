import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuthData } from "../utils/dadosuser";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  const url = import.meta.env.VITE_API_URL;
  const authData = getAuthData();

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const handler = () => setIsMobile(media.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const resposta = await fetch(`${url}/products`);
        const data = await resposta.json();
        setProdutos(data);
      } catch (erro) {
        console.log("Erro ao carregar produtos:", erro);
      }
    }
    carregarProdutos();
  }, []);

  async function handleDelete(productId) {
    const confirmar = window.confirm("Tem certeza que deseja excluir este produto?");
    if (!confirmar) return;

    try {
      await fetch(`${url}/products/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: productId,
          authorization: authData.token,
        }),
      });

      setProdutos(prev => prev.filter(p => p.id !== productId));
    } catch {
      alert("Erro ao excluir produto");
    }
  }

  return (
    <div style={{ padding: isMobile ? "10px" : "20px" }}>
      
      {/* HEADER */}
      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: "12px",
        justifyContent: "space-between",
        marginBottom: "25px"
      }}>
        <h2 style={{ fontSize: isMobile ? "20px" : "26px", color: "#C9A86A" }}>
          Gerenciar Produtos
        </h2>

        <Link to="/admin/produtoforms">
          <button style={{
            background: "#C9A86A",
            color: "#fff",
            padding: "10px 18px",
            borderRadius: "8px",
            border: "none",
            fontWeight: "600",
            width: isMobile ? "100%" : "auto"
          }}>
            + Adicionar Produto
          </button>
        </Link>
      </div>

      {/* LISTAGEM */}
      {!isMobile ? (
        /* ===== DESKTOP: TABELA ===== */
        <div style={box}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F9F5EE" }}>
                <th style={th}>ID</th>
                <th style={th}>Produto</th>
                <th style={th}>Preço</th>
                <th style={th}>Estoque</th>
                <th style={th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map(p => (
                <tr key={p.id}>
                  <td style={td}>{p.id}</td>
                  <td style={td}>{p.name}</td>
                  <td style={td}>
                    {p.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL"
                    })}
                  </td>
                  <td style={td}>{p.sales}</td>
                  <td style={td}>
                    <Link to={`/admin/produtos/editar/${p.id}`}>
                      <button style={btnEdit}>Editar</button>
                    </Link>
                    <button style={btnDel} onClick={() => handleDelete(p.id)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* ===== MOBILE: CARDS ===== */
        produtos.map(p => (
          <div key={p.id} style={card}>
            <strong>{p.name}</strong>
            <span>ID: {p.id}</span>
            <span>
              {p.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
              })}
            </span>
            <span>Estoque: {p.sales}</span>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <Link to={`/admin/produtos/editar/${p.id}`}>
                <button style={btnEdit}>Editar</button>
              </Link>
              <button style={btnDel} onClick={() => handleDelete(p.id)}>
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
  textAlign: "left",
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