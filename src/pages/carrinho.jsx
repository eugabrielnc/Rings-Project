import { useEffect, useState } from "react";

export default function Carrinho() {
  const [produtos, setProdutos] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const url = import.meta.env.VITE_API_URL;

  /* RESPONSIVO */
  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
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

        const salesArray = Array.isArray(salesRaw)
          ? salesRaw
          : salesRaw.data || [];

        const productsArray = Array.isArray(productsRaw)
          ? productsRaw
          : productsRaw.data || [];

        const productsMap = new Map(
          productsArray.map(p => [String(p.id), p])
        );

        const carrinho = salesArray
          .filter(sale => sale.status === "cart")
          .map((sale, index) => {
            const produto = productsMap.get(String(sale.product_id));
            return {
              key: sale.id || `${sale.product_id}-${index}`,
              id: sale.product_id,
              name: produto?.name || "Produto não encontrado",
              price: produto?.price || 0,
            };
          });

        setProdutos(carrinho);
      } catch {
        setProdutos([]);
      }
    }

    carregarDados();
  }, [url]);

  return (
    <div style={{ padding: isMobile ? "10px" : "20px" }}>
      <h2 style={{ fontSize: isMobile ? "20px" : "26px", color: "#C9A86A" }}>
        Carrinho
      </h2>

      {!isMobile ? (
        /* ===== DESKTOP ===== */
        <div style={box}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F9F5EE" }}>
                <th style={th}>ID</th>
                <th style={th}>Produto</th>
                <th style={th}>Preço</th>
                <th style={th}>Status</th>
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
                  <td style={td}>🛒 No carrinho</td>
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
            <span>🛒 No carrinho</span>
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