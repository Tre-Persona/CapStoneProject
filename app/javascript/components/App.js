import React, { useState } from "react"
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
import CommentIndex from "./pages/CommentIndex"
import TrailCommentEdit from "./pages/TrailCommentEdit"
import TrailsSearch from "./pages/TrailsSearch"
import UserProfile from "./pages/UserProfile"
import UserFavorites from "./pages/UserFavorites"
import UserSettings from "./pages/UserSettings"
import UserActivity from "./pages/UserActivity"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Header from "./Header.js"
import MapBox from "./MapBox.js"

const App = (props) => {

 const [currentUserName, setCurrentUserName]= useState(props.user.user_name)
 const [currentUserId, setCurrentUserId]= useState(props.user.id)
    return (
      <Router>
        <Header logged_in={props.logged_in} sign_in_route={props.sign_in_route} sign_out_route={props.sign_out_route}
        user_id={currentUserId}
        />
        <MapBox />
          <Switch>
            <Route exact path="/" render = { () => < Home />}/>
            <Route exact path="/about" render = { () => < About />}/>
            <Route exact path="/contact" render = { () => < Contact />}/>
            <Route exact path="/trails" render = { (props) => < TrailsIndex {...props} />}/>
            <Route exact path="/trails/:id" render = { (props) => < TrailsProfile {...props} />}/>
            <Route exact path="/trails/:id/comments"render = { (props) => < CommentIndex user_id={currentUserId} {...props} />}/>
            <Route exact path="/trails/:id/comment/edit" render = { () => < TrailCommentEdit />}/>
            <Route exact path="/trails/search" render = { () => < TrailsSearch />}/>
            <Route exact path="/user/:id" render = { (props) => < UserProfile {...props} user_name={currentUserName} />}/>
            <Route exact path="/user/:id/favorites" render = { () => < UserFavorites />}/>
            <Route exact path="/user/:id/settings" render = { (props) => < UserSettings {...props}/>}/>
            <Route exact path="/user/:id/activity" render = { () => < UserActivity />}/>
          </Switch>
      </Router>
    );
}

export default App
