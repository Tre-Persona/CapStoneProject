import React from 'react';
import { CustomInput, Form, FormGroup, Label } from 'reactstrap';

const Questionnaire = (props) => {
  return (
    <>
        <h1>Trail Questionnaire</h1>
            <Form>
                <FormGroup>
                    <fieldset>
                        <legend>Is there a designated trailhead?</legend>
                        <div>
                        <CustomInput type="radio" id="question1yes" name="customRadio" label="Yes" />
                        <CustomInput type="radio" id="question1no" name="customRadio" label="No" />
                        </div>
                    </fieldset>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <legend>Are there clearly marked handicap spaces?</legend>
                        <div>
                        <CustomInput type="radio" id="question2yes" name="customRadio" label="Yes" />
                        <CustomInput type="radio" id="question2no" name="customRadio" label="No" />
                        </div>
                    </fieldset>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <legend>Are audio devices with information about the trail available?</legend>
                        <div>
                        <CustomInput type="radio" id="question3yes" name="customRadio" label="Yes" />
                        <CustomInput type="radio" id="question3no" name="customRadio" label="No" />
                        </div>
                    </fieldset>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <legend>Is Braille present on any trailhead signage?</legend>
                        <div>
                        <CustomInput type="radio" id="question4yes" name="customRadio" label="Yes" />
                        <CustomInput type="radio" id="question4no" name="customRadio" label="No" />
                        </div>
                    </fieldset>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <legend>Are there bathrooms at the trailhead?</legend>
                        <div>
                        <CustomInput type="radio" id="question5yes" name="customRadio" label="Yes" />
                        <CustomInput type="radio" id="question5no" name="customRadio" label="No" />
                        </div>
                    </fieldset>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <legend>If yes, are the bathrooms handicap accessible with at least one stall with handicap assistance bars?</legend>
                        <div>
                        <CustomInput type="radio" id="question6yes" name="customRadio" label="Yes" />
                        <CustomInput type="radio" id="question6no" name="customRadio" label="No" />
                        <CustomInput type="radio" id="question6na" name="customRadio" label="There were no bathrooms at the trailhead" />
                        </div>
                    </fieldset>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <legend>Are mile markers and trail markers present?</legend>
                        <div>
                        <CustomInput type="radio" id="question7yes" name="customRadio" label="Yes" />
                        <CustomInput type="radio" id="question7no" name="customRadio" label="No" />
                        </div>
                    </fieldset>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <legend>Is the trail clearly marked?</legend>
                        <div>
                        <CustomInput type="radio" id="question8yes" name="customRadio" label="Yes" />
                        <CustomInput type="radio" id="question8no" name="customRadio" label="No" />
                        </div>
                    </fieldset>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <legend>Are there physical barriers like bushes, rocks, or trees etc., helping mark the trail?</legend>
                        <div>
                        <CustomInput type="radio" id="question9yes" name="customRadio" label="Yes" />
                        <CustomInput type="radio" id="question9no" name="customRadio" label="No" />
                        </div>
                    </fieldset>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <legend>Is there Braille on any trail signage or markers?</legend>
                        <div>
                        <CustomInput type="radio" id="question10yes" name="customRadio" label="Yes" />
                        <CustomInput type="radio" id="question10no" name="customRadio" label="No" />
                        </div>
                    </fieldset>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <legend>Does the trail fork off unexpectedly into other paths without saying where the new paths lead?</legend>
                        <div>
                        <CustomInput type="radio" id="question11yes" name="customRadio" label="Yes" />
                        <CustomInput type="radio" id="question11no" name="customRadio" label="No" />
                        </div>
                    </fieldset>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <legend>Are there steep inclines or ascents?</legend>
                        <div>
                        <CustomInput type="radio" id="question12yes" name="customRadio" label="Yes" />
                        <CustomInput type="radio" id="question12no" name="customRadio" label="No" />
                        </div>
                    </fieldset>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <legend>Are there steep declines or descents?</legend>
                        <div>
                        <CustomInput type="radio" id="question13yes" name="customRadio" label="Yes" />
                        <CustomInput type="radio" id="question13no" name="customRadio" label="No" />
                        </div>
                    </fieldset>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <legend>Are there sections of the trail where you will need to lift yourself up onto another area or support yourself in any manner where your feet would be suspended in the air?</legend>
                        <div>
                        <CustomInput type="radio" id="question14yes" name="customRadio" label="Yes" />
                        <CustomInput type="radio" id="question14no" name="customRadio" label="No" />
                        </div>
                    </fieldset>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <legend>Are there stairs anywhere on the trail?</legend>
                        <div>
                        <CustomInput type="radio" id="question15yes" name="customRadio" label="Yes" />
                        <CustomInput type="radio" id="question15no" name="customRadio" label="No" />
                        </div>
                    </fieldset>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <legend>Is the trail made up of mostly solid, compact ground?</legend>
                        <div>
                        <CustomInput type="radio" id="question16yes" name="customRadio" label="Yes" />
                        <CustomInput type="radio" id="question16no" name="customRadio" label="No" />
                        </div>
                    </fieldset>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <legend>Is the trail near any busy roads or streets?</legend>
                        <div>
                        <CustomInput type="radio" id="question17yes" name="customRadio" label="Yes" />
                        <CustomInput type="radio" id="question17no" name="customRadio" label="No" />
                        </div>
                    </fieldset>
                </FormGroup>
                <FormGroup>
                    <fieldset>
                        <legend>Did you need to jump over or duck under any obstacles?</legend>
                        <div>
                        <CustomInput type="radio" id="question18yes" name="customRadio" label="Yes" />
                        <CustomInput type="radio" id="question18no" name="customRadio" label="No" />
                        </div>
                    </fieldset>
                </FormGroup>
            </Form>
    </>
  );
}

export default Questionnaire;