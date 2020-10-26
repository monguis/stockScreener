import axios from "axios";
const BAS = process.env.REACT_APP_API_KEY;

export default {
    getCall: function (query) {
        return axios.get(query);
    },
    getHistoricalDailyData() {
        const currentTime = new Date() / 1000 | 0;
        return axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=D&from=${currentTime - (2592000 * 12)}&to=${currentTime}&token=btn728n48v6qfboarpbg`);
    },
    search: function () {
        // console.log(BAS);
    }
};