import React, { useState, useEffect } from 'react'
import Badge5 from '../images/badge5.png'
import Badge10 from '../images/badge10.png'
import Badge20 from '../images/badge20.png'

const Badges = props => {
  const [badges, setBadges] = useState([])
  const [showEmptyBadgesMessage, setshowEmptyBadgesMessage] = useState(false)
  
  useEffect(() => {
    getBadges()
  },[])
  
  async function getBadges() {
    try {
      let commentResponse = await fetch('/users/comments')
      let commentData = await commentResponse.json()
      let commentOnlyArray = []
      if (commentResponse.ok) {
        commentOnlyArray = [...commentData]
      }

      let formResponse = await fetch('/users/questionnaires')
      let formData = await formResponse.json()
      let activityArray = []
      if (formResponse.ok) {
        activityArray = [...commentOnlyArray, ...formData]
      }

      let len = activityArray.length
      if (len >=20) setBadges([Badge5, Badge10, Badge20])
      else if (len >=10) setBadges([Badge5, Badge10])
      else if (len >=5) setBadges([Badge5])
      else setshowEmptyBadgesMessage(true)

    } catch (err) {
      console.log(err)
    }
  }
  
  return(
    <>
      <h4 className="dashboard-subtitle">Your Badges</h4>
      <div className="dashboard-badges-wrapper">
        {badges.map((badge,index) => {
          return(
            <img key={index} alt="badge-icon" className="dashboard-badge-image" src={badge} />
          )
        })}
      </div>
      {showEmptyBadgesMessage &&
        <p className="dashboard-empty-message">Contribute or comment on at least 5 trails to get your first badge.</p>
      }
    </>
  )
}

export default Badges