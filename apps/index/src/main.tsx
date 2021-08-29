import 'normalize.css/normalize.css';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import 'siimple/dist/siimple.min.css';
import App from './app/app';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
