import React from "react"
import { Switch, Route } from "react-router-dom"
import indexRoutes from "./routes/index"

class App extends React.PureComponent {
  render() {
    return (
      <Switch>
        {indexRoutes.map(prop => {
          return (
            <Route
              path={prop.path}
              component={prop.component}
              key={prop.path}
            />
          )
        })}
      </Switch>
    )
  }
}

export default App
