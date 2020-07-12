import React from 'react'
import { CustomInput, Form, FormGroup } from "reactstrap"

const QuestionnaireList = props => {
  const { questions, handleChange } = props
  return (
    <Form className="questionnaire-form">
      {questions.map((question, index) => {
        return (
          <FormGroup key={index} className="question-item-wrapper">
            <img className="question-image" src={question.image} />
            <div className="question-text-box">
              <h6 className="question-legend">
                {question.question}
              </h6>
              <div>
                <CustomInput
                  onChange={(e) => handleChange(e)}
                  className="radio-btn"
                  type="radio"
                  name={`question${question.id}`}
                  value="yes"
                  label="Yes"
                  id={`question${question.id}yes`}
                />
                <CustomInput
                  onChange={(e) => handleChange(e)}
                  className="radio-btn"
                  type="radio"
                  name={`question${question.id}`}
                  value="no"
                  label="No"
                  id={`question${question.id}no`}
                />
                <CustomInput
                  onChange={(e) => handleChange(e)}
                  className="radio-btn"
                  type="radio"
                  name={`question${question.id}`}
                  value="notavailable"
                  label="Not Available"
                  id={`question${question.id}notavailable`}
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