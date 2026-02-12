import { useEffect, useState } from "react";
import { getAuthData } from "../utils/dadosuser";

export default function MeusPedidos() {
  const authData = getAuthData();
  const id = authData?.id;
  const url = import.meta.env.VITE_API_URL;

  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
  if (!id) {
    console.log("ID não encontrado no authData");
    return;
  }

  async function fetchData() {
    try {
      
      

      const salesRes = await fetch(`${url}/sales/${id}`);
      console.log("📡 Status resposta sales:", salesRes.status);

      const salesData = await salesRes.json();
      console.log("📦 Dados recebidos de /sales:", salesData);

      const productsRes = await fetch(`${url}/products`);
      

      const productsData = await productsRes.json();
      
      setSales(Array.isArray(salesData) ? salesData : [salesData]);
      setProducts(productsData);
    } catch (error) {
      console.error("❌ Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  }

  fetchData();
}, [id, url]);

  function getStatusColor(status) {
    switch (status) {
      case "processing":
        return "#b89634";
      case "delivered":
        return "#4caf50";
      case "shipped":
        return "#f57c00";
      default:
        return "#999";
    }
  }

  function getStatusLabel(status) {
    switch (status) {
      case "processing":
        return "Em processamento";
      case "delivered":
        return "Entregue";
      case "shipped":
        return "Enviado";
      default:
        return status;
    }
  }

  const salesWithProduct = sales
  .filter((sale) => sale.status !== "cart")
  .map((sale) => {
    if (!sale.order_infos) return null;

    let parsed;

    try {
      parsed = JSON.parse(sale.order_infos);
    } catch (error) {
      console.error("Erro ao converter order_infos:", sale.order_infos);
      return null;
    }

    const productId = parsed.products_id?.[0]; // pega o primeiro produto
    const productAmount = parsed.products_amount?.[0];

    const product = products.find(
      (product) => product.id === productId
    );

    if (!product) return null;

    return {
      ...sale,
      product,
      amount: productAmount
    };
  })
  .filter(Boolean);


  return (
    <section style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ marginBottom: "25px" }}>
        <h1>Meus Pedidos</h1>
        <span style={{ color: "#777", fontSize: "14px" }}>
          Acompanhe o status dos seus pedidos
        </span>
      </header>

      {loading && <p>Carregando pedidos...</p>}
      {!loading && salesWithProduct.length === 0 && (
        <p>Nenhum pedido encontrado.</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {salesWithProduct.map((sale) => (
          <div
            key={sale.id}
            style={{
              background: "#fff",
              borderRadius: "14px",
              padding: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <strong>Pedido #{sale.id}</strong>

            <span style={{ fontSize: "13px", color: "#777" }}>
              Código de rastreio
            </span>
            <a
              href="https://rastreamento.correios.com.br/app/index.php#"
              style={{ color: "#b89634", wordBreak: "break-word" }}
            >
              {sale.code || "-"}
            </a>

            <p>{sale.product.name}</p>

            <img
              src={`${url}/products/${sale.product.id}/image/1`}
              alt={sale.product.name}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
              onError={(e) => (e.target.style.display = "none")}
            />

            <p>R$ {Number(sale.product.price).toFixed(2)}</p>

            <p style={{ color: getStatusColor(sale.status), fontWeight: 600 }}>
              {getStatusLabel(sale.status)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}