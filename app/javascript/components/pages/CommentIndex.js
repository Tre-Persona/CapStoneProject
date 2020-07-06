import React, { useState, useEffect } from "react"
import CommentEdit from '../partials/commentsPartials/CommentEdit'
import CommentNew from '../partials/commentsPartials/CommentNew'
import CommentList from '../partials/commentsPartials/CommentList'
import { Container, Media, Button, Form, FormGroup, Label, Input, FormText, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'

const Comments = (props) => {
  // State for a new comment (written in the comment form)
  const [commentEntry, setCommentEntry] = useState("")
  // State for existing comment within the editor form
  const [commentEditEntry, setCommentEditEntry] = useState("")
  // Array holding the ID of the comment that is in editor mode. ID gets removed after leaving edidtor mode
  const [editArray, setEditArray] = useState([])
  // Allows only one comment to be in editor mode at a time
  const [editorOn, setEditorOn] = useState(false)
  // Array of comment objects fetched from the API
  const [comments, setComments] = useState([])

  // Fetch all trail comments upon render
  useEffect(() => {
    getComments()},[])

  // ---------- CODE FOR TYPING/POSTING NEW COMMENT ----------
  
  // Set state of commentEntry to whatever the form input is 
  const handleChange = (e) =>{
    setCommentEntry(e.target.value)
  }

  // Only call POST function if comment isn't blank
  const handleSubmit = () =>{
    if (commentEntry === "") return
    else addToComments()
  }

  // Fetch request to POST comment
  const addToComments = () => {
    fetch("/comments", {
      // JSON needs to include comment string, trail id, and user name
      body: JSON.stringify({post: commentEntry, trail_id: props.trail_id, user_name: props.user_name, trail_name: props.trail_name}),
      headers:{
        "Content-Type": "application/json"
      },
      method: "POST"
    })
    .then(response => {
      if (response.ok) {
        // If post successful, clear new comment form
        setCommentEntry("")
        // Refetch comments upon adding new comment
        getComments()
      }
    })
    .catch(error => {
      console.log("error:",error)
    })
  }

  // ---------- CODE FOR EDITING/UPDATING EXISTING COMMENT ----------

  // Upon clicking the Edit button, do the following:
  const handleEditClick = (id,body) => {
    // Check that the particular comment's ID is not in the "editArray" and editor mode is not open elsewhere
    if (!editArray.includes(id) && !editorOn) {
      // Set editor mode to true to prevent other editors from opening
      setEditorOn(true)
      // Add comment ID to array
      setEditArray([...editArray, id])
      // Set the comment edit entry to the comment text
      setCommentEditEntry(body)
    } // 
      else if (editArray.includes(id) && editorOn) {
      setEditorOn(false)
      let temp = editArray.filter(num=> num !== id)
      setEditArray(temp)
      setCommentEditEntry("")
    }
  }

  // Set state of commentEditEntry to 
  const handleChangeEdit = e => {
    setCommentEditEntry(e.target.value)
  }

  //
  const updateComment = (id, trailId) => {
    fetch(`/comments/${id}`, {
      body: JSON.stringify({post: commentEditEntry, trail_id: trailId, user_name: props.user_name, trail_name: props.trail_name}),
      headers:{
        "Content-Type": "application/json"
      },
      method: "PATCH"
    })
    .then(response => {
      if (response.ok) {
        let temp = editArray.filter(num=> num !== id)
        setEditArray(temp)
        setEditorOn(false)
        getComments()
      }
    })
    .catch(error => {
      console.log("error:",error)
    })
  }

  // ---------- CODE FOR FETCHIING ALL TRAIL COMMENTS ----------

  async function getComments() {
    try {
      let response = await fetch('/comments')
      let data = await response.json()
      
      if(response.ok) {
        //check the console to make sure we have all the trails
        let sortedData = data.filter(trail => {
          return trail.trail_id == props.trail_id
        })
        .sort((a,b)=>{
          if (a.updated_at === b.updated_at) return 0
          else if (a.updated_at > b.updated_at) return -1
          else return 1
        })
        //populate the newTrails state array with data
        setComments(sortedData)
        console.log("sorted comments data:", sortedData)
      }
    } catch (err) {
      console.log(err)
    }
  }
  
  // ---------- CODE FOR DELETING COMMENT ----------

  const deleteComment = (id) => {
    fetch(`/comments/${id}`, {
      headers:{
        "Content-Type": "application/json"
      },
      method: "DELETE"
    })
    .then(response => {
      if (response.ok) {
        getComments()
      }
    })
  }

  return ( 
  
  <Container>
      {props.loggedIn &&
        <CommentNew 
          handleSubmit={handleSubmit}
          commentEntry={commentEntry}
          handleChange={handleChange}
        />
      }
      <CommentList 
        comments={comments}
        commentEditEntry={commentEditEntry}
        editArray={editArray}
        user_id={props.user_id}
        updateComment={updateComment}
        handleChangeEdit={handleChangeEdit}
        handleEditClick={handleEditClick}
        deleteComment={deleteComment}
      />
  </Container>
  )
}

export default Comments