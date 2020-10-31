import React from 'react';
import './Product.css';
import {useStateValue} from './StateProvider';
import {useHistory} from 'react-router-dom';

function Product({id,title,price,rating,image}){
  const history=useHistory();
  const [{basket,user},dispatch] = useStateValue();
  const addToBasket = () =>{
    if(user){
    // dispatch the item into the data layer
    dispatch({
      type:"ADD_TO_BASKET",
      item: {
        id:id,
        title:title,
        image:image,
        price:price,
        rating:rating,
      },
    });
  }
else{
  history.push('./login');
}
};
  return(
    <div className="product">
      <div className="product_info">
        <p>{title}</p>
        <p className="product_price">
           <small>$</small>
           <strong>{price}</strong>
        </p>
        <div className="product_ratings">
          {Array(rating).fill().map(()=>(<p>🌟</p>))}
        </div>
      </div>
      <img
      src={image}
      />
      <button onClick={addToBasket}>add to busket</button>
    </div>
  );
}

export default Product;
