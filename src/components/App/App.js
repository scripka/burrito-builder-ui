import React, { useState, useEffect } from "react";
import './App.css';
import {apiCalls} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

const App = () => {
  
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  const getInfo = () => {
    Promise.resolve(apiCalls.getOrders())
      .then((data) => {
        setOrders(data.orders)
      })
      .catch((err) => setError(err.message));
  };

  useEffect(() => getInfo(), [orders]);

    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm getInfo={getInfo} />
        </header>

        <Orders orders={orders}/>
      </main>
    );
}


export default App;
