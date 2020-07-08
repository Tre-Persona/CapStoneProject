import React from "react"
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'
import { NavLink } from 'react-router-dom'


const TrailList = props => {
  //trails needs to be defined
  const {trails} = props
  return(
    <div className="trails-index-list-group">
      { trails.length>0 && trails.map((trail, index) => {
        return(
          <div key={trail.id} className="trails-index-list-wrapper">
            
            <NavLink to={`/trails/${ trail.id }`}>
              <img className="trails-index-list-image" src={trail.imgSmallMed} />
            </NavLink>

            <div className="trails-index-list-text-box">
              <NavLink className="trails-index-list-link" to={`/trails/${ trail.id }`}>
                <h4 className="trails-index-list-title">{trail.name}</h4>
              </NavLink>

              <p className="trails-index-list-text">
                <strong>{trail.location}</strong><br/>
                {trail.summary}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default TrailList