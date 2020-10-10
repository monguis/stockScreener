import axios from "axios";
const BAS = process.env.REACT_APP_API_KEY;

export default {
    testCall: function () {
        return axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=1min&apikey=demo");
    },
    search: function () {
        // console.log(BAS);
    }
};