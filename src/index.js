import React from "react"
import ReactDOM from "react-dom"
import { Router } from "react-router-dom"
import { createBrowserHistory } from "history"
import { Provider } from "react-redux"
import "./Style/index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import createStore from "./redux/store/createStore"

const initialState = window._INITIAL_STATE_

const store = createStore(initialState)

const hist = createBrowserHistory()

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
)

serviceWorker.unregister()
