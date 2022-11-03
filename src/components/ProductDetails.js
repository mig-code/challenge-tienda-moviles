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
    setUserColor(Number(String(code).slice(-1)) + 1);
  }
  function handleStorage(code) {
    setUserStorage(Number(String(code).slice(-1)) + 1);
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

  function getMobileDetails() {
   
    fetch(process.env.REACT_APP_API_PRODUCTS_DETAILS + mobileId)
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
    getMobileDetails();
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
            <div className='details-right__properties-box'>
              <h1 className='details-right__model'>{mobileData.model} </h1>
              <div className='details-right__feature'>
                Marca:
                <span className='details-right--textmodifier'>
                  {mobileData.brand}
                </span>
              </div>

              <p className='details-right__feature'>
                PRECIO:
                <span className='details-right--textmodifier'>
                  {mobileData.price} €
                </span>
              </p>
              <p className='details-right__feature'>
                RAM:
                <span className='details-right--textmodifier'>
                  {mobileData.ram}
                </span>
              </p>
              <p className='details-right__feature'>
                OS:
                <span className='details-right--textmodifier'>
                  {mobileData.os} €
                </span>
              </p>
              <p className='details-right__feature'>
                Resolución:
                <span className='details-right--textmodifier'>
                  {mobileData.displayResolution} 
                </span>
              </p>
              <p className='details-right__feature'>
                Batería:
                <span className='details-right--textmodifier'>
                  {mobileData.battery}
                </span>
              </p>
              <p className='details-right__feature'>
                Cámara Principal:
                <span className='details-right--textmodifier'>
                  {mobileData.primaryCamera[0]}
                </span>
              </p>
              <p className='details-right__feature'>
                Cámara Secundaria:
                <span className='details-right--textmodifier'>
                  {mobileData.secondaryCmera}
                </span>
              </p>
              <p className='details-right__feature'>
                Tamaño:
                <span className='details-right--textmodifier'>
                  {mobileData.dimentions}
                </span>
              </p>
              <p className='details-right__feature'>
                Peso:
                <span className='details-right--textmodifier'>
                  {mobileData.weight} g
                </span>
              </p>
            </div>

            <div className='actions'>
              <div className='actions__colors-box'>
                {mobileData.options.colors.map((item, index) => (
                  <div
                    onClick={() => handleColor(item.code)}
                    key={item.code}
                    className={
                      userColor === index + 1
                        ? 'actions__color-option isSelected'
                        : 'actions__color-option'
                    }
                  >
                    {item.name}
                  </div>
                ))}
              </div>
              <div className='actions__storage-box'>
                {mobileData.options.storages.map((item, index) => (
                  <div
                    onClick={() => handleStorage(item.code)}
                    key={item.code}
                    className={
                      userStorage === index + 1
                        ? 'actions__color-option isSelected'
                        : 'actions__color-option'
                    }
                  >
                    {item.name}
                  </div>
                ))}
              </div>
              <div className='actions__buttons-box'>
                <Link to={`/`}>
                  <button className='actions__button actions__button--back'>
                    VOLVER
                  </button>
                </Link>
                <button
                  className='actions__button actions__button--add'
                  onClick={addItems}
                >
                  AÑADIR AL CARRO
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
