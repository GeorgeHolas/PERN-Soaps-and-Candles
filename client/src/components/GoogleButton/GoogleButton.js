import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleButton = ({ onSuccess, onFailure }) => {
  return (
    <GoogleLogin
      clientId="your-google-client-id"
      buttonText="Login with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleButton;