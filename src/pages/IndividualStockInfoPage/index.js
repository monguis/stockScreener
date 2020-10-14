import React, { useEffect, useState } from "react";
import PriceChart from "../../components/PriceChart";
import API from '../../utils/API'

const IndividualStockPricePage = () => {
    const [StockInfo, ChangeStockInfo] = useState({});



    useEffect((

    ) => { }, [])

    return (<div>
        <PriceChart symbolToRender = {"AAPL"}/>

    </div>
    )
}

export default IndividualStockPricePage;