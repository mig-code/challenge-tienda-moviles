import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.scss';
import cart from '../assets/cart.svg';
import { AppContext } from '../context/AppContext';

export default function Header() {
    const { cartCount } = React.useContext(AppContext);
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
        <p className='header__cart-count'>{cartCount}</p>
      </div>
    </div>
  );
}
