import React from 'react';
import './Home.css';
import Product from './Product';

function Home() {
  return (
    <div className = "home" >
      <div className = "home_container" >
        <img className = "home_image"
          src = "https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" />
        <div className="home_row">
          <Product
            id='1001'
            title='Elite Series 2 Controller - Black'
            price={152.79}
            rating={5}
            image='https://images-na.ssl-images-amazon.com/images/I/41axyW2jpfL._AC_US218_.jpg'
          />
          <Product
            id='2222'
            title='Apple AirPods with Charging Case (Wired)'
            price={113.52}
            rating={4}
            image='https://images-na.ssl-images-amazon.com/images/I/31jBnwWr91L._AC_US218_.jpg'
          />
        </div>

        <div className="home_row">
          <Product
            id='3333'
            title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
            price={239.99}
            rating={5}
            image='https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg'
          />
          <Product
            id='4444'
            title='Amazon Echo (3rd generation) |Smart speaker with Alexa,Charcoal Fabric'
            price={98.99}
            rating={5}
            image='https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$'
          />
          <Product
            id='5555'
            title='New Apple iPad Pro (12.9-inch,Wi-Fi,128GB)-Silver (4th Generation)'
            price={598.99}
            rating={5}
            image='https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX285_.jpg'
          />
        </div>

        <div className="home_row">
          <Product
            id='6666'
            title="Samsung LC46RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
            price={1094.98}
            rating={4}
            image='https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg'
          />
        </div>

      </div>
     </div>
  )
}
export default Home;
