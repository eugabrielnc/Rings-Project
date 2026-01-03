import { useEffect, useState } from "react";
import { getAuthData } from "../utils/dadosuser";

export default function Vendas() {
  const [produtos, setProdutos] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const url = import.meta.env.VITE_API_URL;
  const authData = getAuthData();

  const [inputCode, setInputCode] = useState(false);
  const [code, setCode] = useState("");
  const [saleID, setSaleID] = useState("");

  /* RESPONSIVO */
  useEffect(() => {
    const media = window.matchMedia("(max-width: 1024px)");
    const handler = () => setIsMobile(media.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    async function carregarDados() {
      try {
        const resSales = await fetch(`${url}/sales/`);
        const resProducts = await fetch(`${url}/products`);

        const salesRaw = await resSales.json();
        const productsRaw = await resProducts.json();

        const salesArray = Array.isArray(salesRaw) ? salesRaw : salesRaw.data || [];
        const productsArray = Array.isArray(productsRaw) ? productsRaw : productsRaw.data || [];

        const productsMap = new Map(
          productsArray.map(p => [String(p.id), p])
        );

        const completos = salesArray
          .filter(sale => sale.status !== "cart")
          .map(sale => {
            const produto = productsMap.get(String(sale.product_id));
            return {
              key: sale.id,
              id: sale.product_id,
              name: produto?.name || "Produto não encontrado",
              price: produto?.price || 0,
              code: sale.code,
              user_cep: sale.user_cep,
              address: `${sale.state}, ${sale.city}, ${sale.neighboor}, ${sale.street}`,
              complement: sale.complement,
            };
          });

        setProdutos(completos);
      } catch {
        setProdutos([]);
      }
    }

    carregarDados();
  }, [url]);

  const atualizarCodigo = async () => {
    await fetch(`${url}/sales/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sale_id: saleID,
        authorization: authData.token,
        code,
      }),
    });

    setInputCode(false);
  };

  return (
    <div style={{ padding: isMobile ? "10px" : "20px" }}>
      <h2 style={{ fontSize: isMobile ? "20px" : "26px", color: "#C9A86A" }}>
        Gerenciar Vendas
      </h2>

      {/* EDITAR CÓDIGO */}
      {inputCode && (
        <div style={box}>
          <h3>Atualizar código de rastreio #{saleID}</h3>
          <input
            value={code}
            onChange={e => setCode(e.target.value)}
            style={{ padding: "8px", marginBottom: "10px", width: "100%" }}
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <button style={btnEdit} onClick={atualizarCodigo}>
              Confirmar
            </button>
            <button style={btnDel} onClick={() => setInputCode(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* LISTAGEM */}
      {!isMobile ? (
        /* ===== DESKTOP ===== */
        <div style={box}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F9F5EE" }}>
                <th style={th}>ID</th>
                <th style={th}>Produto</th>
                <th style={th}>Preço</th>
                <th style={th}>Código</th>
                <th style={th}>CEP</th>
                <th style={th}>Endereço</th>
                <th style={th}>Complemento</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map(p => (
                <tr key={p.key}>
                  <td style={td}>{p.id}</td>
                  <td style={td}>{p.name}</td>
                  <td style={td}>
                    {Number(p.price).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td
                    style={{ ...td, cursor: "pointer", color: "#C9A86A" }}
                    onClick={() => {
                      setInputCode(true);
                      setCode(p.code);
                      setSaleID(p.key);
                    }}
                  >
                    {p.code || "Adicionar"}
                  </td>
                  <td style={td}>{p.user_cep}</td>
                  <td style={td}>{p.address}</td>
                  <td style={td}>{p.complement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* ===== MOBILE ===== */
        produtos.map(p => (
          <div key={p.key} style={card}>
            <strong>{p.name}</strong>
            <span>ID: {p.id}</span>
            <span>
              {Number(p.price).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
            <span>CEP: {p.user_cep}</span>
            <span>{p.address}</span>
            {p.complement && <span>{p.complement}</span>}

            <button
              style={btnEdit}
              onClick={() => {
                setInputCode(true);
                setCode(p.code);
                setSaleID(p.key);
              }}
            >
              {p.code ? "Editar código" : "Adicionar código"}
            </button>
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
  marginBottom: "20px",
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
  padding: "8px 12px",
  borderRadius: "6px",
};

const btnDel = {
  background: "#d9534f",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: "6px",
};
