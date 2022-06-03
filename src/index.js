import React from 'react'
import {createRoot} from 'react-dom/client'

import './assets/css/global.css'
import App from "./App";
import {Provider} from "react-redux";
import store from './redux/store'

/*
  ReactDOM.render is no longer supported in React 18. Use createRoot instead.
  Until you switch to the new API, your app will behave as if it’s running React 17.
  Learn more: https://reactjs.org/link/switch-to-createroot
*/
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
  <App/>
  </Provider>
);

/*
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
*/


