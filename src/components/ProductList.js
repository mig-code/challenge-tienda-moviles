import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import Item from './Item';
import '../styles/ProductList.scss';

export default function ProductList() {
  const [searchQuery, setSearchQuery] = useState('');
  const { mobilesData, setBreadcumbName } = useContext(AppContext);
  console.log(mobilesData);
  const products = mobilesData;

  const handleChange = event => {
    setSearchQuery(event.target.value);
  };

  // I use this useEffect to set the breadcum to ""
  
   useEffect(() => {
     setBreadcumbName('');
   }, []);

  return (
    <>
      <div className='search-container'>
        <input
          className='search-placeholder'
          type='text'
          placeholder=''
          value={searchQuery}
          onChange={e => handleChange(e)}
        />

        <div className='search-grid'>
          {products
            .filter(item => {
              return (
                item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.model.toLowerCase().includes(searchQuery.toLowerCase())
              );
            })
            .map(product => (
              <div key={product.id}>
                <Item product={product} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
