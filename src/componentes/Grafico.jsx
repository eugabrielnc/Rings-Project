// src/components/BarChart.jsx
import "../assets/Css/grafico.css"
import React, {useState} from 'react';
import ReactEcharts from 'echarts-for-react'; 
import * as echarts from 'echarts';

function BarChart({nome,dict }) {
  const [ano, setAno] = useState("2026") 
  const [estatistica, setEstatistica] = useState("new_users")
  const [NomeEstatistica, setNomeEstatistica] = useState("new_users")
  
  const teste = "UHW"

 // novos usuários, pedidos, faturamento 

  const option = {
    title: {
      text: `Gráfico de ${NomeEstatistica} `,
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['Janeiro','Fevereiro', 'março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: NomeEstatistica,
        type: 'bar',
        data: dict?.[ano]?.[estatistica] || [] ,
        itemStyle: {
           borderRadius: [8, 8, 0, 0], // topo esquerdo, topo direito, baixo direito, baixo esquerdo
        },
      },
    ],
  };

  return (
    <div style={{ width: '100%', height: '400px', display:"flex" }}>
      <ReactEcharts option={option} style={{ height: '100%', width: '100%' }} />
    
  <section className={"container-btns-grafico-config"}> 
    <div className={"container-btn-anos"}>
    
       <h4> Periodos </h4> 

    { Object.keys(dict || {}).map((year, index) => ( 
      
      <button key={index} className={year === ano ? 'btn-actived' : 'btn'  } onClick={ () => setAno(year)} >{year}</button>


    ))} 
    </div>
    
    <div className={"container-btn-estatisticas"}>
       <h4> Estatisticas </h4> 
      <button onClick={() => {setNomeEstatistica("Vendas"); setEstatistica("orders_count")}} 
    className={NomeEstatistica === "Vendas" ? "btn-actived" : "btn"   }  >
          Vendas
      </button>
 
      <button onClick={() => {setNomeEstatistica("Faturamento"); setEstatistica("revenue")} } 
    className={NomeEstatistica === "Faturamento" ? "btn-actived" : "btn"   } >
         Faturamento 
      </button>
 
          <button onClick={() => {setNomeEstatistica("Novos usuários");  setEstatistica("new_users")}} 
         className={NomeEstatistica === "Novos usuários" ? "btn-actived" : "btn"   } >
 
          Novos Usuários
         </button>
       </div>
     </section>
    </div>
  );
}

export default BarChart;

