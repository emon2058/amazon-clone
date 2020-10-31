import React,{useState,useEffect} from 'react';
import './Payment.css';
import {useStateValue} from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import {useHistory} from 'react-router-dom';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'; /*npm i @stripe/react-stripe-js*/
import {getBasketTotal} from './reducer';
import CurrencyFormat from 'react-currency-format';
import axios from './axios';
import {db} from './firebase';

function Payment(){
  const [{basket,user},dispatch]=useStateValue();
  const history=useHistory();

  const stripe=useStripe();
  const elements=useElements();

  const [error,setError]=useState(null);
  const [disabled,setDisabled]=useState(true);
  const [clientSecrect,setClientSecrect]=useState(true);
  const [succeeded,setSucceeded]=useState(false);
  const [processing,setProcessing]=useState("");

  useEffect(()=>{
    //generate special stripe secrect which allows us to change customer
    const getClientSecrect = async () => {
      const response = await axios({
        method: 'post',
        url: `/payment/create?total=${getBasketTotal(basket) * 100}`
      });
      setClientSecrect(response.data.clientSecrect)
    }
    getClientSecrect();
  }, [basket])

  console.log("get Client Secrect is ",clientSecrect);

  const handleSubmit=async(event) =>{
    //do all the fancy stripe stuff
    event.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecrect, {
      payment_method: {
        card: elements.getElement(CardElement)
      },
    }).then(({paymentIntent})=>{
      //paymentIntent = payment confirmation

      db.collection('user').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
          basket: basket,
          amount: paymentIntent.amount/100,
          created: paymentIntent.created
      })
      setSucceeded(true);
      setError(null);
      setProcessing(false);

       dispatch({
         type: 'EMPTY_BASKET'
       })

      history.replace('/orders')
    })
  }

  const handleChange=event =>{
    //Listen for changes in the CardElement
    //and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  }
  return(
    <div className="payment">
      <div className="payment_container">
      {/*payment delivery address*/}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{user?.email}</p>
            <p>Home address</p>
            <p>HOme address</p>
          </div>
        </div>

        {/*payment section - review items*/}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="payment_address">
            {basket.map(item=>(
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        {/*payment section - payment method*/}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange}/>
              <div className="payment_price_container">
                <CurrencyFormat
                  renderText={(value)=>(
                    <>
                    <p>
                      Total Orders ({basket.length} items): <strong>{value}</strong>
                    </p>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={disabled || processing || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
                {/*If found any error then show it in div*/}
                {error && <div>{error}</div>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment;
