import axios from "axios";
const BAS = process.env.REACT_APP_API_KEY;

export default {
    getCall: function (query) {
        return axios.get(query);
    },
    getStockHistoricalDailyPriceDataFromLastYear(companyTicker) {
        const currentTime = new Date() / 1000 | 0;
        return axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=${companyTicker}&resolution=D&from=${currentTime - (3600 * 24 * 30 * 12)}&to=${currentTime}&token=${BAS}`);
    },
    getCryptoHistoricalDailyPriceDataFromLastYear(companyTicker) {
        const currentTime = new Date() / 1000 | 0;
        return axios.get(`https://finnhub.io/api/v1/crypto/candle?symbol=${companyTicker}&resolution=D&from=${currentTime - (2592000 * 12)}&to=${currentTime}&token=${BAS}`);
    },
    getStockFinancials:function(companyTicker) {
        return axios.get(`https://finnhub.io/api/v1/stock/metric?symbol=${companyTicker}&metric=all&token=${BAS}`)
    },
    getStockFinancialsAsReported:function(companyTicker) {
        return axios.get(`https://finnhub.io/api/v1/stock/metric?symbol=${companyTicker}&metric=all&token=${BAS}`)
    }

};
