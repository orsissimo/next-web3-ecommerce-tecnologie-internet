import React from 'react';
import {AiOutlineTwitter} from 'react-icons/ai';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2023 Flora Solutions. All rights reserved.</p>
      <p className="icons">
        <Link href="http://t.me/">
          <img src="./telegram-icon.png" className='telegram-icon'></img>
        </Link>
        <Link href="http://twitter.com/">
          <AiOutlineTwitter />
        </Link>
      </p>
    </div>
  )
}

export default Footer