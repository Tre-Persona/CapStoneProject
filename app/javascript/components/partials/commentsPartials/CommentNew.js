import React from 'react'
import { Button, FormGroup, Label, Input } from 'reactstrap'

const CommentNew = props => {
  return(
    <>
      <FormGroup className="comments-new-form-group" >
        <Label
          className="comments-new-form-label" htmlFor="commentEntry">
          Add Comment
        </Label>
        
        <Input 
          className="comments-new-form-input"
          type="textarea"
          name="commentEntry"
          id="commentEntry"
          value={ props.commentEntry }
          onChange={ (e) => props.handleChange(e) }
        />
        <Button 
          className="comments-new-form-submit"
          onClick={() => props.handleSubmit()}>
          Submit
        </Button>
      </FormGroup>
    </>
  )
}

export default CommentNew