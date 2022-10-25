import './styles/App.scss';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import PageNotFound from './components/PageNotFound';
import { Routes, Route, Navigate } from 'react-router-dom';


function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<ProductList />} />
        <Route path='/details/:mobileId' element={<ProductDetails />} />
        <Route path='*' element={<Navigate replace to='/' />} />
      </Routes>
    </div>
  );
}

export default App;
