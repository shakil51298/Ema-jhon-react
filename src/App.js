import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Review from './components/Revidew/Review';
import Inventory from './components/inventory/Inventory';
import Notfound from './components/Notfound/Notfound';
import ProductDetaills from './components/ProDetails/ProductDetaills';
import Price from './components/Price/Price';
import Product from './components/product/Product';
import Fuck from './components/Fuck/Fuck';


function App() {

  return (
    <div>
      <Router>
        <Header/>
        <Switch>
          <Route path="/shop">
            <Shop/>                
          </Route>

          <Route path="/review">
              <Review/>
          </Route>

          <Route path="/inventory">
              <Inventory></Inventory>
          </Route>

          <Route exact path="/">
            <Shop/>
          </Route>

          <Route path="/product/:productkey">
            <ProductDetaills/>
          </Route>
           
          <Route path="*">
            <Notfound/>
          </Route>

        </Switch>
      </Router>
        
    </div>
  );
}


export default App;
