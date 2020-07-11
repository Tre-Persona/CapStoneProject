import React, { useState, useEffect } from "react";
import { Container, Button } from "reactstrap";
import { NavLink, Redirect } from 'react-router-dom'
import QuestionnaireList from '../partials/questionnairePartials/QuestionnaireList'
import questions from '../partials/questionnairePartials/questions.js'

const Questionnaire = (props) => {
  //State for a new questionnaire form
  const [newForm, setNewForm] = useState({
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
    trail_id: parseInt(props.match.params.id),
    trail_name: ""
  })
  const [trailName, setTrailName] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    getTrailName()
  }, [])

  const handleChange = (e) => {
    console.log({ [e.target.name]: e.target.value })
    setNewForm({
      ...newForm,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = () => {
    completedQuestionnaire()
  };

  // Fetch request to POST Questionnaire
  const completedQuestionnaire = () => {

    fetch('/questionnaires', {
      body: JSON.stringify(newForm),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          setSuccess(true)
        }
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  async function getTrailName() {
    try {
      //GET data from the API
      let trailResponse = await fetch(`https://www.hikingproject.com/data/get-trails-by-id?ids=${props.match.params.id}&key=${props.apiKey}`)
      let trailData = await trailResponse.json()
      //all good?
      if (trailResponse.ok) {
        setNewForm({
          ...newForm,
          trail_name: trailData.trails[0].name
        })
        setTrailName(trailData.trails[0].name)
      }
    } catch (err) {
      console.log(err)
    }
  }



  return (
    <Container className="questionnaire-container">
      <h2 className="questionnaire-title">Trail Questionnaire</h2>

      <NavLink to={`/trails/${props.match.params.id}`} className="questionnaire-trail-name">
        Back to <span style={{ fontWeight: "800" }}>{trailName}</span>
      </NavLink>

      <QuestionnaireList
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        questions={questions}
        success={success}
        params_id={props.match.params.id}
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
  );
};

export default Questionnaire;