import React from 'react'
import Home from './Home';

function Logout() {
    localStorage.removeItem('currUser');
    
  return (
    <div>Thank You to visit me</div>
  )
}

export default Logout