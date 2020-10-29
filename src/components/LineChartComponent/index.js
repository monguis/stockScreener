import Chart from 'chart.js';
import "chartjs-plugin-zoom";
import { DateTime } from "luxon";
import React, { useEffect } from 'react';
import 'chartjs-adapter-luxon';


const LineChartComponent = (props) => {

    const { dataToGraph, chartLabels, chartCustomOptions, companyTicker } = props;
    var lineChart;

    useEffect(() => {
        if (dataToGraph.length > 0) {
            if (lineChart) lineChart.destroy()
            buildChart();
        }
    }, [props])


//     let range_min = new Date(chartLabels[0]*1000);  //start date
//     range_min.setDate(range_min.getDate()-10);
  
//     let range_max = new Date(chartLabels[chartLabels.length-1]*1000);  //end date
//     range_max.setDate(range_max.getDate()+10);
// console.log("fecha")
// console.log(range_max)




    const buildChart = () => {

        lineChart = new Chart(document.getElementById('myChart').getContext("2d"), {
            type: 'line',
            data: {
                labels: [new DateTime.fromSeconds(chartLabels[0]), new DateTime.fromSeconds(chartLabels[chartLabels.length - 1])],

                datasets: [{
                    label: companyTicker,
                    borderColor: 'rgba(0, 150, 0, 1)',
                    data: dataToGraph.map((price, index) => {
                        return {
                            y: price,
                            t: new DateTime.fromSeconds(chartLabels[index])
                        }
                    }),
                    fill: true,
                    tension: 0,
                    steppedLine: false,
                    pointRadius: 4,

                }]
            },
            options: chartCustomOptions ? chartCustomOptions
                :
                {
                    animation: false,
                    responsive: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: false,
                            }
                        }],
                        xAxes: [{
                            distribution:"series",
                            display: true,
                            type: 'time',
                            time: {
                                // unit: "day",
                                bounds:"data",
                            },
                            ticks: {
                                source: "auto",
                                min: 1,

                            }
                        }]
                    },
                    plugins: {
                        zoom: {
                            zoom: {
                                speed: 0.05,
                                enabled: true,
                                mode: "x",
                                threshold: 10,
                                rangeMin: {
                                    x: chartLabels[0] * 1000
                                },
                                rangeMax: {
                                    x: chartLabels[chartLabels.length - 1] * 1000
                                }
                            },



                            pan: {
                                enabled: true,
                                mode: 'x',
                                rangeMin: {
                                    x: chartLabels[0] * 1000
                                },
                                rangeMax: {
                                    x: chartLabels[chartLabels.length - 1] * 1000
                                }
                            }
                        },
                    },
                },


        });


    }

    return <>
        <canvas id="myChart" style={{ width: "1200px", height: "600px" }}> </canvas>
    </>
}

export default LineChartComponent;


