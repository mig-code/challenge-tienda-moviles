import './styles/App.scss';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/details/:mobileId" element={<ProductDetails />} />
      </Routes>

    </div>
  );
}

export default App;
