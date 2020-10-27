import Chart from 'chart.js';
import React, { useEffect } from 'react';


const LineChartComponent = (props) => {

    const { dataToGraph, chartLabels, chartCustomOptions } = props
    var ctx;
    var lineChart;
    useEffect(() => {
        ctx = document.getElementById('myChart').getContext("2d");
        if (!lineChart) {
            buildChart();
        } else {
            lineChart.destroy()
            buildChart();
        }
    }, [props])

    const buildChart = () => {
        lineChart = new Chart(ctx,
            {
                type: 'line',
                data: {
                    labels: chartLabels,
                    datasets: [{
                        label: 'Closing Price',
                        borderColor: 'rgba(0, 150, 0, 1)',
                        data: dataToGraph,
                        fill: false,
                        tension: 0,
                        steppedLine: false,
                        pointRadius: 1,
                    }]
                },
                options: chartCustomOptions ? chartCustomOptions
                    :
                    {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: false
                                }
                            }]
                        },
                        animation: false,
                        responsive: false
                    }
            })
    }



    return <>
        <canvas id="myChart" style={{ width: "1200px", height: "600px" }}> </canvas>
    </>
}

export default LineChartComponent