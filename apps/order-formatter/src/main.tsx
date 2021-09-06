import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import 'tailwindcss/tailwind.css';
import App from './app/app';
import { ConfigProvider } from './app/states';

ReactDOM.render(
  <StrictMode>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </StrictMode>,
  document.getElementById('root')
);
