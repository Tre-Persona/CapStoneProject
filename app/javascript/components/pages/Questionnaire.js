import React, { useState, useEffect } from "react";
import { Container, Button } from "reactstrap";
import { NavLink, Redirect } from 'react-router-dom'
import QuestionnaireList from '../partials/questionnairePartials/QuestionnaireList.js'

const questions = [
  "Is there a designated trailhead?",
  "Are there clearly marked handicap spaces?",
  "Are audio devices with information about the trail available?",
  "Is Braille present on any trailhead signage?",
  "Are there bathrooms at the trailhead?",
  "If yes, are the bathrooms handicap accessible with at least one stall with handicap assistance bars?",
  "Are mile markers and trail markers present?",
  "Is the trail clearly marked?",
  "Are there physical barriers like bushes, rocks, or trees etc., helping mark the trail?",
  "Is there Braille on any trail signage or markers?",
  "Does the trail fork off unexpectedly into other paths without saying where the new paths lead?",
  "Are there steep inclines or ascents?",
  "Are there steep declines or descents?",
  "Are there sections of the trail where you will need to lift yourself up onto another area or support yourself in any manner where your feet would be suspended in the air?",
  "Are there stairs anywhere on the trail?",
  "Is the trail made up of mostly solid, compact ground?",
  "Is the trail near any busy roads or streets?",
  "Did you need to jump over or duck under any obstacles?",
  "Is the trail dog friendly?"
]

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