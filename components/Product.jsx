import React from "react";
import Link from "next/link";

import { urlFor } from "../lib/client";
import { tokenToCSSVar } from "@chakra-ui/react";

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">
            {price + " "}
            <img src={"../polygon-token.png"} width={16} height={16} />
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
