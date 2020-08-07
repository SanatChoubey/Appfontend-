import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter, Route} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import AddTransction from './container/addTransaction';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route exact path="/" >
        <App/>
      </Route>
      <Route exact path="/add" >
        <AddTransction/>
      </Route>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
