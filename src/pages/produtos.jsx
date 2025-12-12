import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
const url = import.meta.env.VITE_API_URL;
  useEffect(() => {
    async function carregarProdutos() {
      try {
        const resposta = await fetch(`${url}/products`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await resposta.json();
        setProdutos(data);

      } catch (erro) {
        console.log("Erro ao carregar produtos:", erro);
      }
    }

    carregarProdutos();
  }, []);

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

        <Link to="/admin/produtoforms">
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
        </Link>

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
                <td style={tdStyle}>{produto.name}</td>
                <td style={tdStyle}>
                  {produto.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  })}
                </td>
                <td style={tdStyle}>{produto.sales}</td>
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
};

const btnDel = {
  background: "#d9534f",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
};
