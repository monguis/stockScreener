import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import API from "./utils/API/";
import PriceChart from "./components/PriceChart/";



API.search();

function App() {
  
  return(
    <PriceChart/>
  )
}

export default App;
