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

function CaseInfo({ formData, setFormData, handleChange }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const [purposeDetails, setPurposeDetails] = useState([]);

  const handleCheckboxChange = (option) => {
    const currentIndex = formData?.collateral?.indexOf(option);
    const newChecked = [...(formData?.collateral || [])];

    if (currentIndex === -1) {
      newChecked.push(option);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setFormData({ ...formData, collateral: newChecked });
  };

  return (
    <Card style={{height:'calc(100vh - 250px)',}}>
      <CardBody>
        <Row className="form-group-input">
          <Col md="4">
            <h5 style={{ fontSize: 14 }}>Has Guarantor?</h5>
          </Col>
          <Col md="6">
            <Input
              type="select"
              name="has_guarantor"
              value={formData.has_guarantor}
              onChange={(e) => handleChange("has_guarantor", e.target.value)}
            >
              <option value="">Select</option>
              <option value={"1"}>Yes</option>
              <option value={"0"}>No</option>
            </Input>
          </Col>
        </Row>
        {formData.has_guarantor === "1" && (
          <>
            <Row className="form-group-input">
              <Col md="4">
                <h5 style={{ fontSize: 14 }}>Guarantor name:</h5>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="guarantor_name"
                  value={formData.guarantor_name}
                  onChange={(e) =>
                    handleChange("guarantor_name", e.target.value)
                  }
                />
              </Col>
            </Row>
            <Row className="form-group-input">
              <Col md="4">
                <h5 style={{ fontSize: 14 }}>Guarantor phone number:</h5>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="guarantor_phone"
                  value={formData.guarantor_phone}
                  onChange={(e) =>
                    handleChange("guarantor_phone", e.target.value)
                  }
                />
              </Col>
            </Row>
            <Row className="form-group-input">
              <Col md="4">
                <h5 style={{ fontSize: 14 }}>Guarantor email id:</h5>
              </Col>
              <Col md="6">
                <Input
                  type="email"
                  name="guarantor_email"
                  value={formData.guarantor_email}
                  onChange={(e) =>
                    handleChange("guarantor_email", e.target.value)
                  }
                />
              </Col>
            </Row>
          </>
        )}

        <Row className="form-group-input">
          <Col md="4">
            <h5 style={{ fontSize: 14 }} className="card-title required" >Requested Grant Amount</h5>
          </Col>
          <Col md="6">
            <Input
              type="number"
              name="request_amt"
              value={formData.request_amt}
              onChange={(e) => handleChange("request_amt", e.target.value)}
            />
          </Col>
        </Row>
        <Row className="form-group-input">
          <Col md="4">
            <h5 style={{ fontSize: 14 }}>Referred By:</h5>
          </Col>
          <Col md="6">
            <Input
              type="text"
              name="referred_by"
              value={formData.referred_by}
              onChange={(e) => handleChange("referred_by", e.target.value)}
            />
          </Col>
        </Row>
        <Row className="form-group-input">
          <Col md="4">
            <h5 style={{ fontSize: 14 }}>Grant Repayment</h5>
          </Col>
          <Col md="6">
            <Input
              type="select"
              name="grant_type"
              value={formData.grant_type}
              onChange={(e) => handleChange("grant_type", e.target.value)}
            >
              <option value="">Select</option>
              <option value="Partially">Partially</option>
              <option value="Repayble">Repayble</option>
              <option value="Non Repayable">Non Repayable</option>
              <option value="In Service">In Service</option>
            </Input>
          </Col>
        </Row>
        <Row className="form-group-input">
          <Col md="4">
            <h5 style={{ fontSize: 14 }}>Disbursement Schedule:</h5>
          </Col>
          <Col md="6">
            <Input
              type="select"
              name="disbursement_schedule"
              value={formData.disbursement_schedule}
              onChange={(e) =>
                handleChange("disbursement_schedule", e.target.value)
              }
            >
              <option value="">Select</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="half-yearly">Half-Yearly</option>
              <option value="yearly">Yearly</option>
              <option value="one shot">One Shot</option>
            </Input>
          </Col>
        </Row>
        {/* <Row className="form-group-input">
          <Col md="4">
            <h5 style={{ fontSize: 14, }}>Collateral & Risks:</h5>
          </Col>
          <Col md="6">
            <Dropdown
              style={{ width: "100%" }}
              isOpen={dropdownOpen}
              toggle={toggleDropdown}
            >
              <DropdownToggle
                style={{ width: "93%" }}
                className="custom-input"
                caret
              >
                Collateral & Risks
              </DropdownToggle>
              <DropdownMenu>
                {["Property", "Gold", "Unsecured", "Vehicle", "Others"].map(
                  (option, index) => (
                    <DropdownItem
                      key={index}
                      onClick={() => handleCheckboxChange(option)}
                    >
                      <Input
                        type="checkbox"
                        checked={formData?.collateral?.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                      />{" "}
                      {option}
                    </DropdownItem>
                  )
                )}
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row> */}
        <Row className="form-group-input">
          <Col md="4">
            <h5 style={{ fontSize: 14 }}>Collaterals or Securities to be provided against the grant:</h5>
          </Col>
          <Col md="6">
            <Input
              type="select"
              name="collateral"
              value={formData.collateral}
              onChange={(e) => handleChange("collateral", e.target.value)}
            >
              <option value="">Select</option>
              <option value="Property">Property</option>
              <option value="Gold">Gold</option>
              <option value="Unsecured">Unsecured</option>
              <option value="Vehicle">Vehicle</option>
              <option value="Others">Others</option>
            </Input>
          </Col>
        </Row>
   
      </CardBody>
      {/* Add more fields for current address */}

      {/* Other fields */}
      {/* Add more sections and fields for the remaining information */}
    </Card>
  );
}

export default CaseInfo;
