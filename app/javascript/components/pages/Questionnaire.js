import React, { useState, useEffect } from "react";
import { CustomInput, Form, FormGroup, Button, Container } from "reactstrap";
import { Redirect } from 'react-router-dom'

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
    setNewForm({
      ...newForm,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    completedQuestionnaire()
    console.log("form upon submit:", newForm)
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
          console.log("form submitted!",newForm)
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
        console.log("trailData", trailData.trails[0].name)
        setNewForm({
          ...newForm,
          trail_name: trailData.trails[0].name
        })
      }
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <Container>
      <h1 className="questionnaire-title">Trail Questionnaire</h1>
      <Form className="question-form" onSubmit={handleSubmit}>
        <FormGroup>
          <fieldset className="question-fieldset">
            <legend className="question-legend">
              Is there a designated trailhead?
            </legend>
            <div>
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question1yes"
                name="question1"
                value="yes"
                label="Yes"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question1no"
                name="question1"
                value="no"
                label="No"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question1notavailable"
                name="question1"
                value="notavailable"
                label="Not Available"
              />
            </div>
          </fieldset>
        </FormGroup>
        <FormGroup>
          <fieldset className="question-fieldset">
            <legend className="question-legend">
              Are there clearly marked handicap spaces?
            </legend>
            <div>
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question2yes"
                name="question2"
                value="yes"
                label="Yes"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question2no"
                name="question2"
                value="no"
                label="No"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question2notavailable"
                name="question2"
                value="notavailable"
                label="Not Available"
              />
            </div>
          </fieldset>
        </FormGroup>
        <FormGroup>
          <fieldset className="question-fieldset">
            <legend className="question-legend">
              Are audio devices with information about the trail available?
            </legend>
            <div>
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question3yes"
                name="question3"
                value="yes"
                label="Yes"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question3no"
                name="question3"
                value="no"
                label="No"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question3notavailable"
                name="question3"
                value="notavailable"
                label="Not Available"
              />
            </div>
          </fieldset>
        </FormGroup>
        <FormGroup>
          <fieldset className="question-fieldset">
            <legend className="question-legend">
              Is Braille present on any trailhead signage?
            </legend>
            <div>
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question4yes"
                name="question4"
                value="yes"
                label="Yes"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question4no"
                name="question4"
                value="no"
                label="No"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question4notavailable"
                name="question4"
                value="notavailable"
                label="Not Available"
              />
            </div>
          </fieldset>
        </FormGroup>
        <FormGroup>
          <fieldset className="question-fieldset">
            <legend className="question-legend">
              Are there bathrooms at the trailhead?
            </legend>
            <div>
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question5yes"
                name="question5"
                value="yes"
                label="Yes"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question5no"
                name="question5"
                value="no"
                label="No"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question5notavailable"
                name="question5"
                value="notavailable"
                label="Not Available"
              />
            </div>
          </fieldset>
        </FormGroup>
        <FormGroup>
          <fieldset className="question-fieldset">
            <legend className="question-legend">
              If yes, are the bathrooms handicap accessible with at least one
              stall with handicap assistance bars?
            </legend>
            <div>
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question6yes"
                name="question6"
                value="yes"
                label="Yes"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question6no"
                name="question6"
                value="no"
                label="No"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question6notavailable"
                name="question6"
                value="notavailable"
                label="Not Available"
              />
            </div>
          </fieldset>
        </FormGroup>
        <FormGroup>
          <fieldset className="question-fieldset">
            <legend className="question-legend">
              Are mile markers and trail markers present?
            </legend>
            <div>
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question7yes"
                name="question7"
                value="yes"
                label="Yes"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question7no"
                name="question7"
                value="no"
                label="No"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question7notavailable"
                name="question7"
                value="notavailable"
                label="Not Available"
              />
            </div>
          </fieldset>
        </FormGroup>
        <FormGroup>
          <fieldset className="question-fieldset">
            <legend className="question-legend">
              Is the trail clearly marked?
            </legend>
            <div>
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question8yes"
                name="question8"
                value="yes"
                label="Yes"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question8no"
                name="question8"
                value="no"
                label="No"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question8notavailable"
                name="question8"
                value="notavailable"
                label="Not Available"
              />
            </div>
          </fieldset>
        </FormGroup>
        <FormGroup>
          <fieldset className="question-fieldset">
            <legend className="question-legend">
              Are there physical barriers like bushes, rocks, or trees etc.,
              helping mark the trail?
            </legend>
            <div>
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question9yes"
                name="question9"
                value="yes"
                label="Yes"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question9no"
                name="question9"
                value="no"
                label="No"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question9notavailable"
                name="question9"
                value="notavailable"
                label="Not Available"
              />
            </div>
          </fieldset>
        </FormGroup>
        <FormGroup>
          <fieldset className="question-fieldset">
            <legend className="question-legend">
              Is there Braille on any trail signage or markers?
            </legend>
            <div>
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question10yes"
                name="question10"
                value="yes"
                label="Yes"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question10no"
                name="question10"
                value="no"
                label="No"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question10notavailable"
                name="question10"
                value="notavailable"
                label="Not Available"
              />
            </div>
          </fieldset>
        </FormGroup>
        <FormGroup>
          <fieldset className="question-fieldset">
            <legend className="question-legend">
              Does the trail fork off unexpectedly into other paths without
              saying where the new paths lead?
            </legend>
            <div>
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question11yes"
                name="question11"
                value="yes"
                label="Yes"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question11no"
                name="question11"
                value="no"
                label="No"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question11notavailable"
                name="question11"
                value="notavailable"
                label="Not Available"
              />
            </div>
          </fieldset>
        </FormGroup>
        <FormGroup>
          <fieldset className="question-fieldset">
            <legend className="question-legend">
              Are there steep inclines or ascents?
            </legend>
            <div>
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question12yes"
                name="question12"
                value="yes"
                label="Yes"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question12no"
                name="question12"
                value="no"
                label="No"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question12notavailable"
                name="question12"
                value="notavailable"
                label="Not Available"
              />
            </div>
          </fieldset>
        </FormGroup>
        <FormGroup>
          <fieldset className="question-fieldset">
            <legend className="question-legend">
              Are there steep declines or descents?
            </legend>
            <div>
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question13yes"
                name="question13"
                value="yes"
                label="Yes"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question13no"
                name="question13"
                value="no"
                label="No"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question13notavailable"
                name="question13"
                value="notavailable"
                label="Not Available"
              />
            </div>
          </fieldset>
        </FormGroup>
        <FormGroup>
          <fieldset className="question-fieldset">
            <legend className="question-legend">
              Are there sections of the trail where you will need to lift
              yourself up onto another area or support yourself in any manner
              where your feet would be suspended in the air?
            </legend>
            <div>
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question14yes"
                name="question14"
                value="yes"
                label="Yes"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question14no"
                name="question14"
                value="no"
                label="No"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question14notavailable"
                name="question14"
                value="notavailable"
                label="Not Available"
              />
            </div>
          </fieldset>
        </FormGroup>
        <FormGroup>
          <fieldset className="question-fieldset">
            <legend className="question-legend">
              Are there stairs anywhere on the trail?
            </legend>
            <div>
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question15yes"
                name="question15"
                value="yes"
                label="Yes"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question15no"
                name="question15"
                value="no"
                label="No"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question15notavailable"
                name="question15"
                value="notavailable"
                label="Not Available"
              />
            </div>
          </fieldset>
        </FormGroup>
        <FormGroup>
          <fieldset className="question-fieldset">
            <legend className="question-legend">
              Is the trail made up of mostly solid, compact ground?
            </legend>
            <div>
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question16yes"
                name="question16"
                value="yes"
                label="Yes"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question16no"
                name="question16"
                value="no"
                label="No"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question16notavailable"
                name="question16"
                value="notavailable"
                label="Not Available"
              />
            </div>
          </fieldset>
        </FormGroup>
        <FormGroup>
          <fieldset className="question-fieldset">
            <legend className="question-legend">
              Is the trail near any busy roads or streets?
            </legend>
            <div>
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question17yes"
                name="question17"
                value="yes"
                label="Yes"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question17no"
                name="question17"
                value="no"
                label="No"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question17notavailable"
                name="question17"
                value="notavailable"
                label="Not Available"
              />
            </div>
          </fieldset>
        </FormGroup>
        <FormGroup>
          <fieldset className="question-fieldset">
            <legend className="question-legend">
              Did you need to jump over or duck under any obstacles?
            </legend>
            <div>
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question18yes"
                name="question18"
                value="yes"
                label="Yes"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question18no"
                name="question18"
                value="no"
                label="No"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question18notavailable"
                name="question18"
                value="notavailable"
                label="Not Available"
              />
            </div>
          </fieldset>
        </FormGroup>
        <FormGroup>
          <fieldset className="question-fieldset">
            <legend className="question-legend">
              Is the trail dog friendly?
            </legend>
            <div>
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question19yes"
                name="question19"
                value="yes"
                label="Yes"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question19no"
                name="question19"
                value="no"
                label="No"
              />
              <CustomInput
                onChange={handleChange}
                className="radio-btn"
                type="radio"
                id="question19notavailable"
                name="question19"
                value="notavailable"
                label="Not Available"
              />
            </div>
          </fieldset>
        </FormGroup>

        
          <Button
            className="questionnaire-submit-button"
            type="submit"
            onSubmit={handleSubmit}
          >
            Submit
          </Button>
          {/*success && <Redirect to={`/trails/${props.match.params.id}`} />*/}
        
      </Form>
    </Container>
  );
};

export default Questionnaire;