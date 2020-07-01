import React, { useState, useEffect } from "react"
import { Media, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const CommentIndex = (props) => {
  const [commentEntry, setCommentEntry]= useState("")
  const [comments, setComments]=useState([])
  const [success, setSuccess ]=useState(false)
  const [error, setError ]=useState(false)

  useEffect(() => {
    getComments()},[])

  const handleChange = (e) =>{
    setCommentEntry(
    e.target.value
    )
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
    addToComments()
  }

  const addToComments = () => {
    fetch("/comments", {
      body: JSON.stringify({post: commentEntry, trail_id: props.match.params.id}),
      headers:{
        "Content-Type": "application/json"
      },
      method: "POST"
    })
    .then(response => {
      if (response.ok) setSuccess(true)
      else setError(true)
    })
    .then(()=>{
      getComments()
    })
    .catch(error => {
      console.log("error:",error)
    })
  }
  //fetch comments
  async function getComments() {
    try {
      //GET data from the backend
      let response = await fetch('/comments')
      
        let data = await response.json();
        //all good?
        if(response.status === 200) {
          //check the console to make sure we have all the trails
          console.log("data", data)
          let sortedData = data.filter(trail => {
            return trail.trail_id == props.match.params.id
          })
          //populate the newTrails state array with data
          setComments(sortedData)
          console.log("sort", sortedData)
        }
      } catch (err) {
        console.log(err)
      }
    }
  const handleDelete = (e) => {
    deleteComment(e)
  }
  const deleteComment = (id) => {
    fetch(`/comments/${id}`, {
      headers:{
        "Content-Type": "application/json"
      },
      method: "DELETE"
    })
    .then(response => {
      if (response.ok) {
        // If favorite delete request is successful, set favorited to false
        setSuccess(true)
      }
    })
    .then(() => {
      // Refresh the API call after delete action
      getComments()
    })
  }

  return ( 
  
  <>
      <FormGroup>
        <Label htmlFor="commentEntry">Text Area</Label>
        <Input type="textarea" name="commentEntry" id="commentEntry" value={ commentEntry } onChange={ handleChange }/>
      </FormGroup>
      <Button onClick={ handleSubmit }>Submit</Button>
    { comments.map((comment, index)=> {
      let editable = false
        if(props.user_id === comment.user_id) {
          editable = true
        }
        let date = comment.updated_at.substring(0,10)
      return(
        <Media key = { index }>
          <Media left href="#">
            <Media object data-src='#' alt="Beautiful Face Picture" />
          </Media>
          <Media body>
            { comment.post }
          </Media>
          <Media body>
            { date }
          </Media>
          { editable &&
          <Button onClick={ () => handleDelete(comment.id) }>Delete</Button>
          }
        </Media>
      )
    })}
  </>
  );
};

export default CommentIndex