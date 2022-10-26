import { render} from '@testing-library/react';
import App from './App';
import AppProvider from './context/AppContext';
import { BrowserRouter } from "react-router-dom";


test('renders Header', () => {
  render( 
      <AppProvider>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </AppProvider>
  );
  
    const { getByText } = render();
    const title = getByText(/mobile shop/i);
    expect(title).toBeInTheDocument();
});
