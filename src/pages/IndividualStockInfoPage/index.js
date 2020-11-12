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
        API.getStockFinancials("AAPL").then(({ data }) => {
            console.log(data)
        })
        return () => {

        }
    }, []);

    return (
        <div>
            <h1>Data</h1>
            <LivePriceChart dataToGraph={ChartData.price} chartLabels={ChartData.tradeTime} sharesVolume={ChartData.sharesVolume} companyTicker={companyTicker} />
        </div>
    )
}

export default IndividualStockInfoPage;