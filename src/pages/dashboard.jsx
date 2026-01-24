import BarChart from "../componentes/Grafico.jsx";
import {useEffect, useState} from 'react'
import { getAuthData } from "../utils/dadosuser";
import LineChart from "../componentes/LineChart.jsx"


export default function Dashboard() {
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [analyticsByYear, setAnalyticsByYear] = useState({});
  const [data, setData] = useState({})
  const url = import.meta.env.VITE_API_URL;
  const [carts, setCarts] = useState([])
  const authData = getAuthData();

  const [analyticsUserActivity, setAnalyticsUserActivity] = useState([])

function groupAnalyticsByMonthAndDay(data)  {
  const result = {};
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


  data.forEach(item => {
    const date = new Date(item.datetime);
    const month = date.getMonth()
    const monthItem = monthsOrder[month] 
    console.log(month)


    const dayLabel = date.toLocaleDateString("pt-BR", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
    }).replace(".", "").replace(",", "-");

    const hour = String(date.getHours()).padStart(2, "0") + ":00";
    
    if (!result[monthItem]){
      result[monthItem] = {}
    }

    if (!result[monthItem][dayLabel]) {
      result[monthItem][dayLabel] = [[], [], [], []];
    }

    result[monthItem][dayLabel][0].push(hour);              // horas
    result[monthItem][dayLabel][1].push(item.users_online); // usuários online
    result[monthItem][dayLabel][2].push(item.sales_mades);  // vendas
    result[monthItem][dayLabel][3].push(item.new_users);  // vendas
  });

  return result;
}

  useEffect(() => { 
   
    async function fetchDataActivity(){
    
      try{
       const resAnalitycs = await fetch(`${url}/analitycs/users-activity`)
        
       const analitycsRaw = await resAnalitycs.json()
       
       const group = groupAnalyticsByMonthAndDay(analitycsRaw)
      
        setAnalyticsUserActivity(group) 
      }
      catch (err){console.error(err)}
    }

    fetchDataActivity()


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



      {/* CARDS RESUMO */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        
        <div style={{
          flex: 1,
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}>

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

        <LineChart data={analyticsUserActivity}/>
        <div style={{
          height: "200px",
          background: "linear-gradient(to right, #C9A86A33, #ffffff)",
          borderRadius: "10px",
        }} />
      </div>

        

    </div>
  );
}
