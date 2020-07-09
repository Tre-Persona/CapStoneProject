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
import UserProfile from "./pages/UserProfile"
import UserFavorites from "./pages/UserFavorites"
import UserSettings from "./pages/UserSettings"
import UserActivity from "./pages/UserActivity"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Header from "./Header.js"



const App = (props) => {

  const {user, logged_in, apiKey} = props
  const currentUserId = user.id
  const currentUserName = user.user_name
  console.log(user, user.avatar)
  return (
    <Router>
      <div id="app-container">
      <Header logged_in={props.logged_in} sign_in_route={props.sign_in_route} sign_out_route={props.sign_out_route}
      user_id={currentUserId} 
      />
      
      <Switch>
      {!logged_in &&
            <Route path="/user" render={() => <Redirect to="/" /> } />
          }
          <Route exact path="/" render = { () => < Home apiKey={apiKey} logged_in={logged_in} sign_in_route={props.sign_in_route} user_id={currentUserId}/>}/>
          <Route exact path="/about" render = { () => < About />}/>
          <Route exact path="/contact" render = { () => < Contact />}/>
          <Route exact path="/trails" render = { () => < TrailsIndex apiKey={apiKey} />}/>
          <Route exact path="/trails/:id" render = { (props) => < TrailsProfile {...props} user_id={currentUserId} user_name={currentUserName} logged_in={logged_in} apiKey={apiKey} avatar={user.avatar.url} />}/>
          <Route exact path="/trails/:id/comments"render = { (props) => < CommentIndex user_id={currentUserId} user_name={currentUserName} {...props} />}/>
          <Route exact path="/user/:id" render = { (props) => < UserProfile {...props} user_name={currentUserName} user_id={currentUserId} apiKey={apiKey} avatar={user.avatar.url} />}/>
          <Route exact path="/user/:id/favorites" render = { (props) => < UserFavorites {...props} user_id={currentUserId} apiKey={apiKey} avatar={user.avatar.url}/>}/>
          <Route exact path="/user/:id/settings" render = { (props) => < UserSettings {...props} user_id={currentUserId} avatar={user.avatar.url}/>}/>
          <Route exact path="/user/:id/activity" render = { (props) => < UserActivity {...props} user_id={currentUserId} avatar={user.avatar.url} />}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App
