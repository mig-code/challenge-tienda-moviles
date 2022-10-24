import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Item.scss';

export default function Item(props) {
  const { product } = props;
  return (
    <Link to={`/details/`}>
      <div className='mobile-box'>
        <div>
          <img
            className='mobile-box__image'
            src={product.imgUrl}
            alt={product.model}
          />
        </div>

        <div>
          <p className='mobile-box__brand'>{product.brand} </p>
          <p className='mobile-box__model'> {product.model}</p>
        </div>
        <p className='mobile-box__price'>{product.price} €</p>
      </div>
    </Link>
  );
}
