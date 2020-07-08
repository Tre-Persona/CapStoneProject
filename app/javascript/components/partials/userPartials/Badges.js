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
      if (commentResponse.ok) {
        let len = commentData.length
        console.log("user comments", commentData)
        if (len >=20) setBadges([Badge5, Badge10, Badge20])
        else if (len >=10) setBadges([Badge5, Badge10])
        else if (len >=5) setBadges([Badge5])
        else setshowEmptyBadgesMessage(true)
      }
      // let badgeResponse = await fetch('/badges')
      // let badgeData = await badgeResponse.json()
      // if (badgeResponse.ok) {
      //   console.log("badges", badgeData)
      //   setBadges(badgeData)
      // }
    } catch (err) {
      console.log(err)
    }
  }

  // const commentCount = () => {
  //   if 
  // }
  
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