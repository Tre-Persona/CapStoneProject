import React, { useState, useEffect } from "react"
import CommentIndex from './CommentIndex'
import TrailDisplay from '../partials/trailPartials/TrailDisplay.js'
import FormEditor from '../partials/questionnairePartials/FormEditor.js'
import { Container, Spinner } from 'reactstrap'
import BadgeAccParking from '../images/trail-badge-accessible-parking.png'
import BadgeSignage from '../images/trail-badge-signage.png'
import BadgeDog from '../images/trail-badge-dog-friendly.png'
import BadgeBraille from '../images/trail-badge-braille-friendly.png'
import BadgeAccBathroom from '../images/trail-badge-accessible-bathroom.png'
import BadgeAuditory from '../images/trail-badge-auditory-description.png'
import BadgeMarkedPath from '../images/trail-badge-marked-path.png'
import BadgeIncline from '../images/trail-badge-steep-incline.png'
import BadgeDecline from '../images/trail-badge-steep-decline.png'
import BadgeFork from '../images/trail-badge-fork.png'
import BadgeLift from '../images/trail-badge-lift.png'
import BadgeObstacles from '../images/trail-badge-obstacles.png'
import BadgeStairs from '../images/trail-badge-stairs.png'
import BadgeBusyRds from '../images/trail-badge-busy-roads.png'


const TrailsProfile = (props) => {
  // JSON object of fetched trail via params id
  const [currentTrail, setCurrentTrail] = useState({})
  // Conditional rendering for the favorite button styling
  const [favorited, setFavorited] = useState(false)
  // Favorite model id of the current trail showing (if favorited)
  const [favId, setFavId] = useState()
  // Array of objects of all user's form submissions (if they've submitted for trail)
  const [formSubs, setFormSubs] = useState([])
  // Conditional for if spinner animation should show
  const [loading, setLoading] = useState(true)
  // Array of trail badges to display
  const [trailBadges, setTrailBadges] = useState([])
  // Total count of trail comments
  const [commentCount, setCommentCount] = useState(0)
  // Total count of form submission counts
  const [formCount, setFormCount] = useState(0)

  useEffect(() => {
    getTrail()
    getFormSubs()
    getTrailStats()
  }, [])

  // ---------- CODE FOR HANDLING FAVORITING ----------

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

  // ---------- CODE FOR FETCHING TRAIL DATA ----------

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

  // ---------- CODE FOR SHOWING/DELETING USER'S FORM SUBMISSION(S) ---------

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
          getTrailStats()
        }
      })
  }

  // ---------- CODE TO SHOW TRAIL BADGES BASED ON FORM SUBMISSIONS ----------

  async function getTrailStats() {
    try {
      let statsResponse = await fetch(`/questionnaires/trail/${props.match.params.id}`)
      let statsData = await statsResponse.json()

      let accParkingRating = 0
      let dogRating = 0
      let signageRating = 0
      let brailleRating = 0
      let markedRating = 0
      let inclineRating = 0
      let declineRating = 0
      let forkRating = 0
      let liftRating = 0
      let obstaclesRating = 0
      let stairsRating = 0
      let busyRdsRating = 0
      let auditoryRating = 0
      let accBathRating = 0
      let badgeArray = []

      if (statsResponse.ok) {
        setFormCount(statsData.length)

        console.log("stats data:", statsData)

        statsData.map(form => {
          // Marked Trail
          if (form.question8 === "yes") markedRating++
          else if (form.question8 === "no") markedRating--

          // Dog friendly
          if (form.question19 === "yes") dogRating++
          else if (form.question19 === "no") dogRating--

          // Accessible Parking
          if (form.question2 === "yes") accParkingRating++
          else if (form.question2 === "no") accParkingRating--

          // Trail signage
          let signageQuestions = ["question1", "question7"]
          signageQuestions.map(question => {
            if (form[question] === "yes") signageRating++
            else if (form[question] === "no") signageRating--
          })

          // Braille signage
          let brailleQuestions = ["question4", "question10"]
          brailleQuestions.map(question => {
            if (form[question] === "yes") brailleRating++
            else if (form[question] === "no") brailleRating--
          })

          // Accessible Bathroom
          if (form.question6 === "yes") accBathRating++
          else if (form.question6 === "no") accBathRating--

          // Auditory Description
          if (form.question3 === "yes") auditoryRating++
          else if (form.question3 === "no") auditoryRating--
          
          // Steep Inclines
          if (form.question12 === "yes") inclineRating++
          else if (form.question12 === "no") inclineRating--

          // Steep Declines
          if (form.question13 === "yes") declineRating++
          else if (form.question13 === "no") declineRating--

          // Forks
          if (form.question11 === "yes") forkRating++
          else if (form.question11 === "no") forkRating--

          // Obstacles
          if (form.question18 === "yes") obstaclesRating++
          else if (form.question18 === "no") obstaclesRating--

          // Lifting
          if (form.question14 === "yes") liftRating++
          else if (form.question14 === "no") liftRating--

          // Stairs
          if (form.question15 === "yes") stairsRating++
          else if (form.question15 === "no") stairsRating--

          // Busy Roads
          if (form.question17 === "yes") busyRdsRating++
          else if (form.question17 === "no") busyRdsRating--
        })

        // Positive Badges

        if (markedRating > 0) {
          badgeArray = [...badgeArray, {badge: BadgeMarkedPath, label: "Marked Path"}]
        }
        
        if (signageRating > 0) {
          badgeArray = [...badgeArray, {badge: BadgeSignage, label: "Trail Signage"}]
        }

        if (dogRating > 0) {
          badgeArray = [...badgeArray, {badge: BadgeDog, label: "Dog Friendly"}]
        }

        if (accParkingRating > 0) {
          badgeArray = [...badgeArray, {badge: BadgeAccParking, label: "Accessible Parking"}]
        }

        if (accBathRating > 0) {
          badgeArray = [...badgeArray, {badge: BadgeAccBathroom, label: "Accessible Bathroom"}]
        }

        if (brailleRating > 0) {
          badgeArray = [...badgeArray, {badge: BadgeBraille, label: "Braille Signage"}]
        }

        if (auditoryRating > 0) {
          badgeArray = [...badgeArray, {badge: BadgeAuditory, label: "Auditory Description"}]
        }

        // Caution Badges

        if (inclineRating > 0) {
          badgeArray = [...badgeArray, {badge: BadgeIncline, label: "Steep Inclines"}]
        }

        if (declineRating > 0) {
          badgeArray = [...badgeArray, {badge: BadgeDecline, label: "Steep Declines"}]
        }

        if (forkRating > 0) {
          badgeArray = [...badgeArray, {badge: BadgeFork, label: "Unmarked Forks"}]
        }

        if (obstaclesRating > 0) {
          badgeArray = [...badgeArray, {badge: BadgeObstacles, label: "Physical Obstacles"}]
        }

        if (liftRating > 0) {
          badgeArray = [...badgeArray, {badge: BadgeLift, label: "Body Lifting"}]
        }

        if (stairsRating > 0) {
          badgeArray = [...badgeArray, {badge: BadgeStairs, label: "Stairs"}]
        }

        if (busyRdsRating > 0) {
          badgeArray = [...badgeArray, {badge: BadgeBusyRds, label: "Busy Roads"}]
        }

        // Set state of trail badges
        setTrailBadges(badgeArray)

      }
    } catch (err) {
      console.log(err)
    }
  }

  // Reset comment count after comment deletion

  const handleCommentCount = (count) => {
    setCommentCount(count)
  }

  return (
    <>
      <Container className="trail-profile-container">

        {/* Upon page mount, show loading animation */}
        {loading &&
          <div className="spinner-wrapper home">
            <Spinner animation="border" style={{color:"#1ba274"}} />
          </div>
        }

        {/* After trail data fetches, turn off loading animation*/}
        {!loading &&
          <>
            <TrailDisplay
              currentTrail={currentTrail}
              favorited={favorited}
              handleFavorite={handleFavorite}
              logged_in={props.logged_in}
              params_id={props.match.params.id}
              trailBadges={trailBadges}
              commentCount={commentCount}
              formCount={formCount}
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
              handleCommentCount={handleCommentCount}
            />
          </>
        }
      </Container>
    </>
  );
}

export default TrailsProfile;