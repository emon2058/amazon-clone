import React from 'react';
import './Checkout.css';
import Subtotal from './Subtotal';
import {useStateValue} from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import Signup from './Signup';

function Checkout(){
  const [{basket,user},dispatch]=useStateValue();
  return(
    <div className="checkout">
      <div className="checkoutLeft">
        <h2>Your Shopping Basket{user?.password}</h2>
        { basket.map( item => (
        <CheckoutProduct
          id={item.id}
          image={item.image}
          title={item.title}
          price={item.price}
          rating={item.rating}
          hideButton
        />
      ))}
      </div>
      <div className="checkoutRight">
        <Subtotal />
      </div>
    </div>
  )
}

export default Checkout;
