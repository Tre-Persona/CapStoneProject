import React from "react"


const UserProfile = (props) => {

    return (
      <>
      <h2>User Profile</h2>
      <h2> Hello {props.user_name}</h2>
      </>
    );
}

export default UserProfile
