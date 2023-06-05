import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import store from './store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import store from './comments/app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>
);
