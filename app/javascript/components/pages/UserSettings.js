  
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'reactstrap';


const UserSettings = props => {
const [success, setSuccess] = useState(false);
const [modal, setModal] = useState(false);
const toggle = () => setModal(!modal);
const {
    buttonLabel,
    className
  } = props;

  const deleteProfile = () => {
     fetch(`/users/${props.match.params.id}`, {
       headers:{
         "Content-Type": "application/json"
       },
       method: "DELETE"
     })
     .then(response => {
       if (response.ok) {
         setSuccess(true)
       }
     })
   }
    return (
      <>
        {props.user_id != props.match.params.id &&
          <Redirect to="/" />
        }
        <Container>
          <h2>User Settings</h2>
          <Button color="danger" onClick={toggle}>Delete Profile</Button>
          <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
            <ModalBody>
            This is a permanent action and cannot be undone. Are you sure you want to proceed?
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick= {deleteProfile} >Delete User Profile</Button>{' '}
              <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </Container>
      </>
    );
}

export default UserSettings
