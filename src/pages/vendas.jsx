import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/Css/table-sells.css";    
import { getAuthData } from "../utils/dadosuser";
export default function Vendas() {
  const [produtos, setProdutos] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const url = import.meta.env.VITE_API_URL;
  const authData = getAuthData();
  const [inputCode, setInputCode] = useState(false)
  const [code, setCode] = useState("");
  const [saleID, setSaleID] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({client:"", product:"", price:"", status:""})
  const [filteredSales, setFilteredSales] = useState([])
  const statusColors = {
    "aguardando pagamento": "#FACC15",
    "pagamento confirmado": "#86EFAC",
    "em produção": "#BFDBFE",
    "a caminho": "#C4B5FD",
    "entregue": "#22C55E",
  };

  /* RESPONSIVO */
  useEffect(() => {
    const media = window.matchMedia("(max-width: 1024px)");
    const handler = () => setIsMobile(media.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const btnEdit = {
    background: "#C9A86A",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    marginRight: "10px",
    borderRadius: "6px",
    cursor: "pointer",
  };


  useEffect(() => {
    async function carregarDados() {
      try {
        const resSales = await fetch(`${url}/sales/`);
        const resProducts = await fetch(`${url}/products`);

        const resUsers = await fetch(`${url}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            authorization: authData?.token, // ou authData.token
          }),
        });

        const salesRaw = await resSales.json();
        const productsRaw = await resProducts.json();
        const usersRaw = await resUsers.json();

        const salesArray = Array.isArray(salesRaw) ? salesRaw : salesRaw.data || [];
        const productsArray = Array.isArray(productsRaw) ? productsRaw : productsRaw.data || [];
        const usersArray = Array.isArray(usersRaw) ? usersRaw : usersRaw.data || [];

        // 🔹 Map de produtos
        const productsMap = new Map(
          productsArray.map(p => [String(p.id), p])
        );

        // 🔹 Map de usuários
        const usersMap = new Map(
          usersArray.map(u => [String(u.id), u])
        );

        const completos = salesArray
          .filter(sale => sale.status !== "cart")
          .map(sale => {
            const produto = productsMap.get(String(sale.product_id));
            const user = usersMap.get(String(sale.user_id));

            return {
              key: sale.id,
              id: sale.id,
              userName: user?.name || "Usuário não encontrado",
              sizes: sale.sizes.split("/")[0],
              gravacoes: sale.sizes.split("/")[1],
              name: produto?.name || "Produto não encontrado",
              price: sale.value || 0,
              amount: sale.amount,
              code: sale.code,
              user_cep: sale.user_cep,
              data: sale.created_at,
              address: `${sale.state}, ${sale.city}, ${sale.neighboor}, ${sale.street}`,
              complement: sale.complement,
              status: sale.status,
            };
          });

        setProdutos(completos);
        setFilteredSales(completos);
      } catch (err) {
        console.error(err);
        setProdutos([]);
        setFilteredSales([]);
      }
    }

    carregarDados();
  }, []);



function formatDate(dateString) {
  const date = new Date(dateString);

  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}


useEffect(() => {
  let result = produtos;

  // 🔍 Cliente
  if (filters.client.trim() !== "") {
    result = result.filter((sale) =>
      sale.userName
        .toLowerCase()
        .includes(filters.client.toLowerCase())
    );
  }

  // 📦 Produto
  if (filters.product.trim() !== "") {
    result = result.filter((sale) =>
      sale.name
        .toLowerCase()
        .includes(filters.product.toLowerCase())
    );
  }

  // 💰 Preço
  if (filters.price !== "") {
    result = result.filter(
      (sale) => Number(sale.price) === Number(filters.price)
    );
  }

  // 🚚 Status
  if (filters.status !== "") {
    result = result.filter(
      (sale) => sale.status === filters.status
    );
  }

  setFilteredSales(result);
}, [filters, produtos]);


  return (
    <div style={{ padding: isMobile ? "10px" : "20px" }}>

  <div className="filters-container">
      <h2 className="filters-title">Filtros de Vendas</h2>

      <div className="filters-grid">
        <input
          type="text"
          placeholder="Nome do cliente"
          value={filters.client}
          onChange={(e) =>
            setFilters({ ...filters, client: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Nome do produto"
          value={filters.product}
          onChange={(e) =>
            setFilters({ ...filters, product: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Preço da venda"
          value={filters.price}
          onChange={(e) =>
            setFilters({ ...filters, price: e.target.value })
          }
        />

        <select
          value={filters.status}
          onChange={(e) =>
            setFilters({ ...filters, status: e.target.value })
          }
        >
          <option value="">Status da venda</option>
          <option value="aguardando pagamento">Aguardando pagamento</option>
          <option value="pagamento confirmado">Pagamento confirmado</option>
          <option value="em produção">Em produção</option>
          <option value="a caminho">A caminho</option>
          <option value="entregue">Entregue</option>
        </select>
      </div>

      <button
        className="clear-filters"
        onClick={() =>
          setFilters({
            client: "",
            product: "",
            price: "",
            status: "",
          })
        }
      >
        Limpar filtros
      </button>
    </div>
      
      <h2 style={{ fontSize: isMobile ? "20px" : "26px", color: "#C9A86A" }}>
        Gerenciar Vendas
      </h2>
      

      <div style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      }}>


        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F9F5EE" }}>
              <th>Cliente</th>
              <th>Produto</th>
              <th>Preço</th>
              <th>medidas</th>
              <th>Gravações</th>
              <th>Status da venda</th>
              <th> Código de rastreio </th>
              <th>CEP cliente</th>
              <th>Endereço</th>
              <th>Complemento do endereço</th>
              <th>Pedido em</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((produto) => (
              <tr key={produto.key}>
                <td>{produto.userName}</td>
                <td>{produto.name}</td>
                <td>
                  {Number(produto.price).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td>{produto.sizes}</td>
                <td>{produto.gravacoes}</td>
                <td> <div style={{
                  backgroundColor: statusColors[produto.status] || "#E5E7EB",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  fontWeight: "500",
                  textAlign: "center",
                }} className={"status_venda"}>  {produto.status} </div></td>
                <td onClick={() => { setInputCode(true); setCode(produto.code); setSaleID(produto.key) }}>
                  {produto.code}
                </td>
                <td>{produto.user_cep}</td>
                <td>{produto.address}</td>
                <td>{produto.complement}</td>
                <td>{formatDate(produto.data)}</td>
                <td>
                  <Link to={`/admin/vendas/editar/${produto.id}`}>
                    <button style={btnEdit} >Editar </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
