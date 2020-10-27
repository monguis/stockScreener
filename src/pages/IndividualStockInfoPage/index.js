import React, { useEffect, useState } from "react";
import API from '../../utils/API';
import LivePriceChart from '../../components/LivePriceChart';

const IndividualStockInfoPage = (props) => {

    const { companyTicker } = props;

    const [ChartData, setChartData] = useState({
        tradeTime: [],
        price: [],
        sharesVolume: []
    });

    // const convertUnixtoDate = (seconds) => {
    //     const convertedDate = new Date(seconds)

    //     convertedDate.toLocaleString("en-US", { weekday: "long" }) // Monday
    //     convertedDate.toLocaleString("en-US", { month: "long" }) // December
    //     convertedDate.toLocaleString("en-US", { day: "numeric" }) // 9
    //     convertedDate.toLocaleString("en-US", { year: "numeric" }) // 2019
    //     convertedDate.toLocaleString("en-US", { hour: "numeric" }) // 10 AM
    //     convertedDate.toLocaleString("en-US", { minute: "numeric" }) // 30
    //     convertedDate.toLocaleString("en-US", { second: "numeric" }) // 15
    //     convertedDate.toLocaleString("en-US", { timeZoneName: "short" }) // 12/9/2019, 10:30:15 AM CST
    //     return convertedDate;
    // }

    useEffect(() => {
        API.getStockHistoricalDailyPriceDataFromLastYear(companyTicker)
            .then(({ data }) => {
                if (data.s === "ok") {
                    setChartData({
                        ...ChartData,
                        tradeTime: data.t,
                        price: data.c,
                        sharesVolume: data.v
                    });
                }
            })
        return () => {
            
        }
    }, []);

    return (
        <LivePriceChart dataToGraph={ChartData.price} chartLabels={ChartData.tradeTime} companyTicker={companyTicker} />
    )
}

export default IndividualStockInfoPage;