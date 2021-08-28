import ClipboardJS from 'clipboard';
import 'normalize.css/normalize.css';
import { StrictMode, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'siimple/dist/siimple.min.css';
import App from './app/app';

const clipboard = new ClipboardJS('.siimple-list-item');

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
