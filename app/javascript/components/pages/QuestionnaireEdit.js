import React, { useEffect, useState } from 'react'
import { Container, Button } from 'reactstrap'
import { NavLink, Redirect } from 'react-router-dom'
import QuestionnaireEditList from '../partials/questionnairePartials/QuestionnaireEditList.js'
import questions from '../partials/questionnairePartials/questions.js'

const QuestionnaireEdit = props => {
  const [currentForm, setCurrentForm] = useState({
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
  })
  const [trailName, setTrailName] = useState("")
  const [trailID, setTrailID] = useState()
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    getForm()
  }, [])

  async function getForm() {
    try {
      let formResponse = await fetch(`/questionnaires/${props.match.params.id}/edit`)
      let formData = await formResponse.json()
      if (formResponse.ok) {
        setCurrentForm(formData)
        setTrailName(formData.trail_name)
        setTrailID(formData.trail_id)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    setCurrentForm({
      ...currentForm,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = () => {
    updateForm()
  }

  const updateForm = () => {
    fetch(`/questionnaires/${props.match.params.id}`, {
      body: JSON.stringify(currentForm),
      headers:{
        "Content-Type": "application/json"
      },
      method: "PATCH"
    })
    .then(response => {
      if (response.ok) {
        setSuccess(true)
      }
    })
    .catch(error => {
      console.log("error:",error)
    })
  }
  
  return (
    <Container className="questionnaire-container">

      <h2 className="questionnaire-title">Edit Trail Questionnaire</h2>

      <NavLink to={`/trails/${trailID}`} className="questionnaire-trail-name">
        Back to <span style={{ fontWeight: "800" }}>{trailName}</span>
      </NavLink>

      <QuestionnaireEditList
        currentForm={currentForm}
        questions={questions}
        handleChange={handleChange}
      />

      <div className="questionnaire-submit-button-wrapper">
        <div>
          <Button
            className="questionnaire-submit-button"
            onClick={handleSubmit}
          >
            Submit
            </Button>
          {success && <Redirect to={`/trails/${trailID}`} />}
        </div>
      </div>

    </Container>
  )
}

export default QuestionnaireEdit