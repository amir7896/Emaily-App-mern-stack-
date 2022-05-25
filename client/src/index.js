import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThuk from "redux-thunk";

// reducers
import reducers from "./reducers";

import "./index.css";
import App from "./App";
import axios from "axios";
window.axios = axios;
// root app
const root = ReactDOM.createRoot(document.getElementById("root"));
// Store
const store = createStore(reducers, {}, applyMiddleware(reduxThuk));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
