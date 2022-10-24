import './styles/App.scss';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';


function App() {
  return (
    <div className='App'>
      <Header />
      <ProductList />
      <ProductDetails />

    </div>
  );
}

export default App;
