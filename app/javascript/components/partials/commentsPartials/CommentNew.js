import React from 'react'
import { Button, FormGroup, Label, Input } from 'reactstrap'

const CommentNew = props => {
  return(
    <>
      <FormGroup>
        <Label htmlFor="commentEntry">Add Comment</Label>
        <Input 
          type="textarea"
          name="commentEntry"
          id="commentEntry"
          value={ props.commentEntry }
          onChange={ (e) => props.handleChange(e) }
        />
      </FormGroup>
      <Button onClick={() => props.handleSubmit()}>Submit</Button>
    </>
  )
}

export default CommentNew