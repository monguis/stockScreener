import Chart from 'chart.js';
import "chartjs-plugin-zoom";
import React, { useEffect } from 'react';

const LineChartComponent = (props) => {

    const { dataToGraph, chartLabels, chartCustomOptions, companyTicker } = props;
    var lineChart;

    var randomScalingFactor = function () {
        return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
    };

    var barChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
            label: 'Dataset 1',
            backgroundColor: 'rgba(220,220,220,0.5)',
            data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
        }, {
            hidden: false,
            label: 'Dataset 2',
            backgroundColor: 'rgba(255,187,205,1)',
            data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
        }, {
            label: 'Dataset 3',
            backgroundColor: 'rgba(151,187,205,0.5)',
            data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
        }]

    };


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
                labels: [
                    new Date((chartLabels[0] * 1000) - (3600 * 24 * 30 * 12)).toLocaleString(),
                    new Date().toLocaleString()],
                datasets: [{
                    label: companyTicker,
                    borderColor: 'rgba(0, 150, 0, 1)',
                    data: dataToGraph.map((price, index) => {
                        console.log(new Date(chartLabels[index] * 1000))
                        return {
                            y: price,
                            t: new Date(chartLabels[index] * 1000)
                        }
                    }),
                    fill: false,
                    tension: 0,
                    steppedLine: false,
                    pointRadius: 2,

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
                        }],
                        xAxes: [{
                            type: 'time',
                            ticks: {
                                source: "labels",
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Date'
                            },
                        }]
                    }
                },
            plugins: {
                zoom: {
                    zoom: {
                        enabled: true,
                        drag: {
                            animationDuration: 1000
                        },
                        mode: 'x',
                        speed: 0.05
                    }
                }
            },
            animation: false,
            responsive: true
        });

        // options: {
        //     scales: {
        //       xAxes: [{
        //         type: 'time'
        //       }]
        //     }
        //   }

        // type: 'bar',
        //     data: barChartData,
        //     options: {
        //         // Elements options apply to all of the options unless overridden in a dataset
        //         // In this case, we are setting the border of each bar to be 2px wide and green
        //         elements: {
        //             rectangle: {
        //                 borderWidth: 2,
        //                 borderColor: 'rgb(0, 255, 0)',
        //                 borderSkipped: 'bottom'
        //             }
        //         },
        //         responsive: true,
        //         legend: {
        //             position: 'top',
        //         },
        //         title: {
        //             display: true,
        //             text: 'Chart.js Bar Chart'
        //         },
        //         scales: {
        //             xAxes: [{
        //                 ticks: {
        //                     min: 'February',
        //                     max: 'June'
        //                 }
        //             }]
        //         },
        //         plugins: {
        //             zoom: {
        //                 pan: {
        //                     enabled: true,
        //                     mode: 'x'
        //                 },
        //                 zoom: {
        //                     enabled: true,
        //                     mode: 'x'
        //                 }
        //             }
        //         }
        //     }

        var ctx = document.getElementById('myChart2').getContext('2d');
        window.myBar = new window.Chart(ctx, {
            type: 'bar',
            data: barChartData,
            options: {
                // Elements options apply to all of the options unless overridden in a dataset
                // In this case, we are setting the border of each bar to be 2px wide and green
                elements: {
                    rectangle: {
                        borderWidth: 2,
                        borderColor: 'rgb(0, 255, 0)',
                        borderSkipped: 'bottom'
                    }
                },
                responsive: true,
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Chart.js Bar Chart'
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            min: 'February',
                            max: 'June'
                        }
                    }]
                },
                plugins: {
                    zoom: {
                        pan: {
                            enabled: true,
                            mode: 'y'
                        },
                        zoom: {
                            enabled: true,
                            mode: 'x'
                        }
                    }
                }
            }
        });

    }



    return <>
        <canvas id="myChart" style={{ width: "1200px", height: "600px" }}> </canvas>
        <canvas id="myChart2" style={{ width: "1200px", height: "600px" }}> </canvas>
    </>
}

export default LineChartComponent;


