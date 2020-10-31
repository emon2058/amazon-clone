import React, {useEffect} from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import Signup from './Signup';
import Payment from './Payment';
import Orders from './Orders';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; /* npm i react-router-dom */
import {useStateValue} from './StateProvider';
import {auth} from './firebase';
import {loadStripe} from '@stripe/stripe-js'; /*npm i @stripe/stripe-js*/
import {Elements} from '@stripe/react-stripe-js'; /*npm i @stripe/react-stripe-js*/

const promise=loadStripe(
  // {/*api publish key that is copied from stripe website
  "pk_test_51HWpvyLUnNLJLkiJWVrzU1PPdePbwckI5m0FTZzWreuUdCIWpV8bkENANwDZgY9pi8gSsIPdxB5a12pGJPxuU7ZI00xavVxc1M"
);
function App() {
  const [{},dispatch]=useStateValue();
  useEffect(()=>{
    {/*will only run once when the app component loading..*/}
    auth.onAuthStateChanged(authUser=>{
      if(authUser){ {/*if user sign in */}
        dispatch({
          type:'SET_USER',
          user:authUser
        })
        console.log(authUser);
      }
      else{
        dispatch({
          type:'SET_USER',
          user:null
        })
      }
    })

  },[])
  return (
    <Router>
      <div className="App">
      <Header /> {/*fixed navbar on the top*/}
        <Switch>
          <Route path="/payment">
          <Elements stripe={promise}>
            <Payment />
          </Elements>
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/Checkout">
            <Checkout />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
