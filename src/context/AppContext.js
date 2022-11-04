import React, { useState, createContext, useEffect } from 'react';

export const AppContext = createContext();

const AppProvider = props => {
  console.log('LOAD PROVIDER');
   console.log(process.env.REACT_APP_API_URL);

  const [cartCount, setCartCount] = useState(0);
  const [mobilesData, setMobilesData] = useState([]);
  const [breadcumbName, setBreadcumbName] = useState('');
  const [startCacheTime, setStartCacheTime] = useState(
    localStorage.getItem('Start Cache Time')
  );
  const [dataIsinCache, setDataIsinCache] = useState(false);

  function getMobilesData() {
    if (!dataIsinCache) {
     
      fetch(process.env.REACT_APP_API_URL)
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('Mobiles Data', JSON.stringify(data));
          setMobilesData(JSON.parse(localStorage.getItem('Mobiles Data')));
          localStorage.setItem('Start Cache Time', startCacheTime);
          setDataIsinCache(true);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }

  if ((Date.now() - startCacheTime) / 1000 > 3600) {
    localStorage.setItem('Start Cache Time', startCacheTime);
    setStartCacheTime(Date.now());
    setDataIsinCache(false);
  }

  useEffect(() => {
    if (localStorage.getItem('Mobiles Data')) {
      setMobilesData(JSON.parse(localStorage.getItem('Mobiles Data')));
    } else {
      getMobilesData();
    }
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
