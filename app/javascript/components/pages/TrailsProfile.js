import React, { useState, useEffect } from "react"
import CommentIndex from './CommentIndex'
import TrailDisplay from '../partials/trailPartials/TrailDisplay.js'
import FormEditor from '../partials/questionnairePartials/FormEditor.js'
import { Container, Spinner } from 'reactstrap'


const TrailsProfile = (props) => {
  const [currentTrail, setCurrentTrail] = useState({})
  // Conditional rendering for the favorite button styling
  const [favorited, setFavorited] = useState(false)
  // Favorite model id of the current trail showing (if favorited)
  const [favId, setFavId] = useState()
  const [formSubs, setFormSubs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTrail()
    getFormSubs()
  }, [])

  const handleFavorite = () => {
    if (favorited) {
      removeFromFavorites()
    } else {
      addToFavorites()
    }
  }

  const addToFavorites = () => {
    fetch('/favorites', {
      body: JSON.stringify({ fav_trail_id: props.match.params.id }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    })
      .then(response => {
        if (response.ok) {
          // If favorite post request is successful, set favorited to true
          setFavorited(true)
          // Refresh the API call after favoriting action
          getTrail()
        }
      })
  }

  const removeFromFavorites = () => {
    fetch(`/favorites/${favId}`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "DELETE"
    })
      .then(response => {
        if (response.ok) {
          // If favorite delete request is successful, set favorited to false
          setFavorited(false)
          // Refresh the API call after delete action
          getTrail()
        }
      })
  }

  async function getTrail() {
    try {
      // Declare array to hold only favorited Ids to be used in both if-statements below
      let trailsIdsArray = []
      if (props.logged_in) {
        // Fetch JSON of favorites specific to current user
        let favResponse = await fetch('/favorites')
        let favData = await favResponse.json()

        if (favResponse.ok) {
          favData.map(value => {
            // Determine the favorite id (for use in the favorite delete call) if current trail is currently favorited
            if (value.fav_trail_id == props.match.params.id) {
              setFavId(value.id)
            }
          })
          // Create array of just the ids of the trails favorited by current user
          trailsIdsArray = favData.map(value => value.fav_trail_id)
        }
      }

      //GET data from the API
      let trailResponse = await fetch(`https://www.hikingproject.com/data/get-trails-by-id?ids=${props.match.params.id}&key=${props.apiKey}`)
      let trailData = await trailResponse.json()
      //all good?
      if (trailResponse.ok) {
        //populate the newTrails state array with trailData
        setCurrentTrail(trailData.trails[0])
        // Upon rednering the component, if the current trail id is one of the favorited ids of the current user, set Favorited to true
        if (trailsIdsArray.includes(trailData.trails[0].id)) {
          setFavorited(true)
        }
        setLoading(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  async function getFormSubs() {
    try {
      let formResponse = await fetch('/users/questionnaires')
      let formData = await formResponse.json()
      if (formResponse.ok) {
        let filteredArray = formData.filter(form => {
          return form.trail_id == props.match.params.id
        })
        setFormSubs(filteredArray)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const deleteFormSub = (id) => {
    fetch(`/questionnaires/${id}`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "DELETE"
    })
      .then(response => {
        if (response.ok) {
          getFormSubs()
        }
      })
  }

  return (
    <>
      <Container className="trail-profile-container">
        {loading &&
          <div className="spinner-wrapper">
            <Spinner animation="border" style={{color:"#1ba274"}} />
          </div>
        }
        {!loading &&
          <>
            <TrailDisplay
              currentTrail={currentTrail}
              favorited={favorited}
              handleFavorite={handleFavorite}
              logged_in={props.logged_in}
              params_id={props.match.params.id}
            />

            <FormEditor
              formSubs={formSubs}
              deleteFormSub={deleteFormSub}
            />

            <CommentIndex
              trail_id={props.match.params.id}
              user_name={props.user_name}
              user_id={props.user_id}
              trail_name={currentTrail.name}
              logged_in={props.logged_in}
              avatar={props.avatar}
            />
          </>
        }
      </Container>
    </>
  );
}

export default TrailsProfile;