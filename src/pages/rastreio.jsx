import { useEffect, useState } from "react";
import { getAuthData } from "../utils/dadosuser";

export default function MeusPedidos() {
  const authData = getAuthData();
  const id = authData?.id;
  const url = import.meta.env.VITE_API_URL;

  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      try {
        const [salesRes, productsRes] = await Promise.all([
          fetch(`${url}/sales/${id}`),
          fetch(`${url}/products`)
        ]);

        const salesData = await salesRes.json();
        const productsData = await productsRes.json();

        setSales(Array.isArray(salesData) ? salesData : [salesData]);
        setProducts(productsData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
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

  // 🔥 Junta sale + product
  const salesWithProduct = sales
    .filter((sale) => sale.status !== "cart") // 👈 remove cart
    .map((sale) => {
      const product = products.find(
        (product) => product.id === sale.product_id
      );

      if (!product) return null;

      return {
        ...sale,
        product
      };
    })
    .filter(Boolean);

  return (
    <section className="perfil-wrapper">
      <header className="perfil-header">
        <h1>Meus Pedidos</h1>
        <span className="perfil-subtitle">
          Acompanhe o status dos seus pedidos
        </span>
      </header>

      <div className="perfil-card">
        <div className="perfil-grid">
          {loading && <p>Carregando pedidos...</p>}

          {!loading && salesWithProduct.length === 0 && (
            <p>Nenhum pedido encontrado.</p>
          )}

          {!loading &&
            salesWithProduct.map((sale) => (
              <div className="perfil-item" key={sale.id}>
                <span className="perfil-label">Pedido</span>
                <p className="perfil-value">#{sale.id}</p>
                <span className="perfil-label">Código</span>
                <a
                  href={`https://rastreamento.correios.com.br/app/index.php#`}
                  className="perfil-value perfil-link"
                >
                  {sale.code}
                </a>

                <span className="perfil-label">Produto</span>
                <p className="perfil-value">{sale.product.name}</p>

                <img
                  src={`${url}/products/${sale.product.id}/image`}
                  alt={sale.product.name}
                  className="perfil-product-image"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />

                <span className="perfil-label">Preço</span>
                <p className="perfil-value">
                  R$ {Number(sale.product.price).toFixed(2)}
                </p>

                <span className="perfil-label">Data</span>
                <p className="perfil-value">
                  {sale.created_at
                    ? new Date(sale.created_at).toLocaleDateString("pt-BR")
                    : "-"}
                </p>

                <span className="perfil-label">Status</span>
                <p
                  className="perfil-value"
                  style={{ color: getStatusColor(sale.status) }}
                >
                  {getStatusLabel(sale.status)}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
