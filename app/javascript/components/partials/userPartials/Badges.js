import React, { useState, useEffect } from 'react'
import Badge1 from '../images/badge1.png'
import Badge5 from '../images/badge5.png'
import Badge10 from '../images/badge10.png'
import Badge20 from '../images/badge20.png'
import Badge30 from '../images/badge30.png'
import Badge40 from '../images/badge40.png'
import Badge50 from '../images/badge50.png'

const Badges = props => {
  const [badges, setBadges] = useState([])
  const [showEmptyBadgesMessage, setshowEmptyBadgesMessage] = useState(false)
  const [showBadgeLabel, setShowBadgeLabel] = useState(false)
  
  useEffect(() => {
    getBadges()
  },[])
  
  async function getBadges() {
    try {
      // Fetch all comments from the current user
      let commentResponse = await fetch('/users/comments')
      let commentData = await commentResponse.json()
      let commentOnlyArray = []
      if (commentResponse.ok) {
        commentOnlyArray = [...commentData]
      }

      // Fetch all form submission from the current user
      let formResponse = await fetch('/users/questionnaires')
      let formData = await formResponse.json()
      let activityArray = []
      if (formResponse.ok) {
        // Combine both data into one array
        activityArray = [...commentOnlyArray, ...formData]
      }

      let len = activityArray.length

      len > 0 ? setShowBadgeLabel(true) : setShowBadgeLabel(false)

      // Set array of badges based on the length of the activity array
      if (len >=50) setBadges ([Badge1, Badge5, Badge10, Badge20, Badge30, Badge40, Badge50])
      if (len >=40) setBadges([Badge1, Badge5, Badge10, Badge20, Badge30, Badge40])
      else if (len >=30) setBadges([Badge1, Badge5, Badge10, Badge20, Badge30])
      else if (len >=20) setBadges([Badge1, Badge5, Badge10, Badge20])
      else if (len >=10) setBadges([Badge1, Badge5, Badge10])
      else if (len >=5) setBadges([Badge1, Badge5])
      else if (len >=1) setBadges([Badge1])
      else setshowEmptyBadgesMessage(true)

    } catch (err) {
      console.log(err)
    }
  }

  return(
    <>
      <h4 className="dashboard-subtitle">Your Badges</h4>

      {showBadgeLabel &&
        <label className="dashboard-badges-label">Keep on contributing to collect more badges!</label>
      }

      <div className="dashboard-badges-wrapper">
        {badges.map((badge,index) => {
          return(
            <img key={index} alt="Badge icon for contributing to trails." className="dashboard-badge-image" src={badge} />
          )
        })}
      </div>
      {showEmptyBadgesMessage &&
        <p className="dashboard-empty-message">Contribute or comment on your first trail to get your first badge.</p>
      }
    </>
  )
}

export default Badges