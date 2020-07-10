import React, { useEffect, useState } from "react"
import { Container, ListGroup, ListGroupItem, ListGroupItemText } from 'reactstrap'
import { Redirect, NavLink } from 'react-router-dom'

const UserActivity = props => {
  const [activities, setActivities] = useState([])
  const [showEmptyMessage, setShowEmptyMessage] = useState(false)

  useEffect(() =>{
    getActivity()
  },[])

  async function getActivity() {
    try {
      let commentResponse = await fetch('/users/comments')
      let commentData = await commentResponse.json()
      let commentOnlyArray = []
      if (commentResponse.ok) {
        commentOnlyArray = [...commentData]
      }

      let formResponse = await fetch('/users/questionnaires')
      let formData = await formResponse.json()
      let activityArray = []
      if (formResponse.ok) {
        activityArray = [...commentOnlyArray, ...formData]
      }

      let sortedActivities = activityArray.sort((a,b)=>{
        if (a.updated_at === b.updated_at) return 0
        else if (a.updated_at > b.updated_at) return -1
        else return 1
      })

      if (sortedActivities.length === 0) setShowEmptyMessage(true)
      setActivities(sortedActivities)

    } catch (err) {
        console.log(err)
      }
  }

  return (
    <>
      {props.user_id != props.match.params.id &&
          <Redirect to="/" />
        }
      <Container className="user-activity-container">
        <h2 className="page-title">Your Activity</h2>
        <ListGroup className="user-activity-list-group">
        {activities.map((activity,index) => {
          let date = activity.updated_at.substring(0,10)
          let editedDate = `${date.substring(5,7)}-${date.substring(8,10)}-${date.substring(0,4)}`
          return(
            <ListGroupItem className="user-activity-list-item"
            key={index}
            >
              {activity.post !== undefined &&
                <ListGroupItemText className="user-activity-list-title">
                  You commented on <NavLink className="user-activity-list-link" to={`/trails/${activity.trail_id}`}>{activity.trail_name}</NavLink>, <i>{ editedDate }</i>
                </ListGroupItemText>
              }

              {activity.post === undefined &&
                <ListGroupItemText className="user-activity-list-title">
                You submitted a questionnaire for <NavLink className="user-activity-list-link" to={`/trails/${activity.trail_id}`}>{activity.trail_name}</NavLink>, <i>{ editedDate }</i>
              </ListGroupItemText>
              }

              {activity.post !== undefined &&
                <ListGroupItemText className="user-activity-list-text">
                  { activity.post }
                </ListGroupItemText>
              }

            </ListGroupItem>
          )
        })}
        </ListGroup>
        {showEmptyMessage &&
          <p className="favorites-empty-message">You haven't commented on or contributed information to any trails yet.</p>
        }
      </Container>
    </>
  );
}

export default UserActivity