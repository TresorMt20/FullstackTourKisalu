import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './app/layout/styles.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { store, StoreContext } from './app/stores/store';
import 'react-calendar/dist/Calendar.css';

ReactDOM.render(
    <StoreContext.Provider value={store}>
    <BrowserRouter>
    <App/>
    </BrowserRouter>

  </StoreContext.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();