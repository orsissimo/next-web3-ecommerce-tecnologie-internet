import React from 'react';
import Link from 'next/link';
import { AiOutlineLogin, AiOutlineShopping } from 'react-icons/ai'
import { useMoralis } from "react-moralis";

import { Cart } from '.';
import { useStateContext} from '../context/StateContext';
import { Authenticate } from './moralis/Authenticate';
import { Connect } from './moralis/Connect';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
      <div className="logo">
          <Link href="/">
            <img src="./logo.png" className='logo-image'/>
          </Link>
          <div className="navbar-text">
            <Link href="/" className='navbar-text'><p className='logo-p'>Florazon</p></Link>
          </div>
          {/* <div className="navbar-text">
            <Link href="https://dexscreener.com/ethereum/" className='navbar-text'><p className='logo-p'>Live Chart</p></Link>
          </div> */}
      </div>

      <div className='navbar-container mr10 web3buttons'>
        <div className='mr3'>
          <Authenticate />
        </div>
        <div className='mr3'>
          <Connect />
        </div>

        <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
          <AiOutlineShopping />
          <span className="cart-item-qty">{totalQuantities}</span>
        </button>
      </div>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar