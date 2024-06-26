import React from "react";
// import { GoogleLogin } from "react-google-login";
import GoogleLogo from "../assets/images/logos/glogo.png"; // Import Google logo SVG
import { Button } from "reactstrap";
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  const clientId = "910266827305-329en2ft24q44dqm2pvpsdetcbajs14p.apps.googleusercontent.com"

  const handleSuccess = (response) => {
    console.log("Google login successful:", response);
    // onSuccess(response);
  };

  const handleFailure = (error) => {
    console.error("Google login failed:", error);
    // onFailure(error);
  };

  return (
    // <GoogleLogin
    //   clientId={clientId}
    //   onSuccess={handleSuccess}
    //   onFailure={handleFailure}
    //   // cookiePolicy={"single_host_origin"}
    //   // responseType=""
    //   render={(renderProps) => (
    //     <Button style={{background:'#fff',width:'100%'}} onClick={renderProps.onClick} disabled={renderProps.disabled} className="google-login-button">
    //       <img style={{height:18,width:18}} src={GoogleLogo} alt="Google logo" />
    //       <span style={{color:'#000',marginLeft:15,}}>Login with Google</span>
    //     </Button>
    //   )}
    // />
    <GoogleLogin
    size='large'
    width={350}
    style={{background:'#fff',width:'100%'}}
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
    onSuccess(credentialResponse)
  }}
  containerProps={{width:'100%'}}
  onError={() => {
    console.log('Login Failed');
  }}
  
/>
  );
};

export default GoogleLoginButton;
