import React, { useEffect, useState } from "react";
import Chart from 'chart.js';

const PriceChart = (props) => {


    //reminder - crear busqueda de acciones por sectores 
    // linkear pagina a notificaciones de companias

    const { dataToRender } = props;


    useEffect(() => {
        buildChart();
    }, [])

    useEffect(() => {
        console.log(dataToRender)
        if (dataToRender.tradeTime[dataToRender.tradeTime.length-1] % 60 === 0) {
            buildChart();
        }
    }, [dataToRender])

    const buildChart = () => {
        new Chart(document.getElementById('myChart').getContext("2d"),
            {
                type: 'line',
                data: {
                    labels: dataToRender.tradeTime,
                    datasets: [{
                        label: 'Closing Price',
                        borderColor: 'rgba(0, 150, 0, 1)',
                        data: dataToRender.price,
                        fill: false,
                        tension: 0,
                        steppedLine: false,
                        pointRadius: 1,
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: false
                            }
                        }]
                    }
                }
            })
    }

    return (<>
        <canvas id="myChart" styles={{ width: "400px", height: "400px" }}> </canvas>
    </>);
}

export default PriceChart;