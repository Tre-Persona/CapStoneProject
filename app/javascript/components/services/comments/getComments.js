import React from 'react'

async function getComments(id) {
    try {
      //GET data from the backend
      let response = await fetch('/comments')
      
        let data = await response.json()
        //all good?
        if(response.status === 200) {
          //check the console to make sure we have all the trails
          console.log("data", data)
          let sortedData = data.filter(trail => {
            return trail.trail_id == id
          })
          //populate the newTrails state array with data
          setComments(sortedData)
          console.log("sortedData", sortedData)
        }
      } catch (err) {
        console.log(err)
    }
}

export { getComments }