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
                    console.log(data.v)
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
        <LivePriceChart dataToGraph={ChartData.price} chartLabels={ChartData.tradeTime} sharesVolume={ChartData.sharesVolume} companyTicker={companyTicker} />
    )
}

export default IndividualStockInfoPage;