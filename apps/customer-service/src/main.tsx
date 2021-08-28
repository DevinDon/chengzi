import ClipboardJS from 'clipboard';
import 'normalize.css/normalize.css';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'siimple/dist/siimple.min.css';
import App from './app/app';
import { CategoriesProvider, ItemsProvider } from './app/states';

const clipboard = new ClipboardJS('.siimple-list-item');

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <CategoriesProvider>
        <ItemsProvider>
          <App />,
        </ItemsProvider>
      </CategoriesProvider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
