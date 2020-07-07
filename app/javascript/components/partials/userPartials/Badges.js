import React, { useState, useEffect } from 'react'

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
        if (len >=20) setBadges(["5 Comment Badge", "10 Comment Badger", "20 Comment Badge"])
        else if (len >=10) setBadges(["5 Comment Badge", "10 Comment Badge"])
        else if (len >=5) setBadges(["5 Comment Badge"])
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
      {badges.map((badge,index) => {
        return(
          <h4 key={index}>{badge}</h4>
        )
      })}
      {showEmptyBadgesMessage &&
        <p>Contribute or comment on at least 5 trails to get your first badge.</p>
      }
    </>
  )
}

export default Badges