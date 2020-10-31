import React, { useEffect, useState } from "react";
import CandleChartComponent from "../CandleChartComponent/";

const LivePriceChart = (props) => {

    const { companyTicker } = props

    useEffect(() => {
        const socket = new WebSocket(`wss://ws.finnhub.io?token=btn728n48v6qfboarpbg`);
        socket.addEventListener('open', function (event) {
            socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': companyTicker }));
            socket.addEventListener('message', function (event) {

                console.log(event.data);
            });
        });
        return () => {
            socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': companyTicker }));
        }
    }, [])



    return <CandleChartComponent {...props} /> 
}

export default LivePriceChart;