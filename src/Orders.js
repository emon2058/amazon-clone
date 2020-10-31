import React ,{useState, useEffect} from 'react';
import {db} from './firebase';
import {useHistory} from 'react-router-dom';
import {useStateValue} from './StateProvider';
import Order from './Order';

function Orders(){
  const history=useHistory();
  const [{basket,user},dispatch]=useStateValue();
  const [orders,setOrders]=useState([]);
  useEffect(() => {
    if(user){
      db.collection('user').doc(user?.uid).collection('orders').orderBy('created','desc').onSnapshot(
      snapshot => (
        setOrders(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
      ))
  }
  else{
    setOrders([])
  }
},[user])

  return(
    <div>
      <h1>Your Orders</h1>
      <div>
      {orders?.map(order => (
        <Order order={order } />
      ))}
      </div>
    </div>
  )
}

export default Orders;
