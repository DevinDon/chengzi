import ClipboardJS from 'clipboard';
import 'normalize.css/normalize.css';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import 'siimple/dist/siimple.min.css';
import App from './app/app';
import { CategoriesProvider, ItemsProvider } from './app/states';

new ClipboardJS('.copy-text');

ReactDOM.render(
  <StrictMode>
    <CategoriesProvider>
      <ItemsProvider>
        <App />,
      </ItemsProvider>
    </CategoriesProvider>
  </StrictMode>,
  document.getElementById('root')
);
