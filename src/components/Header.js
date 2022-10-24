import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.scss';
import cart from '../assets/cart.svg';

export default function Header() {
  return (
    <div className='header'>
      <div className='header__left'>
        <Link to='/'>
          <h1 className='header__title'>Mobile Shop</h1>
        </Link>
        <Link to='/'>
          <p className='header__breadcumbs'>Inicio - </p>
        </Link>
      </div>
      <div className='header__right'>
        <img className='header__cart' src={cart} alt='' />
        <p className='header__cart-count'>3</p>
      </div>
    </div>
  );
}
