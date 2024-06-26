import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Card, CardBody, Alert } from 'reactstrap';
import { post } from '../../services/Api';
import { API_FORGOTPASSWORD } from '../../services/ApiConstant';

const ForgotPassword = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Regular expression for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email ) {
      setError('Email is required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email format.');
      return;
    }

    try {
      const response = await post(API_FORGOTPASSWORD, { username:email });
      console.log("response====",response)
      
      setSuccessMessage(response.message);
    
      // navigate('/login')

      //  window.location.reload();
      // Perform actions after successful login, such as setting tokens in local storage, etc.
    } catch (error) {

      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <Container className="mt-5">
   <Card style={{width:"70%", margin:'8% auto',display:'flex',flexDirection:'row'}}>
    <CardBody className="login-card-body">
        
      </CardBody>
      <CardBody style={{width:'50%',padding:50}}>
                <br/> 
              <h4 className="text-center mb-4" >Forgot Password</h4>
              {error && <Alert color="danger">{error}</Alert>}
              {successMessage && <Alert color="success">{successMessage}</Alert>}
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </FormGroup>
                <Button type="submit" color="primary" style={{width:'100%',background:'#3AB6E2',border:'none'}}className="mt-3">Reset Password</Button>
                <br/>
                 <Button type="submit" color="primary" style={{width:'100%',border:"1px solid #3AB6E2", background:'#fff'}}className="mt-3">
              <Link to='/login' style={{textDecoration:'none',color:'#3AB6E2'}}>Go Back</Link></Button>
              </Form>
            </CardBody>
          </Card>
    </Container>
  );
};

export default ForgotPassword;
