import React from 'react'
import { Button, FormGroup, Label, Input, ListGroup, ListGroupItem, ListGroupItemText } from 'reactstrap'
import { NavLink } from 'react-router-dom'


const FormEditor = props => {

  return (
    <ListGroup className="trails-profile-submission-list-wrapper">
      {props.formSubs.map((form, index) => {
        let date = form.updated_at.substring(0, 10)
        let editedDate = `${date.substring(5, 7)}-${date.substring(8, 10)}-${date.substring(0, 4)}`
        return (
          <ListGroupItem key={index}>
            <ListGroupItemText>
              You contributed trail information for <strong>{form.trail_name}</strong> on <i>{editedDate}</i>.
            </ListGroupItemText>

            <NavLink to={`/submission/${form.id}`}>
              <Button className="comments-list-item-edit-button">
                Edit
              </Button>
            </NavLink>

            <Button className="comments-list-item-delete-button" onClick={() => props.deleteFormSub(form.id)}>
              Delete
            </Button>

          </ListGroupItem>
        )
      })}
    </ListGroup>
  )
}

export default FormEditor