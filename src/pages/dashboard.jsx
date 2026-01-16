import BarChart from "../componentes/Grafico.jsx";
import {useEffect, useState} from 'react'
import { getAuthData } from "../utils/dadosuser";



export default function Dashboard() {
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [analyticsByYear, setAnalyticsByYear] = useState({});
  const [data, setData] = useState({})
  const url = import.meta.env.VITE_API_URL;
  const [carts, setCarts] = useState([])
  const authData = getAuthData();
 
  const [cartsOnTable, setCartsOnTable] = useState([])
  const [cartsUnderTwo, setCartsUnder] = useState([])
  const [cartsTwelve, setCartsTwelve] = useState([])
  const [cartsTwenty, setCartsTwenty] = useState([])
  const [cartsMore, setCartsMore] = useState([])

  const [NomeTabela, setNomeTabela] = useState({})

function FilterCartsByHours(carts) {
  const now = new Date();

  const underTwo = [];
  const betweenTwoAndTwelve = [];
  const betweenTwelveAndTwentyFour = [];
  const moreThanTwentyFour = [];

  carts.forEach(cart => {
    if (!cart.data) return;

    const cartDate = new Date(cart.data);
    const diffMs = now - cartDate;
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours < 2) {
      underTwo.push(cart);
    } else if (diffHours >= 2 && diffHours < 12) {
      betweenTwoAndTwelve.push(cart);
    } else if (diffHours >= 12 && diffHours < 24) {
      betweenTwelveAndTwentyFour.push(cart);
    } else {
      moreThanTwentyFour.push(cart);
    }
  });

  console.log(underTwo, betweenTwoAndTwelve, betweenTwelveAndTwentyFour, moreThanTwentyFour)
  setCartsUnder(underTwo);
  setCartsTwelve(betweenTwoAndTwelve);
  setCartsTwenty(betweenTwelveAndTwentyFour);
  setCartsMore(moreThanTwentyFour);
}

useEffect(() => {
console.log(cartsOnTable)

}, [cartsOnTable])

  useEffect(() => { 
    
      async function fetchData() {
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
          .filter(sale => sale.status == "cart")
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

        setCarts(completos);
        FilterCartsByHours(completos)
      } catch (err) {
        console.error(err);
        setCarts([]);
      }
    }
    fetchData();


  fetch(`${url}/analitycs`)
  .then(response => response.json())
  .then((data) => {
      const monthsOrder = [
        "janeiro",
        "fevereiro",
        "março",
        "abril",
        "maio",
        "junho",
        "julho",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "dezembro",
      ];

      const monthIndex = Object.fromEntries(
        monthsOrder.map((month, index) => [month, index])
      );

      const result = {};

      data.forEach((item) => {
        const year = item.year;

        if (!result[year]) {
          result[year] = {
            new_users: Array(12).fill(0),
            revenue: Array(12).fill(0),
            orders_count: Array(12).fill(0),
          };
        }

        const index = monthIndex[item.mounth.toLowerCase()];

        if (index !== undefined) {
          result[year].new_users[index] = item.new_users;
          result[year].revenue[index] = item.revenue;
          result[year].orders_count[index] = item.orders_count;
        }
      });

      setAnalyticsByYear(result);
      console.log(result)  
  });


  }, [])


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


  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "25px", fontSize: "26px", color: "#C9A86A" }}>
        Dashboard Administrativa
      </h2>

      <BarChart nome={"TES"} dict={analyticsByYear} />

    <div className={"container-btn-estatisticas"}>
       <h4> Estatisticas </h4> 
      <button  onClick={() => {setNomeTabela("Vendas"); setCartsOnTable(cartsUnderTwo)} }
        className={NomeTabela === "Vendas" ? "btn-actived" : "btn"   }  >
        Menos de 2 horas

      </button>
 
      <button onClick={() => {setNomeTabela("Faturamento"); setCartsOnTable(cartsTwelve)} } 
    className={NomeTabela === "Faturamento" ? "btn-actived" : "btn"   } >
         Faturamento 
      </button>
 
          <button onClick={() => {setNomeTabela("Novos usuários"); setCartsOnTable(cartsMore)} } 
         className={NomeTabela === "Novos usuários" ? "btn-actived" : "btn"   } >
 
          Novos Usuários
         </button>
       </div>


      <h2 style={{ marginBottom: "25px", fontSize: "26px", color: "#C9A86A" }}>
        Compras paradas no carrinho nas ultimas horas 
      </h2>


      {/* CARDS RESUMO */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        
        <div style={{
          flex: 1,
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}>
          <h3 style={{ color: "#444" }}>12 horas</h3>

    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>Nome do usuário</th>
          <th>Nome do produto</th>
          <th>Quantidade</th>
          <th>Adicionado em</th>
        </tr>
      </thead>

      <tbody>
          {cartsOnTable.map(cart => (
          <tr key={cart.id}>
            <td>
              {cart?.userName}
            </td>

            <td>
              {cart?.name }
            </td>

            <td>{cart.amount}</td>

            <td>
              {formatDate(cart?.data)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>



    </div>
      </div>

      {/* GRAFICO FAKE */}
      <div style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        marginBottom: "30px"
      }}>
        <h3 style={{ marginBottom: "10px" }}>Gráfico de Atividade (fake)</h3>

        <div style={{
          height: "200px",
          background: "linear-gradient(to right, #C9A86A33, #ffffff)",
          borderRadius: "10px",
        }} />
      </div>

      {/* LISTAS */}
      <div style={{ display: "flex", gap: "20px" }}>
        
        {/* Últimos usuários */}
        <div style={{
          flex: 1,
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
        }}>
          <h3>Últimos Usuários</h3>
          <ul style={{ marginTop: "15px", paddingLeft: "18px" }}>
            <li>Maria Silva</li>
            <li>João Pereira</li>
            <li>Ana Rodrigues</li>
            <li>Carlos Eduardo</li>
          </ul>
        </div>

        {/* Últimos produtos */}
        <div style={{
          flex: 1,
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
        }}>
          <h3>Últimos Produtos</h3>
          <ul style={{ marginTop: "15px", paddingLeft: "18px" }}>
            <li>Produto A</li>
            <li>Produto B</li>
            <li>Produto C</li>
            <li>Produto D</li>
          </ul>
        </div>

      </div>

    </div>
  );
}
