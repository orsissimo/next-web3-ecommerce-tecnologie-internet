import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo hero-banner-collection-mobile">{heroBanner.smallText}</p>
        <h3 className='hero-banner-collection-mobile'>{heroBanner.midText}</h3>
        <h1 className='hero-banner-collection-mobile'>{heroBanner.largeText1}</h1>
        <img src={urlFor(heroBanner.image)} alt="headphones" className="hero-banner-image" />

        <div>
          {/*
          <Link href={`/product/${heroBanner.product}`}>
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
          */}
          <div className='hero-btn-space'>
            <a href="https://florasolutions.it" target="_blank" rel="noopener noreferrer">
              <button type="button">Powered by Flora Solutions</button>
            </a>
          </div>
          <div className="desc">
            <h5>Roadmap:</h5>
            <p>Integrated NFT Minting</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner