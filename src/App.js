import React from "react"
import { Switch, Route } from "react-router-dom"
import indexRoutes from "./routes/index"
import PrivateRoutes from "./routes/PrivateRoutes"

class App extends React.PureComponent {
  render() {
    return (
      <Switch>
        {indexRoutes.map(prop => {
          if (prop.type === "private") {
            return (
              <PrivateRoutes
                path={prop.path}
                component={prop.component}
                key={prop.path}
              />
            )
          }

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
