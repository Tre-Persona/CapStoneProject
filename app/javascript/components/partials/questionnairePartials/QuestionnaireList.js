import React from 'react'
import { CustomInput, Form, FormGroup, Button } from "reactstrap"

const QuestionnaireList = props => {
  const { questions, handleSubmit, handleChange, success, params_id } = props

  return (
    <Form className="questionnaire-form">
      {questions.map((question, index) => {
        let num = index + 1
        return (
          <FormGroup key={index} className="question-item-wrapper">
            <img className="question-image" src={`https://github.com/Tre-Persona/CapStoneProject/blob/master/app/javascript/components/partials/images/question${num}.png?raw=true`} />
            <div className="question-text-box">
              <h6 className="question-legend">
                {question}
              </h6>
              <div>
                <CustomInput
                  onChange={(e) => handleChange(e)}
                  className="radio-btn"
                  type="radio"
                  name={`question${num}`}
                  value="yes"
                  label="Yes"
                  id={`question${num}yes`}
                />
                <CustomInput
                  onChange={(e) => handleChange(e)}
                  className="radio-btn"
                  type="radio"
                  name={`question${num}`}
                  value="no"
                  label="No"
                  id={`question${num}no`}
                />
                <CustomInput
                  onChange={(e) => handleChange(e)}
                  className="radio-btn"
                  type="radio"
                  name={`question${num}`}
                  value="notavailable"
                  label="Not Available"
                  id={`question${num}notavailable`}
                />
              </div>
            </div>
          </FormGroup>
        )
      })}

    </Form>
  )
}

export default QuestionnaireList