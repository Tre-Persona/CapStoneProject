import React from 'react';

const  = () => {

  
  return ( 
   );
}
 
export default ;




const getQuestionnaireById = () => {

    fetch(`/trails/${trail.id}/questionnaires`)
      .then((response) => {
        if (response.ok) {
          
        }
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };