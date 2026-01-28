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

function groupAnalyticsByDayAndHour(data){

  let result = {} 


  data.forEach(item => {
    const month = item["month"]
    const year = String(item["year"])
    const day = item["day"]
    const users_online = item["users_online"]
    const orders_count = item["orders_count"]
    const revenue = item["revenue"]
    const new_users = item["new_users"]
    const hour = item["time"] 

    if(!result[year]){
       result[year] = {[month]:{"geral":[[day], [users_online],[orders_count], [revenue],[new_users]] ,
         [day]:[[hour],[users_online],[orders_count], [revenue],[new_users]]  }} 
      
    }
    else if(!result[year][month]){
        console.log("iii")  

    }
    else if(!result[year][month][day]){
      console.log("teste")
      result[year][month]["geral"][0].push(day)   
     result[year][month]["geral"][1].push(users_online)   
     result[year][month]["geral"][2].push(orders_count)   
     result[year][month]["geral"][3].push(revenue)   
     result[year][month]["geral"][4].push(new_users)   
    
     result[year][month] = {...result[year][month], [day]:[[hour],[users_online],[orders_count], [revenue],[new_users]]}

    }
    else{
     result[year][month]["geral"][0].push(day)   
     result[year][month]["geral"][1].push(users_online)   
     result[year][month]["geral"][2].push(orders_count)   
     result[year][month]["geral"][3].push(revenue)   
     result[year][month]["geral"][4].push(new_users)   

     result[year][month][day][0].push(hour)
     result[year][month][day][1].push(users_online)
    
    }
    console.log(result)
  });
  
  return result


}




function groupAnalyticsByMonthAndDay(data)  {
  let result = {}    

  data.forEach(item => {

    const month = item["month"]
    const year = String(item["year"])
    if(!result[year]){
      
      result[year] = {[month]:{"users_online":item["users_online"],
        "orders_count":item["orders_count"], "revenue":item["revenue"], "new_users":item["new_users"]}}           

    }

    else if(!result[year][month]){
 
      result[year] = {[month]:{"users_online":item["users_online"],
        "orders_count":item["orders_count"], "revenue":item["revenue"], "new_users":item["new_users"]}}           

    }

    else{

     result[year][month]["users_online"] += item["users_online"]
     result[year][month]["orders_count"] += item["orders_count"]
     result[year][month]["revenue"] += item["revenue"]
     result[year][month]["new_users"] += item["new_users"]
    }


  
 });

  return result;
}

  useEffect(() => { 
   
    async function fetchDataActivity(){
    
      try{
       const resAnalitycs = await fetch(`${url}/analitycs/users-activity`)
        
       const analitycsRaw = await resAnalitycs.json()
       const group = groupAnalyticsByMonthAndDay(analitycsRaw)
       const secondGroup = groupAnalyticsByDayAndHour(analitycsRaw)
        setAnalyticsByYear(group) 
        
        setAnalyticsUserActivity(secondGroup)


      }
      catch (err){console.error(err)}
    }

    fetchDataActivity()


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

      <BarChart dict={analyticsByYear}/>

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
