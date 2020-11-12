import React, { useEffect } from "react"
import { DateTime } from "luxon";
import Chart from "chart.js";
import "chartjs-adapter-luxon"

import ChartBuilderComponent from "../ChartBuilderComponent/";
// import "chartjs-plugin-zoom"
// import "chartjs-plugin-crosshair";


const CandleChartComponent = (props) => {
    const { dataToGraph, chartLabels, chartCustomOptions, sharesVolume, companyTicker } = props;

    useEffect(() => {
        console.log(dataToGraph)
    }, [props]);

    const data = chartLabels.length > 0 ? {
        labels: [new DateTime.fromSeconds(chartLabels[0]), new DateTime.fromSeconds(chartLabels[chartLabels.length - 1])],
        datasets: [
            {
                yAxisID: 'A',
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

            },
            {
                yAxisID: 'B',
                type: "bar",
                label: "Volume",
                data: sharesVolume.map((volumeValue, index) => ({
                    y: volumeValue,
                    t: new DateTime.fromSeconds(chartLabels[index])
                })),
                backgroundColor: function (context) {
                    const index = context.dataIndex;
                    const actualChart = context.chart;
                    const periodPrice = actualChart.data.datasets[0].data[index].y
                    const pastPeriodPrice = actualChart.data.datasets[0].data[index > 0 ? index - 1 : 0].y
                    return periodPrice > pastPeriodPrice ? "rgba(0, 150, 0, 1)" : "rgba(150, 0, 0, 1)"
                }
            }
        ]
    } : undefined;



    const options = {
        animation: false,
        responsive: false,
        scales: {
            yAxes: [{
                id: "A",
                ticks: {
                    beginAtZero: true,
                }
            }, {
                id: "B",
                ticks: {
                    beginAtZero: false,
                    max: 3000000000
                }
            }
            ],
            xAxes: [{
                distribution: "series",
                display: true,
                type: 'time',
                ticks: {
                    unit: "day",
                    bounds: "data",
                    source: "auto",
                },

            }]
        },
        tooltips: {
            mode: "index",
            intersect: false,
            callbacks: {
                title: function (a, datasets) {
                    return a[0].xLabel;
                },
                label: function (i, d) {
                    return (
                        d.datasets[i.datasetIndex].label + ": " + i.yLabel.toFixed(2)
                    );
                },
            }
        },
        plugins: {
            crosshair: {
                line: {
                    color: "#42f5c2",
                    width: 5,
                    dashPattern: [1, 5]
                },
                sync: {
                    enabled: false
                },
            },
            zoom: {
                // enabled: false,
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
                }
            }
        }
    }


    return <>{
        data !== undefined ?
            <ChartBuilderComponent
                optionsObject={options}
                dataObject={data}
                chartType="line"
            />
            : ""
    }</>

}

export default CandleChartComponent;