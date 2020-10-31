import React ,{useState} from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import {Link,useHistory} from 'react-router-dom';
import {useStateValue} from './StateProvider';
import {auth} from './firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

function Header(){
  const history=useHistory();
  const [{basket,user},dispatch]=useStateValue();
  const handleAuthentication = () => {
    if(user){
      console.log('you yo' + user)
      auth.signOut();
      history.push('/')
    }
  }
  return(
    <div className='header'>
      <Link to="/">
        <img
          className='header_amazon_logo'
          src="http://pngimg.com/uploads/amazon/amazon_PNG25.png"/>
      </Link>
        <div className="header_search">
            <input
             className="header_search_input" type='text'/>
            <SearchIcon className="header_search_icon"/>
        </div>
        <div className="header_nav">
            <Link to={!user && "/login"}>
              <div onClick={handleAuthentication}
               className="header_option">
                <span className="header_option_line1">
                Welcome {user ?user.displayName||user.email : 'GUEST'}</span>
                <span className="header_option_line2">
                { user ? (<Link to='/login'><span className='signOut'>Sign Out</span></Link>) : 'Sign In'}</span>
              </div>
            </Link>
            <Link to='orders'>
              <div className="header_option">
                <span className="header_option_line1">
                Returns</span>
                <span className="header_option_line2">
                & Orders</span>
              </div>
            </Link>
            <div className="header_option">
              <span className="header_option_line1">
              Your</span>
              <span className="header_option_line2">
              Prime</span>
            </div>
            <Link to="/Checkout">
              <div className="header_basket_option">
                <ShoppingBasketIcon/>
                <span className="header_busket_count">{basket?.length}</span>
              </div>
            </Link>
          </div>
    </div>
  )
}
export default Header
