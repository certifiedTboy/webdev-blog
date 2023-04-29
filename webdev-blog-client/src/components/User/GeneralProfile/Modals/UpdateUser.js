import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import { updateUser } from "../../../../lib/generaRequestRedux/requestActions";
import ProfileModal from "./ProfileModal";

const UpdateUser = ({ onShowModal, userData }) => {
  const { isLoading, error } = useSelector((state) => state.request);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [about, setAbout] = useState(userData.about);

  const firstNameChangeHandler = (event) => {
    setFirstName(event.target.value);
  };

  const lastNameChangeHandler = (event) => {
    setLastName(event.target.value);
  };

  const aboutChangeHandler = (event) => {
    setAbout(event.target.value);
  };

  const onUpdateUserDetails = (event) => {
    event.preventDefault();

    const updateData = {
      firstName,
      lastName,
      about,
    };

    dispatch(updateUser(updateData));
  };
  return (
    <ProfileModal>
      <Modal.Header>
        <Modal.Title>
          <strong> Edit Profile </strong>
        </Modal.Title>
      </Modal.Header>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error.error}
        </div>
      )}
      {isLoading && (
        <div className="text-center mb-3">
          <div className="spinner-grow text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <Form onSubmit={onUpdateUserDetails}>
        <Modal.Body>
          <div className="form-group">
            <Form.Label>First Name</Form.Label>
            <input
              onChange={firstNameChangeHandler}
              type="text"
              className="form-control"
              value={firstName}
            />
          </div>

          <div className="form-group">
            <Form.Label>Last Name</Form.Label>
            <input
              onChange={lastNameChangeHandler}
              type="text"
              className="form-control"
              value={lastName}
            />
          </div>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>About</Form.Label>
            <Form.Control
              onChange={aboutChangeHandler}
              as="textarea"
              rows={3}
              value={about}
            />
          </Form.Group>

          <Modal.Footer>
            <Button variant="secondary" onClick={onShowModal}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Form>
    </ProfileModal>
  );
};

export default UpdateUser;
