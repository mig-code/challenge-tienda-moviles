import React, { useState, createContext, useEffect } from 'react';

export const AppContext = createContext();

const AppProvider = props => {
  console.log('LOAD PROVIDER');
  const [cartCount, setCartCount] = useState(3);

  return (
    <AppContext.Provider value={{ cartCount, setCartCount }}>
      {props.children}
    </AppContext.Provider>
  );
};
export default AppProvider;
