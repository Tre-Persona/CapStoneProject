import React from 'react'
import {  Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'

const TrailDisplay = props => {
  const { currentTrail, favorited, handleFavorite } = props
  
  return(
    <>
      <ListGroup>
        { currentTrail &&
            <ListGroupItem>
              <ListGroupItemHeading>
                {currentTrail.name}
              </ListGroupItemHeading>

              <img src={currentTrail.imgSmall} />

              <ListGroupItemText>
                {currentTrail.summary}
              </ListGroupItemText>

              <ListGroupItemText>
                Current Trail Conditions for {currentTrail.conditionDate}:&nbsp;
                { currentTrail.conditionDetails} and {currentTrail.conditionStatus}
              </ListGroupItemText>
            </ListGroupItem>
        }
      </ListGroup>
      {/*Conditional render for how the favorite button looks between toggles*/}
      {props.loggedIn &&
        <Button 
        color={favorited? "success" : "secondary"}
        onClick={() => handleFavorite()}
      >
        {favorited && "Favorited"}
        {!favorited && "Favorite"}
      </Button>
      }
    </>
  )
}

export default TrailDisplay