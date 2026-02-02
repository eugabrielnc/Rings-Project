import "../assets/Css/grafico.css"
import React, {useState, useEffect} from 'react';
import ReactEcharts from 'echarts-for-react'; 
import * as echarts from 'echarts';



function LineChart({data}) {

  const [analitycs, setAnalitycs] = useState({})
  const [xAxisData, setAxisData] = useState([])
  const [dataPicked, setDataPicked] = useState(1)
  const [chartsName, setChartsName] = useState("")
  const [days, setDays] = useState([])     
  const [months, setMonths] = useState([])
  const [selectedMonth, setSelectedMonth] = useState("")
  const [selectedYear, setSelectedYear] = useState("") 
 
  const [lineX, setLineX] = useState([])

  const [listDataChart, setListDataChart] = useState([])


  useEffect(() => {
  const year = (Object.keys(data || {}))?.[0]
  setSelectedYear(year) 
  console.log((Object.keys(data[year] || {})), "ai")
  setMonths((Object.keys(data[year] || {})))
  }, [])

  useEffect(() => {
    setMonths(Object.keys(data[selectedYear] || {}))
    setDays(Object.keys(data?.[selectedYear]?.[selectedMonth] || {}))
  }, [selectedYear, selectedMonth])


  useEffect(() => {
  setMonths((Object.keys(data[selectedYear] || {})))
  }, [selectedYear])
  useEffect(() => {
    console.log(xAxisData, "TESTE")
    

    if(months.includes(selectedMonth)){
        setAnalitycs(data[selectedYear][selectedMonth]["geral"][dataPicked]) 
        setLineX(data[selectedYear][selectedMonth]["geral"][0])
        setDays(Object.keys(data[selectedYear][selectedMonth] || {}))
    }
    if(days.includes(xAxisData)){
        setAnalitycs(data?.[selectedYear]?.[selectedMonth]?.[xAxisData][dataPicked])
        setLineX(data?.[selectedYear]?.[selectedMonth]?.[xAxisData]?.[0])

    }



  }, [xAxisData, dataPicked])


  const option = {
    title:{text:`Gráfico de ${chartsName}`},
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: lineX //data?.[xAxisData]?.[0],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name:chartsName ,
        type: "bar",
        data: analitycs,
        smooth: true,
        symbol: "circle",
        symbolSize: 8,
         itemStyle: {
           borderRadius: [8, 8, 0, 0], // topo esquerdo, topo direito, baixo direito, baixo esquerdo
        },
      },
    ],
  };

  return (
    <div style={{ width: '100%', height: '400px', display:"flex" }}> 

    <ReactEcharts
      option={option}
      style={{ height: 400, width: "100%" }}
    />
 
  <section className={"container-btns-grafico-config"}> 
    <div className={"container-btn-anos"}>
       <h4>Meses  </h4> 
      {Object.keys(data || {}).map((year, index) => ( 

        <button className={selectedYear == year ? 'btn-actived' : 'btn'} key={index} 
        onClick={() => {setSelectedYear(year) }} 
        >{year}</button>
      ) )}
    </div>
    
    <div>
    {months.map((month, index) => ( 

        <button className={selectedMonth == month ? 'btn-actived' : 'btn'} key={index} 
        onClick={() => {setSelectedMonth(month) }} 
        >{month}</button>
      ) )}


    </div>
    <div>
    {days.map((day, index) => ( 

        <button className={xAxisData == day ? 'btn-actived' : 'btn'} key={index} 
        onClick={() => {setAxisData(day) }} 
        >{day}</button>
      ) )}


    </div>



    <div className={"container-btn-estatisticas"}>
       <h4> Estatisticas </h4> 
     
        <button onClick={() => {setDataPicked(1); setChartsName("Atividade")} } 
    className={chartsName == "Atividade" ? "btn-actived" : "btn"} >
          Visitas
      </button>
 
      <button  onClick={() => {setDataPicked(2); setChartsName("Vendas feitas")}} 
    className={chartsName == "Vendas feitas" ? 'btn-actived' : 'btn' } >
        Vendas feitas 
      </button>

      <button  onClick={() => {setDataPicked(3); setChartsName("Novos usuários")}} 
    className={chartsName == "Novos usuários" ? 'btn-actived' : 'btn' } >
        Novos Usuários 
      </button>

      <button  onClick={() => {setDataPicked(3); setChartsName("Faturamento")}} 
    className={chartsName == "Faturamento" ? 'btn-actived' : 'btn' } >
        Faturamento 
      </button>


    </div>
     </section>


    </div>

  );


}




export default LineChart
