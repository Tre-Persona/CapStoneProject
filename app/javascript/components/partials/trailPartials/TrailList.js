import React from "react"
import { Button } from 'reactstrap'
import { NavLink } from 'react-router-dom'


const TrailList = props => {
  //trails needs to be defined
  const { trails } = props
  return (
    <div className="trails-index-list-group">
      {trails.length > 0 && trails.map((trail, index) => {
        return (
          <div key={trail.id} className="trails-index-list-wrapper">

            <NavLink to={`/trails/${trail.id}`}>
              <img alt={`Image opens trail profile for ${trail.name}.`} className="trails-index-list-image" src={trail.imgSmallMed} />
            </NavLink>

            <div className="trails-index-list-text-box">
              <div className="trails-index-list-text-wrapper">
                <NavLink className="trails-index-list-link" to={`/trails/${trail.id}`}>
                  <h4 className="trails-index-list-title">{trail.name}</h4>
                </NavLink>

                <p className="trails-index-list-location">
                  {trail.location}
                </p>
                <div className="trails-index-list-length-wrapper">
                  <p className="trails-index-list-length">
                    {trail.length} mi long
                        </p>
                </div>
                <p className="trails-index-list-summary">
                  {trail.summary}
                </p>
              </div>
              <div className="trails-index-list-button-wrapper">
                <NavLink to={`/trails/${trail.id}`}>
                  <Button className="trails-index-list-button" aria-label={`Button opens trail profile for ${trail.name}.`}>
                    More Info
                        </Button>
                </NavLink>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default TrailList