import React from 'react';

import './logo.css'
import logo from './logo.png'

function Logo(props) {
  return (
    <div className='logo-container'>
      <img className='logo-img' src={logo} alt="logo"/>
    </div>
  );
}

export default Logo;