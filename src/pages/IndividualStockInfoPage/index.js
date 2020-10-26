import React, { useEffect, useState } from "react";
import PriceChart from "../../components/PriceChart";
import API from '../../utils/API'

const IndividualStockInfoPage = () => {
    const [ChartData, setChartData] = useState({
        tradeTime: [],
        price: [],
        sharesVolume: []
    });

    const convertUnixtoDate = (seconds) => {
        const convertedDate = new Date(seconds)

        convertedDate.toLocaleString("en-US", { weekday: "long" }) // Monday
        convertedDate.toLocaleString("en-US", { month: "long" }) // December
        convertedDate.toLocaleString("en-US", { day: "numeric" }) // 9
        convertedDate.toLocaleString("en-US", { year: "numeric" }) // 2019
        convertedDate.toLocaleString("en-US", { hour: "numeric" }) // 10 AM
        convertedDate.toLocaleString("en-US", { minute: "numeric" }) // 30
        convertedDate.toLocaleString("en-US", { second: "numeric" }) // 15
        convertedDate.toLocaleString("en-US", { timeZoneName: "short" }) // 12/9/2019, 10:30:15 AM CST
        return convertedDate;
    }

    useEffect(() => {
        // 1603750063 - 2, 592, 000

        const orita = Date.now() / 1000 | 0;
        console.log(orita)
        API.getHistoricalDailyData()
            .then(({ data }) => {
                console.log(data)
                if (data.s === "ok") {
                    setChartData({
                        ...ChartData,
                        tradeTime: data.t,
                        price: data.c,
                        sharesVolume: data.v
                    });
                }
            }).then(() => {
                const socket = new WebSocket(`wss://ws.finnhub.io?token=btn728n48v6qfboarpbg`);

                    socket.addEventListener('open', function (event) {
                        socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': "AAPL" }))
                        // "IC MARKETS:1"

                        socket.addEventListener('message', function (event) {
                            console.log(event.data)

                            try {
                                const newTrade = JSON.parse(event.data).data[0];
                                
                                setChartData(currentData => {
                                    return {
                                        ...currentData,
                                        tradeTime: [...currentData.tradeTime, newTrade.t],
                                        price: [...currentData.price, newTrade.p],
                                        sharesVolume: [...currentData.sharesVolume, newTrade.v],
                                    }
                                })
                            } catch{
                                console.log("NO TRADE")
                            }
                        });
                    });
                }
            );









        return () => {
            console.log("last effect")
            // socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': "AAPL" }))
        }
    }, []);

    return (<div>
        <PriceChart dataToRender={ChartData} />


    </div>
    )
}

export default IndividualStockInfoPage;