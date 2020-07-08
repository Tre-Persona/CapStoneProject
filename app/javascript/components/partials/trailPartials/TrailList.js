import React from "react"
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'
import { NavLink } from 'react-router-dom'


const TrailList = props => {
  //trails needs to be defined
  const {trails} = props
  return(
    <ListGroup className="trails-index-list-group">
      { trails.length>0 && trails.map((trail, index) => {
        return(
          <ListGroupItem key={trail.id} className="trails-index-list-wrapper">

            <img className="trails-index-list-image" src={trail.imgSmall} />

            <NavLink className="trails-index-list-link" to={`/trails/${ trail.id }`}>
              <ListGroupItemHeading className="trails-index-list-title">{trail.name}</ListGroupItemHeading>
            </NavLink>

            <ListGroupItemText className="trails-index-list-text">
              <strong>{trail.location}</strong><br/>
              {trail.summary}
            </ListGroupItemText>

          </ListGroupItem>
        )
      })}
    </ListGroup>
  )
}
export default TrailList