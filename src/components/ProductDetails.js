import React, { useEffect, useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import '../styles/ProductDetails.scss';

export default function DetailsView(props) {
  const { mobileId } = useParams();
  const [mobileData, setMobileData] = useState(null);
  const { cartCount, setCartCount, setBreadcumbName } = useContext(AppContext);

  const addItems = async () => {
    const formData = {
      id: 'cGjFJlmqNPIwU59AOcY8H',
      colorCode: 1,
      storageCode: 1,
    };

    fetch('https://front-test-api.herokuapp.com/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify(formData),
    })
      .then(response => response.text())
      .then(result => {
        console.log('Success:', result);
        localStorage.setItem('Cart Count', parseInt(cartCount) + 1);
        setCartCount(localStorage.getItem('Cart Count'));
        console.log(localStorage.getItem('Cart Count'));
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  function getMobileData() {
    fetch(`https://front-test-api.herokuapp.com/api/product/${mobileId}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setMobileData(data);
        setBreadcumbName(' - ' + data.model);
      });
  }

  useEffect(() => {
    getMobileData();
  }, [mobileId]);

  return (
    <>
      {!mobileData ? (
        <div className='details-container'>
          <h1>LOADING</h1>
        </div>
      ) : (
        <div className='details-container'>
          <div className='details-left'>
            <img
              className='details-left__image'
              src={mobileData.imgUrl}
              alt={mobileData.model}
            />
          </div>
          <div className='details-right'>
            <h1 className='details-right__model'>{mobileData.model} </h1>
            <div className='details-right__brand'>
              {' '}
              Marca: {mobileData.brand}{' '}
            </div>

            <p className='details-right__price'> PRECIO:{mobileData.price} €</p>
            <p className='details-right__feature'> CPU: {mobileData.cpu}</p>
            <p className='details-right__feature'> RAM: {mobileData.ram}</p>
            <p className='details-right__feature'> OS: {mobileData.os}</p>
            <p className='details-right__feature'>
              {' '}
              Resolución: {mobileData.displayResolution}
            </p>
            <p className='details-right__feature'>
              {' '}
              Batería: {mobileData.battery}
            </p>
            <p className='details-right__feature'>
              {' '}
              Cámara Principal: {mobileData.primaryCamera[0]}
            </p>
            <p className='details-right__feature'>
              {' '}
              Cámara Secundaria: {mobileData.secondaryCmera}
            </p>
            <p className='details-right__feature'>
              {' '}
              Tamaño: {mobileData.dimentions}
            </p>
            <p className='details-right__feature'>
              {' '}
              Peso: {mobileData.weight} g
            </p>

            <div className='details-actions'>
              <h1>ACCIONES</h1>
              <Link to={`/`}>
                <div className='details-right__colors'>
                  {' '}
                  colors: {mobileData.colors.length}{' '}
                </div>
                <button className='details-right__button-back'>VOLVER</button>
              </Link>
              <button onClick={addItems}>AÑADIR AL CARRO</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
