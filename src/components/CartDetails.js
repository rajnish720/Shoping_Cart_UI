import React, { useContext, useState } from 'react'
import { context } from './Context'

import '../cssFiles/CartDetails.css'


function CartDetails() {
  const [products, setProductData] = useContext(context);
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('')
  const currUser = JSON.parse(localStorage.getItem('currUser'))


  const placeOrderHandeler = () => {
    let userOrderHistory = JSON.parse(localStorage.getItem('userOrderHistory'));

    if (!userOrderHistory) userOrderHistory = {};
    if (userOrderHistory[currUser.email]) {
      let userOrderItems = userOrderHistory[currUser.email];
      for (let i = 0; i < products.length; i++) {
        if (products[i].count > 0) {
          if (userOrderItems[products[i].title]) {
            userOrderItems[products[i].title] += products[i].count;
          }
          else userOrderItems[products[i].title] = products[i].count;
        }
      }
      userOrderHistory[currUser.email] = userOrderItems;
      localStorage.setItem('userOrderHistory', JSON.stringify(userOrderHistory));
    }
    else {
      let userOrderItems = {};
      for (let i = 0; i < products.length; i++) {
        if (products[i].count > 0) {
          userOrderItems[products[i].title] = products[i].count;
        }
      }
      userOrderHistory[currUser.email] = userOrderItems;
      localStorage.setItem('userOrderHistory', JSON.stringify(userOrderHistory));
    }

    alert('You place order succesfully!!!')

    const defaultProductsDetail = products.map(product => {
      product.count = 0;
      return product;
    })

    setProductData(defaultProductsDetail);
  }

  let history;
  const currUserOrderedHistory = JSON.parse(localStorage.getItem('userOrderHistory'));
  if (!currUserOrderedHistory) history = <h4>You didn't order anything</h4>
  else {
    if (!currUserOrderedHistory[currUser.email]) {
      history = <h4>You didn't order anything</h4>

    }
    else {
      history = Object.keys(currUserOrderedHistory[currUser.email]);
      history = history.map((order, index) => {
        return (<p key={index}>{order} : {currUserOrderedHistory[currUser.email][order]} </p>)
      })
    }
  }

  return (
    <div className='CartDetails'>
      <div className='currProductToOrder'>
        <h4>Your cart details</h4>
        {
          products.map(product => {
            if (product.count > 0) return (<h5 key={product.id}>{product.title} : {product.count}</h5>)
          })
        }

      </div>
      <div className='historyAndAddress'>
        <div>
          <h3>Your order History</h3>
          {
            history
          }
        </div>
        <div>
          <h3>Enter your address</h3>
          <div className='address'>
            <label>Address: </label>
            <input
              type='text'
              placeholder='Enter your address'
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </div>
          <div className='pincode'>
            <label>pincode: </label>
            <input
              type='number'
              placeholder='Enter your pincode'
              value={pincode}
              onChange={e => setPincode(e.target.value)}
            />
          </div>
          <button onClick={placeOrderHandeler}>Place Order</button>
        </div>
      </div>
    </div>
  )
}

export default CartDetails