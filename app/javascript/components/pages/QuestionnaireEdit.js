import React, { useEffect, useState } from 'react'
import { Container, Button } from 'reactstrap'
import { NavLink, Redirect } from 'react-router-dom'
import QuestionnaireList from '../partials/questionnairePartials/QuestionnaireList.js'
import questions from '../partials/questionnairePartials/questions.js'

const QuestionnaireEdit = props => {
  const [currentForm, setCurrentForm] = useState([{
    question1: undefined,
    question2: undefined,
    question3: undefined,
    question4: undefined,
    question5: undefined,
    question6: undefined,
    question7: undefined,
    question8: undefined,
    question9: undefined,
    question10: undefined,
    question11: undefined,
    question12: undefined,
    question13: undefined,
    question14: undefined,
    question15: undefined,
    question16: undefined,
    question17: undefined,
    question18: undefined,
    question19: undefined,
    trail_id: "",
    trail_name: ""
  }])
  const [trailName, setTrailName] = useState("")
  const [trailID, setTrailID] = useState()
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    getForm()
    // getTrailName()
  }, []);

  async function getForm() {
    try {
      let formResponse = await fetch(`/questionnaires/${props.match.params.id}/edit`)
      let formData = await formResponse.json()
      if (formResponse.ok) {
        setCurrentForm([formData])
        setTrailName(formData.trail_name)
        setTrailID(formData.trail_id)
        console.log("form edit data", formData)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    console.log({ [e.target.name]: e.target.value })
    setCurrentForm({
      ...newForm,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = () => {
    completedQuestionnaire()
  };

  // const updateForm = (id, trailId) => {
  //   fetch(`/comments/${id}`, {
  //     body: JSON.stringify({post: commentEditEntry, trail_id: trail_id, user_name: user_name, trail_name: trail_name, avatar: props.avatar}),
  //     headers:{
  //       "Content-Type": "application/json"
  //     },
  //     method: "PATCH"
  //   })
  //   .then(response => {
  //     if (response.ok) {
  //       let temp = editArray.filter(num=> num !== id)
  //       setEditArray(temp)
  //       setEditorOn(false)
  //       getComments()
  //     }
  //   })
  //   .catch(error => {
  //     console.log("error:",error)
  //   })
  // }
  
  return (
    <Container className="questionnaire-container">

      <h2 className="questionnaire-title">Edit Trail Questionnaire</h2>

      <NavLink to={`/trails/${trailID}`} className="questionnaire-trail-name">
        Back to <span style={{ fontWeight: "800" }}>{trailName}</span>
      </NavLink>

      <QuestionnaireList
        currentForm={currentForm}
        questions={questions}
        handleChange={handleChange}
      />

      <div className="questionnaire-submit-button-wrapper">
        <div>
          <Button
            className="questionnaire-submit-button"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
            </Button>
          {success && <Redirect to={`/trails/${props.match.params.id}`} />}
        </div>
      </div>

    </Container>
  )
}

export default QuestionnaireEdit