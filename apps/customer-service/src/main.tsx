import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import 'tailwindcss/tailwind.css';
import App from './app/app';
import { CategoriesProvider, ItemsProvider } from './app/states';

ReactDOM.render(
  <StrictMode>
    <CategoriesProvider>
      <ItemsProvider>
        <App />
      </ItemsProvider>
    </CategoriesProvider>
  </StrictMode>,
  document.getElementById('root'),
);
