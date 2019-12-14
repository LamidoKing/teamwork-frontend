import React from "react"
import ReactDOM from "react-dom"
import { Router } from "react-router-dom"
import { Provider } from "react-redux"
import { history } from "./Utils"
import "./Style/index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import createStore from "./redux/store/createStore"

const initialState = window._INITIAL_STATE_

const store = createStore(initialState)

const hist = history

ReactDOM.render(
  <Provider store={store}>
    <Router basename={process.env.PUBLIC_URL} history={hist}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
)

serviceWorker.unregister()
