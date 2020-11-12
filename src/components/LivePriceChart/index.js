import React, { useEffect, useState } from "react";
import CandleChartComponent from "../CandleChartComponent/";

const LivePriceChart = (props) => {

    const { companyTicker, dataToGraph, sharesVolume } = props

    const [zoomIndex, setZoomIndex] = useState({
        last: dataToGraph.length - 1,
        first: 0
    });

    // useEffect(() => {
    //     const socket = new WebSocket(`wss://ws.finnhub.io?token=btn728n48v6qfboarpbg`);
    //     socket.addEventListener('open', function (event) {
    //         socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': companyTicker }));
    //         socket.addEventListener('message', function (event) {

    //             console.log(event.data);
    //         });
    //     });
    //     return () => {
    //         socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': companyTicker }));
    //     }
    // }, [])

    const method = (e) => {
        setZoomIndex({
            last: zoomIndex.last - 10,
            first: zoomIndex.first + 10
        })
    }
    const method2 = (e) => {
        setZoomIndex({
            last: zoomIndex.last + 10,
            first: zoomIndex.first - 10
        })
    }

    return (
        <div>
            < CandleChartComponent {...props} sharesVolume={sharesVolume.slice(zoomIndex.first, zoomIndex.last)} dataToGraph={dataToGraph.slice(zoomIndex.first, zoomIndex.last)} method={method} />
            <button onClick={method}>Zoom</button>
            <button onClick={method2}>deZoom</button>
    </div >
    )
}

export default LivePriceChart;