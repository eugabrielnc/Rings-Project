import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/Css/table-sells.css";    
import { getAuthData } from "../utils/dadosuser";
import Modal from "../componentes/Modal.jsx"


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
  const [open, setOpen] = useState(false)
  const statusColors = {
    "aguardando pagamento": "#FACC15",
    "pagamento confirmado": "#86EFAC",
    "em produção": "#BFDBFE",
    "a caminho": "#C4B5FD",
    "entregue": "#22C55E",
  };
  const [orderInfos, setOrderInfos] = useState([])

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
              orderInfos: JSON.parse(sale.order_infos),
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
              state: sale.state,
              city: sale.city,
              neighboor: sale.neighboor,
              street:sale.street,
              number:sale.number,
              complement: sale.complement,
              cpf:sale?.cpf,
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


  async function getProductsInfo(ids) {
  const requests = ids.map(async (id) => {
    try {
      const response = await fetch(`${url}/products/${id}`)
      if (!response.ok) throw new Error("Erro na requisição")

      const data = await response.json()
      return {
        name: data[0].name,
        value: data[0].price
      }
    } catch (err) {
      console.error(`Erro no produto ${id}`, err)
      return null
    }
  })

  const results = (await Promise.all(requests)).filter(Boolean)

  return {
    names: results.map(item => item.name),
    value: results.map(item => item.value)
  }
}



  useEffect(() => {
  async function loadProducts() {
    if (!orderInfos?.orderInfos?.products_id?.length) return
    const productsInfo = await getProductsInfo(orderInfos?.orderInfos?.products_id)
    setOrderInfos(prev => ({
      ...prev,
      names: productsInfo.names,
      value: productsInfo.value
    }))
  }

  loadProducts()

}, [open])


   return (
    <div style={{ padding: isMobile ? "10px" : "20px" }}>

  <Modal  className="Modal" isOpen={open} onClose={() => setOpen(false)}>
      
     <div className="modal-grid">
        {/* COLUNA ESQUERDA – PRODUTOS */}
    <div className="modal-products">
    <h2>Produtos pedidos</h2>
    {(orderInfos?.["orderInfos"]?.["products_id"] || []).map( (order, index) =>{ 
      console.log(orderInfos)
      return(
      <div className="container-modal-content">
        <section className="container-principal-content">
          <img src={`${url}/products/${order}/image/1`} width="100" height="100"  />
          <p>{orderInfos?.["names"]?.[index]} </p>  
          <p>{orderInfos?.["value"]?.[index]} </p>  
          <p>{orderInfos?.["products_amount"]?.[index]} </p>  
        </section>

        <div className="container-secundary-content" >
          
          <div className="container-inside" >
            <div className="client-field">
              <h6>Tamanhos</h6>
            </div>
         
            <div className="client-field">
              <label>Masc</label>
              <p>{(orderInfos?.orderInfos?.["sizes"]?.[index]).split("|")[0]}</p>
            </div>

            <div className="client-field">
            <label>Fem</label>
            <p>{(orderInfos?.orderInfos?.["sizes"]?.[index]).split("|")[1]}</p>
            </div>
            
            <div className="client-field">
              <label>Solo</label>
              <p>{(orderInfos?.orderInfos?.["sizes"]?.[index]).split("|")[2]}</p>
            </div>
        </div>
  
      <div className="client-field">
        <div className="container-inside" >
         <h6>Gravações</h6>

           <label>Masc</label>
           <p>{(orderInfos?.orderInfos?.["gravations"]?.[index]).split("|")[0]}</p>
           <label>Femi</label>
           <p>{(orderInfos?.orderInfos?.["gravations"]?.[index]).split("|")[1]}</p>

         </div>

       </div>
   
        <div className="container-inside" >
          <div className="client-field">
            <h6>Pedra</h6>
            <p>{orderInfos?.orderInfos?.["stone"]?.[index]}</p>
          </div>
        </div>

       <div className="container-inside" >
         <div className="client-field">
            <h6>Quantidade</h6>
            <p>{orderInfos?.orderInfos?.["products_amount"]?.[index]}</p>
         </div>
       </div>
    </div>
      </div>

      )} )}
      </div>
    {/* COLUNA DIREITA – CLIENTE */}
    <div className="modal-client">
      <div className="client-field">
        <label>Nome do cliente</label>
        <p>{orderInfos?.userName}</p>
      </div>

     <div className="client-field">
        <label>CPF do cliente</label>
        <p>{orderInfos?.cpf}</p>
      </div>


      <div className="client-field">
        <label>Estado</label>
        <p>{orderInfos?.state}</p>
      </div>

      <div className="client-field">
        <label>Cidade</label>
        <p>{orderInfos?.city}</p>
      </div>

      <div className="client-field">
        <label>Rua</label>
        <p>{orderInfos?.street}</p>
      </div>

      <div className="client-field">
        <label>Complemento</label>
        <p>{orderInfos?.complement}</p>
      </div>

      <div className="client-field">
        <label>Número da casa</label>
        <p>{orderInfos?.number}</p>
      </div>
      
      <div className="client-field">
        <label>CEP</label>
        <p>{orderInfos?.user_cep}</p>
      </div>



    </div>

     </div>

     <button className="clear-filters" onClick={() => setOpen(false)} >
      Fechar
     </button>

  </Modal>



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
      <td data-label="Cliente">{produto.userName}</td>
      <td data-label="Preço">
        {Number(produto.price).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </td>
      <td data-label="Medidas">{produto.sizes}</td>
      <td data-label="Gravações">{produto.gravacoes}</td>

      <td data-label="Status">
        <div
          className="status_venda"
          style={{
            backgroundColor: statusColors[produto.status] || "#E5E7EB",
            padding: "6px 10px",
            borderRadius: "6px",
            textAlign: "center",
          }}
        >
          {produto.status}
        </div>
      </td>

      <td data-label="Código">
        {produto.code}
      </td>

      <td data-label="CEP">{produto.user_cep}</td>
      <td data-label="Endereço">{produto.address}</td>
      <td data-label="Complemento">{produto.complement}</td>
      <td data-label="Pedido em">{formatDate(produto.data)}</td>

      <td data-label="Ações">
        <Link to={`/admin/vendas/editar/${produto.id}`}>
          <button style={btnEdit}>Editar</button>
        </Link>
        <button style={btnEdit} onClick={() => {setOrderInfos(produto); setOpen(true)}}>Ver Pedido</button>
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
