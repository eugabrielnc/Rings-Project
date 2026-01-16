import { useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";
import { getAuthData } from "../utils/dadosuser";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroPrecoMin, setFiltroPrecoMin] = useState("");
  const [filtroPrecoMax, setFiltroPrecoMax] = useState("");
  const [ordenacao, setOrdenacao] = useState("");

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

  // Filtrar produtos
  const produtosFiltrados = produtos.filter(p => {
    const nomeMatch = p.name?.toLowerCase().includes(filtroNome.toLowerCase());
    const tipoMatch = p.type?.toLowerCase().includes(filtroTipo.toLowerCase());
    
    const precoMinMatch = filtroPrecoMin === "" || p.price >= Number(filtroPrecoMin);
    const precoMaxMatch = filtroPrecoMax === "" || p.price <= Number(filtroPrecoMax);
    
    return nomeMatch && tipoMatch && precoMinMatch && precoMaxMatch;
  });

  // Ordenar produtos
  const produtosOrdenados = [...produtosFiltrados].sort((a, b) => {
    if (ordenacao === "mais-vendas") {
      return b.sales - a.sales; // Decrescente
    } else if (ordenacao === "menos-vendas") {
      return a.sales - b.sales; // Crescente
    }
    return 0; // Sem ordenação
  });

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
            placeholder="Buscar por nome..."
            value={filtroNome}
            onChange={(e) => setFiltroNome(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#666" }}>
            Tipo
          </label>
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            style={{
              ...inputStyle,
              cursor: "pointer",
              appearance: "auto"
            }}
          >
            <option value="">Todos os tipos</option>
            <option value="Alianças">Alianças</option>
            <option value="Anéis">Anéis</option>
            <option value="Brincos">Brincos</option>
            <option value="Pingentes">Pingentes</option>
          </select>
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#666" }}>
            Ordenar por
          </label>
          <select
            value={ordenacao}
            onChange={(e) => setOrdenacao(e.target.value)}
            style={{
              ...inputStyle,
              cursor: "pointer",
              appearance: "auto"
            }}
          >
            <option value="">Padrão</option>
            <option value="mais-vendas">Mais Vendas</option>
            <option value="menos-vendas">Menos Vendas</option>
          </select>
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#666" }}>
            Preço Mínimo
          </label>
          <input
            type="number"
            placeholder="R$ 0,00"
            value={filtroPrecoMin}
            onChange={(e) => setFiltroPrecoMin(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#666" }}>
            Preço Máximo
          </label>
          <input
            type="number"
            placeholder="R$ 9999,99"
            value={filtroPrecoMax}
            onChange={(e) => setFiltroPrecoMax(e.target.value)}
            style={inputStyle}
          />
        </div>

        {(filtroNome || filtroTipo || filtroPrecoMin || filtroPrecoMax || ordenacao) && (
          <button
            onClick={() => {
              setFiltroNome("");
              setFiltroTipo("");
              setFiltroPrecoMin("");
              setFiltroPrecoMax("");
              setOrdenacao("");
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
        /* ===== DESKTOP: TABELA ===== */
        <div style={box}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F9F5EE" }}>
                <th style={th}>ID</th>
                <th style={th}>Produto</th>
                <th style={th}>Preço</th>
                <th style={th}>Vendas</th>
                <th style={th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtosOrdenados.map(p => (
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
        produtosOrdenados.map(p => (
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

const inputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  fontSize: "14px",
  outline: "none",
};
