import React, { useState, createContext, useEffect } from 'react';

export const AppContext = createContext();

const AppProvider = props => {
  console.log('LOAD PROVIDER');

 
  const [cartCount, setCartCount] = useState(0);
  const [mobilesData, setMobilesData] = useState([]);
  const [breadcumbName, setBreadcumbName] = useState('Movil');

  function getMobilesData() {
    fetch('https://front-test-api.herokuapp.com/api/product')
      .then(response => response.json())
      .then(data => {
        setMobilesData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    console.log('LOAD PROVIDER one time');
    getMobilesData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        cartCount,
        setCartCount,
        mobilesData,
        breadcumbName,
        setBreadcumbName,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
export default AppProvider;
