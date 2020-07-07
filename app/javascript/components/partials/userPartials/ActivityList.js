import React from 'react'
import { ListGroup, ListGroupItem, ListGroupItemText, Button } from 'reactstrap'
import { NavLink } from 'react-router-dom'

const ActivityList = props => {
  return(
    <>
      <h4>Your Activity</h4>
      <ListGroup>
        {props.activity.map((comment,index) => {
          let date = comment.updated_at.substring(0,10)
          return(
            <ListGroupItem key={index}>
              <ListGroupItemText>
                You commented on <NavLink to={`/trails/${comment.trail_id}`}><strong>{comment.trail_name}</strong></NavLink> <i>{ date }</i>
              </ListGroupItemText>
              <ListGroupItemText>
                { comment.post }
              </ListGroupItemText>
            </ListGroupItem>
          )
        })}
      </ListGroup>
      <NavLink to={`/user/${props.user_id}/activity`}>
        <Button>See All Activity</Button>
      </NavLink>
    </>
  )
}

export default ActivityList