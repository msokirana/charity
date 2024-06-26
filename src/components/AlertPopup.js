import React, { useState } from 'react';
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

const AlertPopup = ({title,desc,visible,handleOk,handleCancel}) => {



  return (
    <Alert color="info" isOpen={visible} >
    <h4 className="alert-heading">{title}</h4>
    <p>{desc}</p>
    <hr />
    <div className="d-flex justify-content-end">
      <Button color="primary" onClick={handleOk}>
      Do not reject
      </Button>{' '}
      <Button color="secondary" onClick={handleCancel}>
        Reject
      </Button>
    </div>
  </Alert>
  );
};

export default AlertPopup;
