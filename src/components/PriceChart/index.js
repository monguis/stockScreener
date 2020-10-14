import React, { useEffect, useState } from "react";
import Chart from 'chart.js';

const PriceChart = (props) => {


    const { symbolToRender } = props;

    const [ChartData, setChartData] = useState({
        tradeTimeData: [],
        priceData: [],
        sharesVolumeData: []
    })

    useEffect(() => {
        const socket = new WebSocket(`wss://ws.finnhub.io?token=btn728n48v6qfboarpbg`);

        socket.addEventListener('open', function (event) {
            socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': symbolToRender.toUpperCase() }))
        });

        // Listen for messages
        socket.addEventListener('message', function (event) {
            const newTrade = JSON.parse(event.data).data[0];
            setChartData(currentData => {
                return {
                    ...currentData,
                    tradeTimeData: [...currentData.tradeTimeData, newTrade.t],
                    priceData: [...currentData.priceData, newTrade.p],
                    sharesVolumeData: [...currentData.sharesVolumeData, newTrade.v],
                }
            })
        });

        return () => {
            let unsubscribe = function () {
                socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': "AAPL" }))
            }
            unsubscribe();
        }
    }, []);

    useEffect(() => {
        buildChart();
    }, [ChartData])

    const buildChart = () => {

        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ChartData.tradeTimeData,
                datasets: [{
                    label: 'Closing Price',
                    borderColor: 'rgba(0, 150, 0, 1)',
                    data: ChartData.priceData,
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
        });

    }




    return (<>
        <canvas id="myChart" styles={{ width: "400px", height: "400px" }}> </canvas>
        {/* {/* <button onClick={buildChart}>test</button> */}
    </>);
}

export default PriceChart;