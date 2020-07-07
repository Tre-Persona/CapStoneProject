import React, { useState, useEffect } from 'react'

const Badges = props => {
  const [badges, setBadges] = useState([])
  
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
        if (len >=5) setBadges(["User", "Kinda User", "Super User"])
        else if (len >=3) setBadges(["User", "Kinda User"])
        else if (len >=1) setBadges(["User"])
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
      <ul>
        {badges.map((badge,index) => {
          return(
            <li key={index}>{badge}</li>
          )
        })}
      </ul>
    </>
  )
}

export default Badges