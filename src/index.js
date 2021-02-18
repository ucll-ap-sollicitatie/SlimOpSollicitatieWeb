import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
//import store from './redux/store/store';
import App from './App.js'
import reportWebVitals from './reportWebVitals';
import {createStore} from 'redux'
import userApp from './redux/store/reducers/rootReducer'
import "bootstrap/dist/css/bootstrap.css";


const store = createStore(userApp);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
