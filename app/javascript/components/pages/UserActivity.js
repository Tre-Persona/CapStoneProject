import React, { useEffect, useState } from "react"
import { Container, ListGroup, ListGroupItem, ListGroupItemText } from 'reactstrap'
import { Redirect, NavLink } from 'react-router-dom'

const UserActivity = props => {
  const [activity, setActivity] = useState([])

  useEffect(() =>{
    getActivity()
  },[])

  async function getActivity() {
    try {
      let activityResponse = await fetch('/users/comments')
      let activityData = await activityResponse.json()
      if (activityResponse.ok) {
        let sortedData = activityData.sort((a,b)=>{
          if (a.updated_at === b.updated_at) return 0
          else if (a.updated_at > b.updated_at) return -1
          else return 1
        })
        setActivity(sortedData)
        console.log("sorted Activity Data", sortedData)
      }
    } catch (err) {
        console.log(err)
      }
  }

  return (
    <>
      {props.user_id != props.match.params.id &&
          <Redirect to="/" />
        }
      <Container>
        <h2>Your Activity</h2>
        <ListGroup>
        {activity.map((comment,index) => {
          let date = comment.updated_at.substring(0,10)
          return(
            <>
              <ListGroupItem>
                <ListGroupItemText>
                  You commented on <NavLink to={`/trails/${comment.trail_id}`}><strong>{comment.trail_name}</strong></NavLink> <i>{ date }</i>
                </ListGroupItemText>
                <ListGroupItemText>
                  { comment.post }
                </ListGroupItemText>
              </ListGroupItem>
            </>
          )
        })}
        </ListGroup>
      </Container>
    </>
  );
}

export default UserActivity