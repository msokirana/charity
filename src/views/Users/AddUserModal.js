import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

const AddUserModal = ({modalOpen,setModalOpen}) => {


  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic here
    // You can access form values using e.target.elements
  };

  return (
    <>
      {/* <Button color="primary" onClick={toggleModal}>Add User</Button> */}
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add User</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="userRole">User Role</Label>
              <Input type="select" name="user_role" id="userRole">
              <option value="admin">Admin</option>
                <option value="account_member">Account Member</option>

                {/* Add other options as needed */}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="email" name="email" id="email" />
            </FormGroup>
            <FormGroup>
              <Label for="firstName">First Name</Label>
              <Input type="text" name="first_name" id="firstName" />
            </FormGroup>
            <FormGroup>
              <Label for="lastName">Last Name</Label>
              <Input type="text" name="last_name" id="lastName" />
            </FormGroup>
            <FormGroup>
              <Label for="phoneNumber">Phone Number</Label>
              <Input type="tel" name="user_phonenumber" id="phoneNumber" />
            </FormGroup>
           
            <Button color="primary" type="submit">Submit</Button>{' '}
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AddUserModal;
