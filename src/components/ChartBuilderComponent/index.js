import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js";
let myChart;


const ChartBuilderComponent = props => {

    const chartRef = useRef();
    const { optionsObject, dataObject, chartType } = props;

    useEffect(() => {
        myChart = new Chart(chartRef.current, {
            type: chartType,
            options: optionsObject,
            data: dataObject
        })
    }, [])


    useEffect(()=>{
        myChart.data = dataObject
        myChart.update()
    },[props]);

    // const testChart = () => {
    //     console.log(myChart.data.datasets[0].data)
    //     myChart.data.datasets[0].data.push(9)
    //     myChart.data.datasets[0].backgroundColor.push('rgba(255, 99, 132, 0.2)')
    //     myChart.data.labels.push("kaka")
    //     myChart.update();
    // }
    return (
            <canvas ref={chartRef} style={{ width: "1200px", height: "600px" }}></canvas>
    )
}

export default ChartBuilderComponent;