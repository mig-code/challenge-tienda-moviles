import React, { useState, createContext, useEffect } from 'react';

export const AppContext = createContext();

const AppProvider = props => {
  console.log('LOAD PROVIDER');
  const [cartCount, setCartCount] = useState(3);
  const [mobilesData, setMobilesData] = useState([]);

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
    <AppContext.Provider value={{ cartCount, setCartCount,mobilesData }}>
      {props.children}
    </AppContext.Provider>
  );
};
export default AppProvider;
