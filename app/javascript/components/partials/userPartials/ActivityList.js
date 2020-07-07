import React from 'react'
import { ListGroup, ListGroupItem, ListGroupItemText, Button } from 'reactstrap'
import { NavLink } from 'react-router-dom'

const ActivityList = props => {
  return(
    <>
      <h4 className="dashboard-subtitle">Your Activity</h4>
      <ListGroup className="dashboard-activity-list-group">
        {props.activity.map((comment,index) => {
          let date = comment.updated_at.substring(0,10)
          return(
            <ListGroupItem key={index} className="dashboard-activity-list-item-wrapper">

              <ListGroupItemText className="dashboard-activity-list-item-title">
                You commented on <NavLink className="dashboard-activity-list-item-link" to={`/trails/${comment.trail_id}`}><strong>{comment.trail_name}</strong></NavLink> <i>{ date }</i>
              </ListGroupItemText>

              <ListGroupItemText className="dashboard-activity-list-item-text">
                { comment.post }
              </ListGroupItemText>

            </ListGroupItem>
          )
        })}
      </ListGroup>

      <NavLink to={`/user/${props.user_id}/activity`}>
        <Button className="dashboard-activity-button">See All Activity</Button>
      </NavLink>
    </>
  )
}

export default ActivityList