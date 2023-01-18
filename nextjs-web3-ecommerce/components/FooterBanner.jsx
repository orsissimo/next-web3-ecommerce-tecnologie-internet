import React from 'react';

import { urlFor } from '../lib/client';

const FooterBanner = ({ footerBanner: { discount, largeText1, largeText2, saleTime, smallText, midText, desc, product, buttonText, image } }) => {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText2}</h3>
          <h3>{saleTime}</h3>
          <p>DON&apos;T MISS OUT.</p>
        </div>
        <div className="right">
          <p></p>
          <h3>Web 3.0</h3>
          <p>Ecommerce</p>
          <a href="https://florasolutions.it" target="_blank" rel="noopener noreferrer">
            <button type="button">Powered by Flora Solutions</button>
          </a>
        </div>

        <img 
          src={urlFor(image)} className="footer-banner-image"
        />
      </div>
    </div>
  )
}

export default FooterBanner