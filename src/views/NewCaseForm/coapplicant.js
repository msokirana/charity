import React, { useState } from "react";
import "../styles.scss";
import {
  Row,
  Col,
  CardBody,
  CardTitle,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  InputGroup,
  InputGroupText,
  Card,
} from "reactstrap";
import {
  CardContent,
  Typography,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { API_FILE_UPLOAD } from "../../services/ApiConstant";
import { postFile } from "../../services/Api";

function CoApplicant({ coapplicant, handleChangeCoApplicant,handleChangeCoApplicantDoc }) {

  const handleFileChange = async (event, label) => {
    const file = event.target.files[0];
    console.log("File selected:", file);
    if (file) {
      // Create a new FormData object
      const formData = new FormData();
      formData.append("file", file);

      try {
        // Call the post function
        const response = await postFile(API_FILE_UPLOAD, formData);
        console.log("File uploaded successfully:", response);
        handleChangeCoApplicantDoc(label, response?.file);
        // handleChangePurpose(response?.file, label, index)
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <Card>
      <CardBody>
      <h5 className="card-title" style={{ fontSize: 14,fontStyle:'italic',textAlign:'center' }}>Skip this step if there is no co-applicant</h5>
      <br/>
      <Row className="form-group-input">
          <Col md="4">
            <h5 className="card-title required" style={{ fontSize: 14 }}>Phone Number</h5>
          </Col>
          <Col md="6">
            <Input
              type="text"
              name="phoneno"
              value={coapplicant.phoneno}
              onChange={handleChangeCoApplicant}
            />
          </Col>
        </Row>
        <Row className="form-group-input">
          <Col md="4">
            <h5 style={{ fontSize: 14 }}>Email</h5>
          </Col>
          <Col md="6">
            <Input
              type="email"
              name="email"
              value={coapplicant.email}
              onChange={handleChangeCoApplicant}
            />
          </Col>
        </Row>
        <Row className="form-group-input">
          <Col md="4">
            <h5 className="card-title required" style={{ fontSize: 14 }}>First Name</h5>
          </Col>

          <Col md="6">
            <Input
              type="text"
              name="firstname"
              value={coapplicant.firstname}
              onChange={handleChangeCoApplicant}
            />
          </Col>
        </Row>
        <Row className="form-group-input ">
          <Col md="4">
            <h5 style={{ fontSize: 14 }} className="card-title required" >Last Name</h5>
          </Col>
          <Col md="6">
            <Input
              type="text"
              name="lastname"
              value={coapplicant.lastname}
              onChange={handleChangeCoApplicant}
            />
          </Col>
        </Row>
        <Row className="form-group-input">
          <Col md="4">
            <h5 style={{ fontSize: 14 }}>Gender</h5>
          </Col>
          <Col md="6">
            <Input
              type="select"
              name="gender"
              value={coapplicant.gender}
              onChange={handleChangeCoApplicant}
            >
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </Input>
          </Col>
        </Row>
        <Row className="form-group-input">
          <Col md="4">
            <h5 style={{ fontSize: 14 }}>Date of Birth</h5>
          </Col>
          <Col md="6">
            <Input
              type="date"
              name="dob"
              value={coapplicant.dob}
              onChange={handleChangeCoApplicant}
            />
          </Col>
        </Row>
      
        <Row className="form-group-input">
          <Col md="4">
            <h5 style={{ fontSize: 14 }}>Nationality</h5>
          </Col>
          <Col md="6">
            <Input
              type="text"
              name="nationality"
              value={coapplicant.nationality}
              onChange={handleChangeCoApplicant}
            />
          </Col>
        </Row>
        <Row className="form-group-input">
          <Col md="4">
            <h5 style={{ fontSize: 14 }}>Religion</h5>
          </Col>
          <Col md="6">
            <Input
              type="text"
              name="religion"
              value={coapplicant.religion}
              onChange={handleChangeCoApplicant}
            />
          </Col>
        </Row>
        <Row className="form-group-input">
          <Col md="4">
            <h5 style={{ fontSize: 14 }}>Marital Status</h5>
          </Col>
          <Col md="6">
            <Input
              type="select"
              name="marital_status"
              value={coapplicant.marital_status}
              onChange={handleChangeCoApplicant}
            >
              <option value="">Select Marital Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </Input>
          </Col>
        </Row>
        <Row className="form-group-input">
          <Col md="4">
            <h5 style={{ fontSize: 14 }}>Highest Education</h5>
          </Col>
          <Col md="6">
            <Input
              type="text"
              name="highest_edu"
              value={coapplicant.highest_edu}
              onChange={handleChangeCoApplicant}
            />
          </Col>
        </Row>
        <Row className="form-group-input">
          <Col md="4">
            <h5 style={{ fontSize: 14 }}>Profession</h5>
          </Col>
          <Col md="6">
            <Input
              type="text"
              name="profession"
              value={coapplicant.profession}
              onChange={handleChangeCoApplicant}
            />
          </Col>
        </Row>
        <Row className="form-group-input">
          <Col md="4">
            <h5 style={{ fontSize: 14 }}>Monthly Personal Income</h5>
          </Col>
          <Col md="6">
            <Input
              type="number"
              name="monthly_income"
              value={coapplicant.monthly_income}
              onChange={handleChangeCoApplicant}
            />
          </Col>
        </Row>
        <Row className="form-group-input">
          <Col md="4">
            <h5 style={{ fontSize: 14 }}>Monthly Family Income</h5>
          </Col>
          <Col md="6">
            <Input
              type="number"
              name="tot_fam_income"
              value={coapplicant.tot_fam_income}
              onChange={handleChangeCoApplicant}
            />
          </Col>
        </Row>
        <Row className="form-group-input">
          <Col md="4">
            <h5 style={{ fontSize: 14 }}>No. of Dependents</h5>
          </Col>
          <Col md="6">
            <Input
              type="text"
              name="tot_dependants"
              value={coapplicant.tot_dependants}
              onChange={handleChangeCoApplicant}
            />
          </Col>
        </Row>
        <Row className="form-group-input">
          <Col md="4">
            <h5 style={{ fontSize: 14 }}>CIBIL Score</h5>
          </Col>
          <Col md="6">
            <Input
              type="text"
              name="cibil_score"
              value={coapplicant.cibil_score}
              onChange={handleChangeCoApplicant}
            />
          </Col>
        </Row>
        
      
        {/* You can add other file upload fields similarly */}
        <Row className="form-group-input">
          <Col md="4">
            <h5 style={{ fontSize: 14 }}>Guarantor</h5>
          </Col>
          <Col md="6">
            <Input
              type="select"
              name="is_guarantor"
              value={coapplicant.is_guarantor}
              onChange={handleChangeCoApplicant}
            >
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </Input>
          </Col>
        </Row>

        {/* Address Info */}
        <Row className="form-group-input">
          <Col md="4">
            <h5 style={{ fontSize: 14 }}>Address Line 1</h5>
          </Col>
          <Col md="6">
            <Input
              type="text"
              name="current_address.address_line1"
              value={coapplicant?.address?.current_address?.address_line1}
              onChange={handleChangeCoApplicant}
            />
          </Col>
        </Row>
        <Row className="form-group-input">
          <Col md="4">
            <h5 style={{ fontSize: 14 }}>Address Line 2</h5>
          </Col>
          <Col md="6">
            <Input
              type="text"
              name="current_address.address_line2"
              value={coapplicant?.address?.current_address?.address_line2}
              onChange={handleChangeCoApplicant}
            />
          </Col>
        </Row>
        <Row className="form-group-input">
          <Col md="4">
            <h5 style={{ fontSize: 14 }}>Town/City</h5>
          </Col>
          <Col md="6">
            <Input
              type="text"
              name="current_address.cur_town"
              value={coapplicant?.address?.current_address?.cur_town}
              onChange={handleChangeCoApplicant}
            />
          </Col>
        </Row>
        <Row className="form-group-input">
          <Col md="4">
            <h5 style={{ fontSize: 14 }}>State</h5>
          </Col>
          <Col md="6">
            <Input
              type="text"
              name="current_address.state"
              value={coapplicant?.address?.current_address?.state}
              onChange={handleChangeCoApplicant}
            />
          </Col>
        </Row>

        <Row className="form-group-input">
          <Col md="4">
            <h5 style={{ fontSize: 14 }}>District</h5>
          </Col>
          <Col md="6">
            <Input
              type="text"
              name="current_address.district"
              value={coapplicant?.address?.current_address?.district}
              onChange={handleChangeCoApplicant}
            />
          </Col>
        </Row>
        <Row className="form-group-input">
          <Col md="4">
            <h5 style={{ fontSize: 14 }}>Country</h5>
          </Col>
          <Col md="6">
            <Input
              type="text"
              name="current_address.country"
              value={coapplicant?.address?.current_address?.country}
              onChange={handleChangeCoApplicant}
            />
          </Col>
        </Row>
        <Row className="form-group-input">
          <Col md="4">
            <h5 style={{ fontSize: 14 }}>Pincode</h5>
          </Col>
          <Col md="6">
            <Input
              type="text"
              name="current_address.pincode"
              value={coapplicant?.address?.current_address?.pincode}
              onChange={handleChangeCoApplicant}
            />
          </Col>
        </Row>
        <Row className="form-group-input">
          <Col md="4">
            <h5 style={{ fontSize: 14 }}>
            Period of stay at the above address in years
            </h5>
          </Col>
          <Col md="6">
            <Input
              type="text"
              name="current_address.period_of_stay"
              value={coapplicant?.address?.current_address?.period_of_stay}
              onChange={handleChangeCoApplicant}
            />
          </Col>
        </Row>
        <Row className="form-group-input">
          <Col md="4">
            <h5 style={{ fontSize: 14 }}>Address Type</h5>
          </Col>
          <Col md="6">
            <Input
              type="select"
              name="current_address.address_type"
              value={coapplicant?.address?.current_address?.address_type}
              onChange={handleChangeCoApplicant}
            >
              <option value="">Select Address Type</option>
              <option value="permanent">Permanent</option>
              <option value="temporary">Temporary</option>
            </Input>
          </Col>
        </Row>

        <Row className="form-group-input">
          <Col md="4">
            <h5 style={{ fontSize: 14 }}>ID Proof</h5>
          </Col>
          <Col md="6">
            <Input
              type="select"
              name="identity_proof"
              value={coapplicant?.identity_proof}
              onChange={handleChangeCoApplicant}
            >
              <option value="">Select ID Proof</option>
              <option value="Aadhar">Aadhar</option>
              <option value="PAN">PAN</option>
            
              <option value="Driving License">Driving License</option>
              {/* Add other options if needed */}
            </Input>

            {coapplicant?.identity_proof && (<Input
              style={{ marginTop: 5 }}
              type="file"
              name="identity_proof_copy"
              id="identity_proof_copy"
              onChange={(e) => handleFileChange(e, "identity_proof_copy")}
            />)}
          </Col>
        </Row>
        {/* You can add other file upload fields similarly */}
        <Row className="form-group-input">
          <Col md="4">
            <h5 style={{ fontSize: 14 }}>Address Proof</h5>
          </Col>
          <Col md="6">
            <Input
              type="select"
              name="address_proof"
              value={coapplicant.address_proof}
              onChange={handleChangeCoApplicant}
            >
              <option value="">Select Address Proof</option>
              <option value="Ration Card">Ration Card</option>
              <option value="House Agreement">House Agreement</option>
              {/* Add other options if needed */}
            </Input>
            {coapplicant?.address_proof && (<Input
              style={{ marginTop: 5 }}
              type="file"
              name="address_copy"
              id="address_copy"
              onChange={(e) => handleFileChange(e, "address_copy")}
            />)}
          </Col>
        </Row>
        {/* You can add other file upload fields similarly */}
        <Row className="form-group-input">
          <Col md="4">
            <h5 style={{ fontSize: 14 }}>Income Proof</h5>
          </Col>
          <Col md="6">
            <Input
              type="select"
              name="income_proof"
              value={coapplicant.income_proof}
              onChange={handleChangeCoApplicant}
            >
              <option value="">Select Income Proof</option>
              <option value="ITR">ITR</option>
              <option value="Salary Slip">Salary Slip</option>
              <option value="Bank Statement">Bank Statement</option>
              {/* Add other options if needed */}
            </Input>


            {coapplicant?.income_proof && (<Input
              style={{ marginTop: 5 }}
              type="file"
              name="income_copy"
              id="income_copy"
              onChange={(e) => handleFileChange(e, "income_copy")}
            />)}
          </Col>
        </Row>
      </CardBody>
      {/* Add more fields for current address */}

      {/* Other fields */}
      {/* Add more sections and fields for the remaining information */}
    </Card>
  );
}

export default CoApplicant;
