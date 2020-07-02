import React, { useState, useEffect } from "react"
import CommentEdit from './comments/CommentEdit'
import CommentNew from './comments/CommentNew'
import CommentIndex from './comments/CommentIndex'
import { Container, Media, Button, Form, FormGroup, Label, Input, FormText, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

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
  const handleSubmit = (e) =>{
    e.preventDefault()
    if (commentEntry === "") return
    else addToComments()
  }

  // Fetch request to POST comment
  const addToComments = () => {
    fetch("/comments", {
      // JSON needs to include comment string, trail id, and user name
      body: JSON.stringify({post: commentEntry, trail_id: props.match.params.id, user_name: props.user_name}),
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
  const handleEditClick = id => {
    // Check that the particular comment's ID is not in the "editArray" and editor mode is not open elsewhere
    if (!editArray.includes(id) && !editorOn) {
      // Set editor mode to true to prevent other editors from opening
      setEditorOn(true)
      // Add comment ID to array
      setEditArray([...editArray, id])
      // Fetch the comment text to display in the edit form
      getCommentBody(id)
    } // 
      else if (editArray.includes(id) && editorOn) {
      setEditorOn(false)
      let temp = editArray.filter(num=> num !== id)
      setEditArray(temp)
      setCommentEditEntry("")
    }
  }

  //
  async function getCommentBody(id) {
    try {
      let response = await fetch(`/comments/${id}/edit`)
      let data = await response.json()
      if (response.ok) {
        setCommentEditEntry(data.post)
      }
    } catch (err) {
      console.log(err)
    }
  }

  // Set state of commentEditEntry to 
  const handleChangeEdit = e => {
    e.preventDefault()
    setCommentEditEntry(e.target.value)
  }

  //
  const updateComment = (id, trailId) => {
    fetch(`/comments/${id}`, {
      body: JSON.stringify({post: commentEditEntry, trail_id: trailId, user_name: props.user_name}),
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
      //GET data from the backend
      let response = await fetch('/comments')
      
        let data = await response.json()
        //all good?
        if(response.status === 200) {
          //check the console to make sure we have all the trails
          console.log("data", data)
          let sortedData = data.filter(trail => {
            return trail.trail_id == props.match.params.id
          })
          //populate the newTrails state array with data
          setComments(sortedData)
          console.log("sortedData", sortedData)
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
      <CommentNew />

      <FormGroup>
        <Label htmlFor="commentEntry">Add Comment</Label>
        <Input type="textarea" name="commentEntry" id="commentEntry" value={ commentEntry } onChange={ handleChange }/>
      </FormGroup>
      <Button onClick={ handleSubmit }>Submit</Button>

      <ListGroup>
    { comments.map((comment, index)=> {
      let editable = false
        if(props.user_id === comment.user_id) editable = true
        let date = comment.updated_at.substring(0,10)
      return(
        <>
          <ListGroupItem>
            {editArray.includes(comment.id) &&
              <FormGroup>
                <Label htmlFor="commentEditEntry"><strong>Edit Comment</strong></Label>
                <Input type="textarea" name="commentEditEntry" id="commentEditEntry" value={ commentEditEntry } onChange={ handleChangeEdit }/>
                <Button onClick={ () => updateComment(comment.id,comment.trail_id) }>Update</Button>
              </FormGroup>
            }
            
              {!editArray.includes(comment.id) &&
                <>
                  <ListGroupItemText>
                    <strong>{comment.user_name}</strong> <i>{ date }</i>
                  </ListGroupItemText>
                  <ListGroupItemText>
                    { comment.post }
                  </ListGroupItemText>
                </>
              }
              
              { editable &&
                <>
                  <Button onClick={ () => handleEditClick(comment.id) }>
                    {editArray.includes(comment.id) && "Cancel"}
                    {!editArray.includes(comment.id) && "Edit"}
                  </Button>
                  <Button alt="delete comment" color="danger" onClick={ () => deleteComment(comment.id) }>Delete</Button>
                </>
              }
            </ListGroupItem>
        </>
      )
    })}
    </ListGroup>
  </Container>
  )
}

export default Comments