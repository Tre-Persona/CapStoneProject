import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'reactstrap'

const FavoritesList = props => {
  return(
    <>
      <h4>Your Favorite Trails</h4>

      <div className="dashboard-favorites-wrapper">

        {props.favTrails.map((trail,index) => {
          return(

            <div className="dashboard-favorite-card">

              <img className="dashboard-favorite-image" src={trail.imgMedium} />

              <NavLink to={`/trails/${trail.id}`}><h6>{trail.name}</h6></NavLink>
              
            </div>
          )
        })}

      </div>

      <NavLink to={`/user/${props.user_id}/favorites`}>
        <Button>See All Favorites</Button>
      </NavLink>
    </>
  )
}

export default FavoritesList