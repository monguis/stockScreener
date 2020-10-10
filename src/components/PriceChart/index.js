import React, { useEffect, useState } from "react";
import Chart from 'chart.js';
import API from "../../utils/API"

const PriceChart = () => {

    const [testState, changeState] = useState([]);
    useEffect(() => {
        API.testCall().then(({ data }) => {
            console.log(data)
            changeState(Object.values(data["Time Series (1min)"]));
        });

    }, [])

    useEffect(() => {

        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: testState.map(item => item[ "5. volume"]),
                    datasets: [{
                        label: 'Closing Price',
                        borderColor:'rgba(0, 150, 0, 1)',
                        data: testState.map(item => item[ "4. close"]),
                        fill:false,
                        steppedLine:true,
                        pointRadius:0,
                        // backgroundColor: [
                        //     'rgba(255, 99, 132, 0.2)',
                        //     'rgba(54, 162, 235, 0.2)',
                        //     'rgba(255, 206, 86, 0.2)',
                        //     'rgba(75, 192, 192, 0.2)',
                        //     'rgba(153, 102, 255, 0.2)',
                        //     'rgba(255, 159, 64, 0.2)'
                        // ],
                        // borderColor: [
                        //     'rgba(255, 99, 132, 1)',
                        //     'rgba(54, 162, 235, 1)',
                        //     'rgba(255, 206, 86, 1)',
                        //     'rgba(75, 192, 192, 1)',
                        //     'rgba(153, 102, 255, 1)',
                        //     'rgba(255, 159, 64, 1)'
                        // ],
                        // borderWidth: 3
                    }]
    },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }, [testState])


    return (<>
        <canvas id="myChart" styles={{ width: "400px", height: "400px" }}> </canvas>
    </>);
}

export default PriceChart;