import React from 'react'
import {  Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'

const TrailDisplay = props => {
  const { currentTrail, favorited, handleFavorite } = props
  
  return(
    <>
      <div className="trail-profile-wrapper">
        { currentTrail &&
          <>
            <img className="trail-profile-image" src={currentTrail.imgMedium} />

            <div className="trail-profile-body">
              <h4 className="trail-profile-title">{currentTrail.name}</h4>

              <p className="trail-profile-location">{currentTrail.location}</p>

              <p className="trail-profile-text">{currentTrail.summary}</p>
              
              {/*Conditional render for how the favorite button looks between toggles*/}
              {props.logged_in &&
                <Button
                className="trail-profile-favorite-button" 
                color={favorited? "success" : "secondary"}
                onClick={() => handleFavorite()}
              >
                {favorited && "Favorited"}
                {!favorited && "Favorite"}
              </Button>
              }
            </div>
          </>
        }
      </div>
    </>
  )
}

export default TrailDisplay