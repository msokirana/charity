import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert
} from 'reactstrap';
import { API_CHANGE_PASSWORD, API_RESET_PASSWORD } from '../../services/ApiConstant';
import { post } from '../../services/Api';
import Header from '../../layouts/Header';
import { useParams } from 'react-router-dom';

const NewPasswordCard = () => {

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const params = useParams();


    console.log(params)
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === 'currentPassword') setCurrentPassword(value);
      else if (name === 'newPassword') setNewPassword(value);
      else if (name === 'confirmPassword') setConfirmPassword(value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!newPassword || !confirmPassword) {
        setError('All fields are required');
        return;
      }
      if (newPassword !== confirmPassword) {
        setError('New password and confirm password do not match');
        return;
      }
      // Make API call here
      try {
        // Assuming you have an API function called changePassword
        // Replace the API function and endpoint with your own

        const response = await post(API_RESET_PASSWORD+params?.token+"/",{new_password:newPassword,confirm_password:confirmPassword})
        
        setSuccessMessage(response.data.message);
        setError('');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } catch (error) {
        setError('Failed to change password. Please try again later.');
      }
    };

  return (
    <>
    {/* <Header title="Change Password" isHide={true} /> */}
    <Card style={{width:"50%",margin:'50px auto'}}>
       <CardBody>
        <CardTitle tag="h5">Change Password</CardTitle>

        <br /> 
        {error && <Alert color="danger">{error}</Alert>}
        {successMessage && <Alert color="success">{successMessage}</Alert>}
        <Form onSubmit={handleSubmit}>
        
          <FormGroup>
            <h5 className="card-title" style={{ fontSize: 14, width: 280 }}>New Password</h5>
            <Input
              type="password"
              name="newPassword"
              id="newPassword"
              value={newPassword}
              onChange={handleChange}
              placeholder="Enter your new password"
            />
          </FormGroup>
          <FormGroup>
          <h5 className="card-title" style={{ fontSize: 14, width: 280 }}>Confirm New Password</h5>
            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
            />
          </FormGroup>
          <Button color="primary" type="submit">Change Password</Button>
        </Form>
      </CardBody>
    </Card>
    </>
  );
};

export default NewPasswordCard;
