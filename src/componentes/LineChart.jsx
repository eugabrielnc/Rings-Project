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
  const [listDataChart, setListDataChart] = useState([])


  function selectListDataChart(){
    
  let dataChart = [];
  
  

  if(xAxisData === selectedMonth){
  
    let lista = Object.values(data?.[selectedMonth] || {})
    lista.map(arr =>{ 
      const soma = arr[dataPicked].reduce((acc, n) => acc + n, 0);      
      dataChart.push(soma) 

    })

  }

  else{
   dataChart = data?.[selectedMonth]?.[xAxisData]?.[dataPicked] 
  }

    setListDataChart(dataChart)

  }

  useEffect(() => {
    selectListDataChart()
  }, [dataPicked])


  useEffect(() => {
  setAxisData((Object.keys(data || {}))?.[0])
  setMonths((Object.keys(data || {}))?.[0])
  }, [])
 
  useEffect(() => {
  const  listIndex = (Object.keys(data || {}))

  setDays(Object.keys(data[selectedMonth] || {}))

  selectListDataChart()

  }, [xAxisData])


  function selectList(AxisData) {

    if(AxisData === selectedMonth){

      return(Object.keys(data[xAxisData] || {}))
    }
    else if(days.includes(AxisData)){
      return data[selectedMonth][AxisData][0];
    } 
 
    return[AxisData, "aaa"]

  }


  const option = {
    title:{text:`Gráfico de ${chartsName}`},
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: selectList(xAxisData) //data?.[xAxisData]?.[0],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name:chartsName ,
        type: "bar",
        data: listDataChart,
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
      {Object.keys(data || {}).map((month, index) => ( 

        <button className={selectedMonth == month ? 'btn-actived' : 'btn'} key={index} 
        onClick={() => {setAxisData(month);setSelectedMonth(month) }} 
        >{month}</button>
      ) )}
    </div>
    
    <div>
    {days.map((day, index) => ( 

        <button className={xAxisData == day ? 'btn-actived' : 'btn'} key={index} 
        onClick={() => {setAxisData(day); }} 
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


    </div>
     </section>


    </div>

  );


}




export default LineChart
