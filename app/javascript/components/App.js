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
import TrailComment from "./pages/TrailComment"
import TrailCommentEdit from "./pages/TrailCommentEdit"
import TrailsSearch from "./pages/TrailsSearch"
import UserProfile from "./pages/UserProfile"
import UserFavorites from "./pages/UserFavorites"
import UserSettings from "./pages/UserSettings"
import UserActivity from "./pages/UserActivity"
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
            <Route exact path="/trails/:id/comment" render = { () => < TrailComment />}/>
            <Route exact path="/trails/:id/comment/edit" render = { () => < TrailCommentEdit />}/>
            <Route exact path="/trails/search" render = { () => < TrailsSearch />}/>
            <Route exact path="/user/:id" render = { () => < UserProfile />}/>
            <Route exact path="/user/:id/favorites" render = { () => < UserFavorites />}/>
            <Route exact path="/user/:id/settings" render = { () => < UserSettings />}/>
            <Route exact path="/user/:id/activity" render = { () => < UserActivity />}/>
          </Switch>
      </Router>
    );
}

export default App
