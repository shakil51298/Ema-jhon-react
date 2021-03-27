import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import { createContext, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Review from './components/Revidew/Review';
import Inventory from './components/inventory/Inventory';
import Notfound from './components/Notfound/Notfound';
import ProductDetaills from './components/ProDetails/ProductDetaills';
import LogIn from './components/LogIn/LogIn';
import Shipment from './components/shipment/Shipment';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const userContext = createContext()

function App() {

  const [loggedInUser, setLoggedInUser] = useState([])
  return (
    <userContext.Provider value={[loggedInUser,setLoggedInUser]}>
      <h3> email : {loggedInUser.email}</h3>
      <Router>
        <Header/>
        <Switch>
          <Route path="/shop">
            <Shop/>                
          </Route>

          <Route path="/review">
              <Review/>
          </Route>

          <PrivateRoute path="/inventory">
              <Inventory></Inventory>
          </PrivateRoute>

          <Route path="/login">
            <LogIn></LogIn>
          </Route>

          <PrivateRoute path="/shipment">
              <Shipment/>
          </PrivateRoute>

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
        
    </userContext.Provider>
  );
}


export default App;
