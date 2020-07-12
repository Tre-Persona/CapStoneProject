import React, { useState, useEffect } from "react"
import CommentIndex from './CommentIndex'
import TrailDisplay from '../partials/trailPartials/TrailDisplay.js'
import FormEditor from '../partials/questionnairePartials/FormEditor.js'
import { Container, Spinner } from 'reactstrap'
import BadgeHandicap from '../images/trail-badge-handicap-friendly.png'
import BadgeSignage from '../images/trail-badge-signage.png'
import BadgeDog from '../images/trail-badge-dog-friendly.png'
import BadgeBraille from '../images/trail-badge-braille-friendly.png'


const TrailsProfile = (props) => {
  const [currentTrail, setCurrentTrail] = useState({})
  // Conditional rendering for the favorite button styling
  const [favorited, setFavorited] = useState(false)
  // Favorite model id of the current trail showing (if favorited)
  const [favId, setFavId] = useState()
  const [formSubs, setFormSubs] = useState([])
  const [loading, setLoading] = useState(true)
  const [trailBadges, setTrailBadges] = useState([])
  //   {badge: BadgeHandicap, label: "Handicap Accessible"},
  //   {badge: BadgeDog, label: "Dog Friendly"},
  //   {badge: BadgeSignage, label: "Trail Signage"},
  //   {badge: BadgeBraille, label: "Braille Signage"}
  // ])

  useEffect(() => {
    getTrail()
    getFormSubs()
    getTrailStats()
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

  async function getTrailStats() {
    try {
      let statsResponse = await fetch(`/questionnaires/trail/${props.match.params.id}`)
      let statsData = await statsResponse.json()
      let handicapRating = 0
      let handicapTotal = 0
      let dogRating = 0
      let dogTotal = 0
      let signageRating = 0
      let signageTotal = 0
      let brailleRating = 0
      let brailleTotal = 0
      let badgeArray = []

      if (statsResponse.ok) {
        console.log("stats data:", statsData)

        statsData.map(form => {
          if (form.question19 === "yes") {
            dogRating++
            dogTotal++
          } else if (form.question19 === "no") {
            dogRating--
            dogTotal++
          }

          let signageQuestions = ["question1", "question7"]
          signageQuestions.map(question => {
            if (form[question] === "yes") {
              signageRating++
              signageTotal++
            } else if (form[question] === "no") {
              signageRating--
              signageTotal++
            }
          })

          let brailleQuestions = ["question4", "question10"]
          brailleQuestions.map(question => {
            if (form[question] === "yes") {
              brailleRating++
              brailleTotal++
            } else if (form[question] === "no") {
              brailleRating--
              brailleTotal++
            }
          })
        })

        if (dogRating / dogTotal > 0) {
          badgeArray = [...badgeArray, {badge: BadgeDog, label: "Dog Friendly"}]
        }

        if (signageRating / signageTotal > 0) {
          badgeArray = [...badgeArray, {badge: BadgeSignage, label: "Trail Signage"}]
        }

        if (brailleRating / brailleTotal > 0) {
          badgeArray = [...badgeArray, {badge: BadgeBraille, label: "Braille Signage"}]
        }

        setTrailBadges(badgeArray)

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
              trailBadges={trailBadges}
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