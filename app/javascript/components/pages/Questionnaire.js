import React, {useState} from 'react';
import { CustomInput, Form, FormGroup, Button } from 'reactstrap';

const initialForm = {
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
    question18: undefined
}
const Questionnaire = (props) => {
    const [newForm, setNewForm] = useState(initialForm)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target.elements)
        // Fetch request to POST comment
    
            const addToComments = () => {
            fetch("/comments", {
            // JSON needs to include comment string, trail id, and user name
            body: JSON.stringify({post: commentEntry, trail_id: props.trail_id, user_name: props.user_name, trail_name: props.trail_name}),
            headers:{
                "Content-Type": "application/json"
            },
            method: "POST"
            })
            .then(response => {
            if (response.ok) {
                // If post successful, clear new comment form
                setCommentEntry("")
                // Refetch comments upon adding new comment
                getComments()
            }
            })
            .catch(error => {
            console.log("error:",error)
            })
        }
    }
    

    const handleChange = (e) => {
        newForm[e.target.name]= e.target.value
        setNewForm(newForm) 
        console.log(newForm)
    }

  return (
    <>
        <h1>Trail Questionnaire</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <fieldset>
                        <legend>Is there a designated trailhead?</legend>
                            <div>
                                <CustomInput onChange={handleChange} type="radio" id="question1yes" name="question1" value= "true" label="Yes" />
                                <CustomInput onChange={handleChange} type="radio" id="question1no" name="question1" value="false" label="No" />
                            </div>
                    </fieldset>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <legend>Are there clearly marked handicap spaces?</legend>
                            <div>
                                <CustomInput onChange={handleChange} type="radio" id="question2yes" name="question2" value="true" label="Yes" />
                                <CustomInput onChange={handleChange} type="radio" id="question2no" name="question2" value="false" label="No" />
                            </div>
                    </fieldset>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <legend>Are audio devices with information about the trail available?</legend>
                            <div>
                                <CustomInput onChange={handleChange} type="radio" id="question3yes" name="question3" value="true" label="Yes" />
                                <CustomInput onChange={handleChange} type="radio" id="question3no" name="question3" value="false" label="No" />
                            </div>
                    </fieldset>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <legend>Is Braille present on any trailhead signage?</legend>
                            <div>
                                <CustomInput onChange={handleChange} type="radio" id="question4yes" name="question4" value="true" label="Yes" />
                                <CustomInput onChange={handleChange} type="radio" id="question4no" name="question4" value="false" label="No" />
                            </div>
                    </fieldset>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <legend>Are there bathrooms at the trailhead?</legend>
                            <div>
                                <CustomInput onChange={handleChange} type="radio" id="question5yes" name="question5" value="true" label="Yes" />
                                <CustomInput onChange={handleChange} type="radio" id="question5no" name="question5" value="false" label="No" />
                            </div>
                    </fieldset>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <legend>If yes, are the bathrooms handicap accessible with at least one stall with handicap assistance bars?</legend>
                            <div>
                                <CustomInput onChange={handleChange} type="radio" id="question6yes" name="question6" value="true" label="Yes" />
                                <CustomInput onChange={handleChange} type="radio" id="question6no" name="question6" value="false" label="No" />
                                <CustomInput onChange={handleChange} type="radio" id="question6na" name="question6" value="not available" label="There were no bathrooms at the trailhead" />
                            </div>
                    </fieldset>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <legend>Are mile markers and trail markers present?</legend>
                            <div>
                                <CustomInput onChange={handleChange} type="radio" id="question7yes" name="question7" value="true" label="Yes" />
                                <CustomInput onChange={handleChange} type="radio" id="question7no" name="question7" value="false" label="No" />
                            </div>
                    </fieldset>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <legend>Is the trail clearly marked?</legend>
                            <div>
                                <CustomInput onChange={handleChange} type="radio" id="question8yes" name="question8" value="true" label="Yes" />
                                <CustomInput onChange={handleChange} type="radio" id="question8no" name="question8" value="false" label="No" />
                            </div>
                    </fieldset>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <legend>Are there physical barriers like bushes, rocks, or trees etc., helping mark the trail?</legend>
                            <div>
                                <CustomInput onChange={handleChange} type="radio" id="question9yes" name="question9" value="true" label="Yes" />
                                <CustomInput onChange={handleChange} type="radio" id="question9no" name="question9" value="false" label="No" />
                            </div>
                    </fieldset>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <legend>Is there Braille on any trail signage or markers?</legend>
                            <div>
                                <CustomInput onChange={handleChange} type="radio" id="question10yes" name="question10" value="true" label="Yes" />
                                <CustomInput onChange={handleChange} type="radio" id="question10no" name="question10" value="false" label="No" />
                            </div>
                    </fieldset>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <legend>Does the trail fork off unexpectedly into other paths without saying where the new paths lead?</legend>
                            <div>
                                <CustomInput onChange={handleChange} type="radio" id="question11yes" name="question11" value="true" label="Yes" />
                                <CustomInput onChange={handleChange} type="radio" id="question11no" name="question11" value="false" label="No" />
                            </div>
                    </fieldset>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <legend>Are there steep inclines or ascents?</legend>
                            <div>
                                <CustomInput onChange={handleChange} type="radio" id="question12yes" name="question12" value="true" label="Yes" />
                                <CustomInput onChange={handleChange} type="radio" id="question12no" name="question12" value="false" label="No" />
                            </div>
                    </fieldset>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <legend>Are there steep declines or descents?</legend>
                            <div>
                            <CustomInput onChange={handleChange} type="radio" id="question13yes" name="question13" value="true" label="Yes"  />
                            <CustomInput onChange={handleChange} type="radio" id="question13no" name="question13" value="false" label="No" />
                            </div>
                    </fieldset>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <legend>Are there sections of the trail where you will need to lift yourself up onto another area or support yourself in any manner where your feet would be suspended in the air?</legend>
                            <div>
                                <CustomInput onChange={handleChange} type="radio" id="question14yes" name="question14" value="true" label="Yes" />
                                <CustomInput onChange={handleChange} type="radio" id="question14no" name="question14" value="false" label="No" />
                            </div>
                    </fieldset>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <legend>Are there stairs anywhere on the trail?</legend>
                            <div>
                                <CustomInput onChange={handleChange} type="radio" id="question15yes" name="question15" value="true" label="Yes" />
                                <CustomInput onChange={handleChange} type="radio" id="question15no" name="question15" value="false" label="No" />
                            </div>
                    </fieldset>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <legend>Is the trail made up of mostly solid, compact ground?</legend>
                            <div>
                                <CustomInput onChange={handleChange} type="radio" id="question16yes" name="question16" value="true" label="Yes" />
                                <CustomInput onChange={handleChange} type="radio" id="question16no" name="question16" value="false" label="No" />
                            </div>
                    </fieldset>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <legend>Is the trail near any busy roads or streets?</legend>
                            <div>
                                <CustomInput onChange={handleChange} type="radio" id="question17yes" name="question17" value="true" label="Yes" />
                                <CustomInput onChange={handleChange} type="radio" id="question17no" name="question17"  value="false" label="No" />
                            </div>
                    </fieldset>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <legend>Did you need to jump over or duck under any obstacles?</legend>
                            <div>
                                <CustomInput onChange={handleChange} type="radio" id="question18yes" name="question18" value="true" label="Yes" />
                                <CustomInput onChange={handleChange} type="radio" id="question18no" name="question18"  value="false" label="No" />
                            </div>
                    </fieldset>
                </FormGroup>
            <Button type="submit" onSubmit={handleSubmit}>Submit</Button>
            </Form>
    </>
  );
}

export default Questionnaire;