import React from 'react';
import './order.css'
import moment from 'moment';
import CheckoutProduct from './CheckoutProduct';

function Order({order}) {
  return(
    <div className="order">
      <h2>Order</h2>
      <p className='left'>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p><b>User Id : <small>{order.id}</small></b></p>
      {order.data.basket?.map(item => (
        <CheckoutProduct
          id={item.id}
          image={item.image}
          title={item.title}
          price={item.price}
          rating={item.rating}
        />
      ))}
    </div>
  )
}

export default Order;
