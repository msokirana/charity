import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Container, Card, CardBody, CardFooter, CardTitle, CardText, Alert } from "reactstrap";
import "../styles.scss";
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from "../../context/AuthContext";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../../services/Api";
import { API_LOGIN, API_SOCIAL_LOGIN } from "../../services/ApiConstant";
// import BankStatementReader from "../BankStatementReader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const validateEmail = (email) => {
    // Regular expression for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    // if (!validateEmail(email)) {
    //   setError('Invalid email format.');
    //   return;
    // }

    try {
      const response = await post(API_LOGIN, { username:email, password });
      console.log("response====",response)
      localStorage.setItem('token', response.token);
      localStorage.setItem('user_role', response?.user_role);
      setSuccessMessage(response.message);
      setError('');
      navigate('/')

       window.location.reload();;
      // Perform actions after successful login, such as setting tokens in local storage, etc.
    } catch (error) {

      setError('Something went wrong. Please try again later.');
    }
  };


  const onSocialLogin = async (e) => {
    // Make API call here
    try {
      // Assuming you have an API function called changePassword
      // Replace the API function and endpoint with your own

      const response = await post(API_SOCIAL_LOGIN,{"domain": "google",email:"mohit.raj@okirana.com",token:e?.credential})
      
      setSuccessMessage(response.data.message);
      setError('');
      login();

    } catch (error) {
      setError('Something went wrong. Please try again later.');
    }
  };


  return (
    <Container className="mt-5">
      <Card style={{width:"70%",height:'70%', margin:'8% auto',display:'flex',flexDirection:'row'}}>
      <CardBody className="login-card-body">
          
        </CardBody>
        <CardBody style={{width:'50%',padding:50}}>
          <CardTitle tag="h4" className="text-center">Hello ! Welcome Back</CardTitle>
          <CardTitle tag="p" className="text-center">Log in with your credential.</CardTitle>
          <br/>
          {error && <Alert color="danger">{error}</Alert>}
        {successMessage && <Alert color="success">{successMessage}</Alert>}
          <br/>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="email" style={{fontSize:14}}>Username</Label>
              <Input
                name="email"
                id="email"
                placeholder="Enter your email/phone"
                value={email}
                onChange={handleEmailChange}
                style={{fontSize:14,width:'100%'}}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password" style={{fontSize:14,marginTop:30,display:'flex',justifyContent:'space-between'}}>
                <div>Password</div>
              <a href="/forgot-password" style={{fontSize:13}}>Forgot Password?</a>
              </Label>
              <Input
                type="password"
                name="password"
                style={{fontSize:14,width:'100%'}}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
              />
            </FormGroup>
            <Button type="submit" color="primary" style={{width:'100%',background:'#3AB6E2',border:'none'}}className="mt-3">
              Login</Button>
          </Form>
          <br/>
          <CardText className="text-center">Or</CardText>
          
          <GoogleLoginButton onSuccess={(e)=> onSocialLogin(e)}/>

        </CardBody>
        
       
      </Card>

      {/* <BankStatementReader /> */}
    </Container>
  );
};

export default Login;
