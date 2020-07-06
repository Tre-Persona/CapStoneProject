import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'reactstrap'

const FavoritesList = props => {
  return(
    <>
      <h4>Your Favorite Trails</h4>
      {props.favTrails.map((trail,index) => {
        return(
          <h6>{trail.name}</h6>
        )
      })}
      <NavLink to={`/user/${props.user_id}/favorites`}>
        <Button>See All Favorites</Button>
      </NavLink>
    </>
  )
}

export default FavoritesList