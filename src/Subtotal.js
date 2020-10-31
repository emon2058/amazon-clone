import React from 'react';
import './Subtotal.css';
import {useStateValue} from './StateProvider';
import {getBasketTotal} from './reducer';
import CurrencyFormat from 'react-currency-format';  /*npm i react-currency-format*/
import {useHistory} from 'react-router-dom';

function Subtotal(){
  const history=useHistory();
  const [{basket},dispatch]=useStateValue();
  return(
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value)=>(
          <>
          <p>
            Subtotal ({basket.length} items): <strong>{value}</strong>
          </p>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
        />
        <button className="subtotal_button" onClick={ e =>history.push('/payment')}>Proceed to continue</button>
    </div>
  )
}

export default Subtotal;
