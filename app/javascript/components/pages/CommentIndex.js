import React, { useState, useReducer } from "react"
import { Media, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const CommentIndex = () => {
  const [commentEntry, setCommentEntry]= useState("")
  const [comments, setComments]=useState([])
  const [success, setSuccess ]=useState(false)
  const [error, setError ]=useState(false)


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
      body: JSON.stringify({post: commentEntry}),
      headers:{
        "Content-Type": "application/json"
      },
      method: "POST"
    })
    .then(response => {
      if (response.ok) setSuccess(true)
      else setError(true)
    }).catch(error => {
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
          console.log("data", data.comments)
          //populate the newTrails state array with data
          setComments(data.comments)
        }
      } catch (err) {
        console.log(err)
      }
    }
  //map over comments for :id and display


  return ( 
  
  <>
      <FormGroup>
        <Label htmlFor="commentEntry">Text Area</Label>
        <Input type="textarea" name="commentEntry" id="commentEntry" value={ commentEntry } onChange={ handleChange }/>
      </FormGroup>
      <Button onClick={ handleSubmit }>Submit</Button>
    { comments.map((comment, index)=> {
        <Media>
          <Media left href="#">
            <Media object data-src='#' alt="Generic placeholder image" />
          </Media>
          <Media body>
            { comment.post }
            </Media>
          </Media>
    
    })}
  </>
  );
};

export default CommentIndex