import React from 'react'
import { ListGroup, ListGroupItem, ListGroupItemText, Button } from 'reactstrap'
import { NavLink } from 'react-router-dom'

const ActivityList = props => {
  return(
    <>
      <h4 className="dashboard-subtitle">Your Activity</h4>
      <ListGroup className="dashboard-activity-list-group">
        {props.activities.map((activity,index) => {
          let date = activity.updated_at.substring(0,10)
          let editedDate = `${date.substring(5,7)}-${date.substring(8,10)}-${date.substring(0,4)}`
          if (index < 5) {
            return(
              <ListGroupItem key={index} className="dashboard-activity-list-item-wrapper">
                
                {activity.post !== undefined && 
                  <ListGroupItemText className="dashboard-activity-list-item-title">
                    You commented on <NavLink className="dashboard-activity-list-item-link" to={`/trails/${activity.trail_id}`}>{activity.trail_name}</NavLink>, <i>{ editedDate  }</i>
                  </ListGroupItemText>
                }

                {activity.post === undefined &&
                  <ListGroupItemText className="dashboard-activity-list-item-title">
                  You submitted a questionnaire for <NavLink className="dashboard-activity-list-item-link" to={`/trails/${activity.trail_id}`}>{activity.trail_name}</NavLink>, <i>{ editedDate  }</i>
                </ListGroupItemText>
                }

                {activity.post !== undefined &&
                  <ListGroupItemText className="dashboard-activity-list-item-text">
                    { activity.post }
                  </ListGroupItemText>
                }
  
              </ListGroupItem>
            )
          }
        })}
      </ListGroup>

      {!props.showEmptyActivityMessage &&
        <NavLink to={`/user/${props.user_id}/activity`}>
          <Button className="dashboard-activity-button">See All Activity</Button>
        </NavLink>
      }

      {props.showEmptyActivityMessage && 
        <p className="dashboard-empty-message">You have no comment activity yet.</p>
      }
    </>
  )
}

export default ActivityList