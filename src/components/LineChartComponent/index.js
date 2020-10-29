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

    const buildChart = () => {

        lineChart = new Chart(document.getElementById('myChart').getContext("2d"), {
            type: 'line',
            data: {
                labels: [new DateTime.fromSeconds(chartLabels[0]), new DateTime.local()],

                datasets: [{
                    label: companyTicker,
                    borderColor: 'rgba(0, 150, 0, 1)',
                    data: dataToGraph.map((price, index) => {
                        return {
                            y: price,
                            t: new DateTime.fromSeconds(chartLabels[index])
                        }
                    }),
                    fill: false,
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
                            display: false,
                            type: 'time',
                            distribution: 'serial',
                            time: {
                                unit: "day",
                                isoWeekday: false,
                            },
                            ticks: {
                                source: "auto",
                                // min: 1,
                                // max: chartLabels.length

                            }
                        }]
                    },
                    plugins: {
                        zoom: {
                            zoom: {

                                enabled: true,
                                // mode: 'x',
                                rangeMin: {
                                    // Format of max zoom range depends on scale type
                                    // x: 0.01
                                }, 
                                mode: function ({ chart }) {
                                    console.log(this)
                                    return 'x';
                                },
                            },



                            pan: {
                                enabled: true,
                                // mode: 'x',
                                mode: function ({ chart }) {
                                    console.log(this)
                                    return 'x';
                                },
                                rangeMin:{
                                    x:chartLabels[0]*1000
                                },
                                rangeMax:{
                                    x:chartLabels[chartLabels.length-1]*1000
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


