import React, { useState, createContext, useEffect } from 'react';

export const AppContext = createContext();

const AppProvider = props => {
  console.log('LOAD PROVIDER');

  const [cartCount, setCartCount] = useState(0);
  const [mobilesData, setMobilesData] = useState([]);
  const [breadcumbName, setBreadcumbName] = useState('');
  const [startCacheTime, setStartCacheTime] = useState(Date.now());
  const [dataIsinCache, setDataIsinCache] = useState(false);

  function getMobilesData() {
    if (!dataIsinCache) {
      fetch('https://front-test-api.herokuapp.com/api/product')
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('Mobiles Data', JSON.stringify(data));
          setMobilesData(JSON.parse(localStorage.getItem('Mobiles Data')));
          setDataIsinCache(true);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }

  if ((Date.now() - startCacheTime) / 1000 > 3600) {
    setStartCacheTime(Date.now());
    setDataIsinCache(false);
  }

  useEffect(() => {
    getMobilesData();
  }, [dataIsinCache]);

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