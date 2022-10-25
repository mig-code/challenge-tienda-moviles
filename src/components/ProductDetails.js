import React, { useEffect, useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import '../styles/ProductDetails.scss';
import PageNotFound from './PageNotFound';

export default function DetailsView(props) {
  const { mobileId } = useParams();
  const [mobileData, setMobileData] = useState(null);
  const { cartCount, setCartCount, setBreadcumbName } = useContext(AppContext);
  const [userColor, setUserColor] = useState(1);
  const [userStorage, setUserStorage] = useState(1);

  function handleColor(code) {
    if (code === 1000) {
      setUserColor(1);
    }
    if (code === 1001) {
      setUserColor(2);
    }
    if (code === 1002) {
      setUserColor(3);
    }
    if (code === 1003) {
      setUserColor(4);
    }
    console.log(userColor);
  }
  function handleStorage(code) {
    if (code === 2000) {
      setUserStorage(1);
    }
    if (code === 2001) {
      setUserStorage(2);
    }
    if (code === 2002) {
      setUserStorage(3);
    }
    if (code === 2003) {
      setUserStorage(4);
    }

  }

  const addItems = async () => {
    const formData = {
      id: mobileId,
      colorCode: userColor,
      storageCode: userStorage,
    };

    fetch('https://front-test-api.herokuapp.com/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify(formData),
    })
      .then(response => response.text())
      .then(result => {
        console.log(formData);
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
      })
      .catch(error => {
        console.error('Error:', error);
        console.log('HERE');
      });
  }

  useEffect(() => {
    getMobileData();
  }, [mobileId]);

  return (
    <>
      {!mobileData || mobileData.message ? (
        <div className='details-container'>
          {mobileData && <PageNotFound />}
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
              Marca: {mobileData.brand}{' '}
            </div>

            <p className='details-right__price'> PRECIO:{mobileData.price} €</p>
            <p className='details-right__feature'> CPU: {mobileData.cpu}</p>
            <p className='details-right__feature'> RAM: {mobileData.ram}</p>
            <p className='details-right__feature'> OS: {mobileData.os}</p>
            <p className='details-right__feature'>
              Resolución: {mobileData.displayResolution}
            </p>
            <p className='details-right__feature'>
              Batería: {mobileData.battery}
            </p>
            <p className='details-right__feature'>
              Cámara Principal: {mobileData.primaryCamera[0]}
            </p>
            <p className='details-right__feature'>
              Cámara Secundaria: {mobileData.secondaryCmera}
            </p>
            <p className='details-right__feature'>
              Tamaño: {mobileData.dimentions}
            </p>
            <p className='details-right__feature'>
              Peso: {mobileData.weight} g
            </p>

            <div className='actions'>
              <h1>ACCIONES</h1>
              <div className='actions__colors-box'>
                {mobileData.options.colors.map(item => (
                  <div
                    onClick={() => handleColor(item.code)}
                    key={item.code}
                    className='actions__color-option'
                  >
                    {item.name}
                  </div>
                ))}
              </div>
              <div className='actions__storage-box'>
                {mobileData.options.storages.map(item => (
                  <div
                    onClick={() => handleStorage(item.code)}
                    key={item.code}
                    className='actions__storage-option'
                  >
                    {item.name}
                  </div>
                ))}
              </div>
              <Link to={`/`}>
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
