import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './Redux/store/configureStore';
const cacheStore = window.localStorage.getItem('store') || {};
const store = configureStore(cacheStore);


const startApp = () => {
  ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
 document.getElementById('root'));
}

if(!window.cordova) {
  startApp();
} else {
  document.addEventListener('deviceready', startApp, false);
}
