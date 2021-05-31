
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { ContextProvider } from './Context';
import {BrowserRouter} from 'react-router-dom'
import './styles.css';

ReactDOM.render(
  <BrowserRouter>
  <ContextProvider>
    <App />
  </ContextProvider>
  </BrowserRouter>
  ,
  document.getElementById('root'),
);