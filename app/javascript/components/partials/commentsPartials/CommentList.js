import React from 'react'
import { Button, FormGroup, Label, Input, ListGroup, ListGroupItem, ListGroupItemText } from 'reactstrap'


const CommentList = props => {
  return(
    <>
      <ListGroup className="comments-list-group">
      { props.comments.map((comment, index)=> {
        let editable = false
          if(props.user_id === comment.user_id) editable = true
          let date = comment.updated_at.substring(0,10)
        return(
          <ListGroupItem key={index} className="comments-list-item-wrapper">

            <img className="comments-list-item-avatar" src={comment.avatar} />

            <div className="comments-list-item-text-area">
              {props.editArray.includes(comment.id) &&
                <FormGroup className="comments-list-item-edit-form-group">
                  <Label className="comments-list-item-edit-form-label" htmlFor="commentEditEntry"><strong>Edit Comment</strong></Label>
                  <Input className="comments-list-item-edit-form-input" type="textarea" name="commentEditEntry" id="commentEditEntry" value={ props.commentEditEntry } onChange={ (e) => props.handleChangeEdit(e) }/>
                  <Button className="comments-list-item-edit-form-submit" onClick={ () => props.updateComment(comment.id,comment.trail_id) }>Update</Button>
                </FormGroup>
              }
              
              {!props.editArray.includes(comment.id) &&
                <>
                  <ListGroupItemText className="comments-list-item-title">
                    <span className="comment-user-name">{ comment.user_name }</span>, <span className="comment-date">{ date }</span>
                  </ListGroupItemText>
                  <ListGroupItemText className="comments-list-item-text">
                    { comment.post }
                  </ListGroupItemText>
                </>
              }
              
              { editable &&
                <>
                  <Button className="comments-list-item-edit-button" onClick={ () => props.handleEditClick(comment.id,comment.post) }>
                    {props.editArray.includes(comment.id) && "Cancel"}
                    {!props.editArray.includes(comment.id) && "Edit"}
                  </Button>
                  <Button className="comments-list-item-delete-button" alt="delete comment" onClick={ () => props.deleteComment(comment.id) }>Delete</Button>
                </>
              }
            </div>
          </ListGroupItem>
        )
      })}
      </ListGroup>
    </>
  )
}

export default CommentList