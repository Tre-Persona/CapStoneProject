import React from 'react'
import { Button, FormGroup, Label, Input, ListGroup, ListGroupItem, ListGroupItemText } from 'reactstrap'


const CommentList = props => {
  return(
    <>
      <ListGroup>
      { props.comments.map((comment, index)=> {
        let editable = false
          if(props.user_id === comment.user_id) editable = true
          let date = comment.updated_at.substring(0,10)
        return(
          <ListGroupItem key={index}>
            {props.editArray.includes(comment.id) &&
              <FormGroup>
                <Label htmlFor="commentEditEntry"><strong>Edit Comment</strong></Label>
                <Input type="textarea" name="commentEditEntry" id="commentEditEntry" value={ props.commentEditEntry } onChange={ (e) => props.handleChangeEdit(e) }/>
                <Button onClick={ () => props.updateComment(comment.id,comment.trail_id) }>Update</Button>
              </FormGroup>
            }
            
            {!props.editArray.includes(comment.id) &&
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
                <Button onClick={ () => props.handleEditClick(comment.id,comment.post) }>
                  {props.editArray.includes(comment.id) && "Cancel"}
                  {!props.editArray.includes(comment.id) && "Edit"}
                </Button>
                <Button alt="delete comment" color="danger" onClick={ () => props.deleteComment(comment.id) }>Delete</Button>
              </>
            }
          </ListGroupItem>
        )
      })}
      </ListGroup>
    </>
  )
}

export default CommentList