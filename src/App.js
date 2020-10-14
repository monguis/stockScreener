import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import API from "./utils/API/";
import IndividualStockPricePage from "./pages/IndividualStockInfoPage/";



API.search();

function App() {

  return (
    <IndividualStockPricePage />
  )
}

export default App;
