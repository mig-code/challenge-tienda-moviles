import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HeaderComponent.scss';
import { AppContext } from '../context/AppContext';

export default function Header() {
  const { cartCount, breadcumbName } = React.useContext(AppContext);

  return (
    <div className='header'>
      <div className='header__left'>
        <Link to='/'>
          <h1 className='header__title'>Mobile Shop</h1>
        </Link>

        <p className='header__breadcumbs'>
          <Link to='/'>Inicio</Link> <span> {breadcumbName}</span>{' '}
        </p>
      </div>
      <div className='header__right'>
        {cartCount > 0 ? (
          <p className='header__cart-count'> Total: {cartCount}</p>
        ) : null}
      </div>
    </div>
  );
}
