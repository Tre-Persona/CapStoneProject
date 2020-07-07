import React from "react"
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'
import { NavLink } from 'react-router-dom'


const TrailList = (props) => {
//trails needs to be defined
const {trails} = props
return(
<ListGroup>
            { trails.length>0 && trails.map((trail, index) => {
              return(
                <ListGroupItem key={trail.id}>
                  <NavLink to={`/trails/${ trail.id }`}>
                    <ListGroupItemHeading>{trail.name}</ListGroupItemHeading>
                  </NavLink>
                  <img src={trail.imgSmall} />
                  <ListGroupItemText>
                  {trail.summary}
                  </ListGroupItemText>
                </ListGroupItem>
              )
            })}
          </ListGroup>
)
}
export default TrailList