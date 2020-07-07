import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'reactstrap'

const FavoritesList = props => {
  return(
    <>
      <h4 className="dashboard-subtitle">Your Favorite Trails</h4>

      <div className="dashboard-favorites-wrapper">

        {props.favTrails.map((trail,index) => {
          if (index < 3) {
            return(
  
              <div
              key={index} 
              className="dashboard-favorite-card">
  
                <img className="dashboard-favorite-image" src={trail.imgMedium} />
  
                <div className="dashboard-favorite-text-box">
                  <NavLink className="dashboard-favorite-link" to={`/trails/${trail.id}`}><h6 className="dashboard-favorite-title">{trail.name}</h6></NavLink>

                  <p className="dashboard-favorite-text">
                    {trail.location}
                  </p>
                </div>
                
              </div>
            )
          }
        })}

      </div>

      <NavLink to={`/user/${props.user_id}/favorites`}>
        <Button className="dashboard-favorites-button">See All Favorites</Button>
      </NavLink>
    </>
  )
}

export default FavoritesList