import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from 'react-router-dom'
import Home from "./pages/Home"
import TrailsIndex from "./pages/TrailsIndex"
import TrailsProfile from "./pages/TrailsProfile"
import UserProfile from "./pages/UserProfile"
import About from "./pages/About"
import Contact from "./pages/Contact"

const App = () => {
 
    return (
      <Router>
        <h1>Welcome to happytrails!</h1>
          <Switch>
            <Route exact path="/" render = { () => < Home />}/>
            <Route exact path="/about" render = { () => < About />}/>
            <Route exact path="/contact" render = { () => < Contact />}/>
            <Route exact path="/trails" render = { () => < TrailsIndex />}/>
            <Route exact path="/trails/:id" render = { () => < TrailsProfile />}/>
            <Route exact path="/user/:id" render = { () => < UserProfile />}/>
          </Switch>
      </Router>
    );
}

export default App
