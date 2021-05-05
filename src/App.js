import React, { useState } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Shop from './components/Shop/Shop'
import { createContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import Review from './components/Review/Review';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Inventory from './components/inventory/Inventory';
import Login from './components/LogIn/LogIn';
import Shipment from './components/shipment/Shipment';
import ProductDetail from './components/ProductDetail/ProductDetail';
import NotFound from './components/Notfound/Notfound';

export const UserContext = createContext();

function App(props) {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}>
      <h3>email: {loggedInUser.email}</h3>
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/shop/:searchValue">
            <Shop></Shop>
          </Route>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review ></Review>
          </Route>
          <PrivateRoute path="/inventory">
            <Inventory ></Inventory>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;