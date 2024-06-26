import React, { useEffect, useState } from "react";
import { FormGroup, Row, Col, Label, Input, Card, CardBody } from "reactstrap";
import { postFile } from "../../services/Api";
import { API_FILE_UPLOAD } from "../../services/ApiConstant";

function Benefactor({ formData, handleChange }) {
  const [address, setAddress] = useState({
    current_address: {
      address_line1: "",
      cur_town: "",
      city: "",
      district: "",
      state: "",
      country: "",
      pincode: "",
      address_type: "temporary",
      period_of_stay: "",
    },
    permanent_address: {
      address_line1: "sdf",
      cur_town: "sdf",
      city: "sfsdf",
      district: "sdf",
      state: "sdf",
      country: "sdf",
      pincode: "sdfsd",
      address_type: "permanent",
      period_of_stay: "sdfsd",
    },
  });

  const [isMount, setIsMount] = useState(false);

  const handleChangeAddress = (e, section, field) => {
    const { name, value } = e?.target || {};
    setAddress((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [field]: value,
      },
    }));
  };

  useEffect(() => {
    if (!isMount) {
      setIsMount(true);
    } else {
      handleChange("address", address);
    }
    // handleChange("address",address)
    console.log("formData", formData);
    if (!formData?.address?.permanent_address) {
      // handleChange("address_type", true);
    }
  }, [address]);

  const [height, setHeight] = useState();

  useEffect(() => {
    window.innerWidth < 768
      ? setHeight(window.innerHeight * 0.77)
      : setHeight(window.innerHeight * 0.4);
  }, []);

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
        handleChange(label, response?.file);
        // handleChangePurpose(response?.file, label, index)
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <Card>
      <CardBody>
        <Row className="form-group-input">
          <Col md="4">
            <h5 className="card-title required" style={{ fontSize: 14 }}>
              Phone Number
            </h5>
          </Col>
          <Col md="6">
            <Input
              type="text"
              name="phoneno"
              id="phone"
              placeholder="Enter phone number"
              onChange={(e) => handleChange("phoneno", e.target.value)}
              value={formData.phoneno}
            />
          </Col>
        </Row>

        <Row className="form-group-input">
          <Col md="4">
            <h5 className="card-title" style={{ fontSize: 14 }}>
              Email
            </h5>
          </Col>
          <Col md="6">
            <Input
              type="text"
              name="email"
              id="email"
              placeholder="Enter email address"
              onChange={(e) => handleChange("email", e.target.value)}
              value={formData.email}
            />
          </Col>
        </Row>

        <Row className="form-group-input">
          <Col md="4">
            <h5 className="card-title required" style={{ fontSize: 14 }}>
              First Name
            </h5>
          </Col>
          <Col md="6">
            <Input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter first name"
              onChange={(e) => handleChange("firstname", e.target.value)}
              value={formData.firstname}
            />
          </Col>
        </Row>

        <Row className="form-group-input">
          <Col md="4">
            <h5 className="card-title required" style={{ fontSize: 14 }}>
              Last Name
            </h5>
          </Col>
          <Col md="6">
            <Input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Enter last name"
              onChange={(e) => handleChange("lastname", e.target.value)}
              value={formData.lastname}
            />
          </Col>
        </Row>
        <Row className="form-group-input">
          <Col md="4">
            <h5 className="card-title" style={{ fontSize: 14 }}>
              Profile Picture
            </h5>
          </Col>
          <Col md="6">
            <Input
              type="file"
              name="profile_pic"
              id="profile_pic"
              // onChange={(e) => handleFileChange(e, "profile_pic")}
              onChange={(e) =>
                handleFileChange(e, "profile_pic")

              }
               accept=".jpg,.jpeg,.png"
            />
          </Col>
        </Row>

        <Row className="form-group-input">
          <Col md="4">
            <h5 className="card-title" style={{ fontSize: 14 }}>
              Gender
            </h5>
          </Col>
          <Col md="6">
            <Input
              type="select"
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value={"M"}>Male</option>
              <option value={"F"}>Female</option>
              <option Value="O">Other</option>
            </Input>
          </Col>
        </Row>

        <Row className="form-group-input">
          <Col md="4">
            <h5 className="card-title" style={{ fontSize: 14 }}>
              Date of Birth
            </h5>
          </Col>
          <Col md="6">
            <Input
              type="date"
              name="dob"
              id="dob"
              onChange={(e) => handleChange("dob", e.target.value)}
              value={formData.dob}
            />
          </Col>
        </Row>

        <Row className="form-group-input">
          <Col md="4">
            <h5 className="card-title" style={{ fontSize: 14 }}>
              Nationality
            </h5>
          </Col>
          <Col md="6">
            <Input
              type="select"
              name="nationality"
              id="nationality"
              onChange={(e) => handleChange("nationality", e.target.value)}
              value={formData.nationality}
            >
              <option value="">Select nationality</option>
              <option value="Indian">Indian</option>
              <option value="American">American</option>
              {/* Add more options as needed */}
            </Input>
          </Col>
        </Row>

        <Row className="form-group-input">
          <Col md="4">
            <h5 className="card-title" style={{ fontSize: 14 }}>
              Religion
            </h5>
          </Col>
          <Col md="6">
            <Input
              type="select"
              name="religion"
              id="religion"
              onChange={(e) => handleChange("religion", e.target.value)}
              value={formData.religion}
            >
              <option value="">Select religion</option>
              <option value="Hindu">Hinduism</option>
              <option value="Christianity">Christianity</option>
              {/* Add more options as needed */}
            </Input>
          </Col>
        </Row>

        <Row className="form-group-input">
          <Col md="4">
            <h5 className="card-title" style={{ fontSize: 14 }}>
              Marital Status
            </h5>
          </Col>
          <Col md="6">
            <Input
              type="select"
              name="marital_status"
              id="marital_status"
              onChange={(e) => handleChange("marital_status", e.target.value)}
              value={formData.marital_status}
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
            <h5 className="card-title" style={{ fontSize: 14 }}>
              Highest Education
            </h5>
          </Col>
          <Col md="6">
            <Input
              type="text"
              name="highest_edu"
              id="highest_edu"
              onChange={(e) => handleChange("highest_edu", e.target.value)}
              value={formData.highest_edu}
            />
          </Col>
        </Row>

        <Row className="form-group-input">
          <Col md="4">
            <h5 className="card-title" style={{ fontSize: 14 }}>
              Profession
            </h5>
          </Col>
          <Col md="6">
            <Input
              type="text"
              name="profession"
              id="profession"
              onChange={(e) => handleChange("profession", e.target.value)}
              value={formData.profession}
            />
          </Col>
        </Row>

        <Row className="form-group-input">
          <Col md="4">
            <h5 className="card-title" style={{ fontSize: 14 }}>
              Monthly Personal Income
            </h5>
          </Col>
          <Col md="6">
            <Input
              type="number"
              name="monthly_income"
              id="monthly_income"
              onChange={(e) => handleChange("monthly_income", e.target.value)}
              value={formData.monthly_income}
            />
          </Col>
        </Row>
        <Row className="form-group-input">
          <Col md="4">
            <h5 className="card-title" style={{ fontSize: 14 }}>
              Monthly Family Income
            </h5>
          </Col>
          <Col md="6">
            <Input
              type="number"
              name="tot_fam_income"
              id="tot_fam_income"
              onChange={(e) => handleChange("tot_fam_income", e.target.value)}
              value={formData.tot_fam_income}
            />
          </Col>
        </Row>
        <Row className="form-group-input">
          <Col md="4">
            <h5 className="card-title" style={{ fontSize: 14 }}>
              CIBIL Score
            </h5>
          </Col>
          <Col md="6">
            <Input
              type="number"
              name="cibil_score"
              id="cibil_score"
              onChange={(e) => handleChange("cibil_score", e.target.value)}
              value={formData.cibil_score}
            />
          </Col>
        </Row>

        <Row className="form-group-input">
          <Col md="4">
            <h5 className="card-title" style={{ fontSize: 14 }}>
              No. of Dependents
            </h5>
          </Col>
          <Col md="6">
            <Input
              type="text"
              name="tot_dependants"
              id="tot_dependants"
              onChange={(e) => handleChange("tot_dependants", e.target.value)}
              value={formData.tot_dependants}
            />
          </Col>
        </Row>

        <Row className="form-group-input">
          <Col md="4">
            <h5 className="card-title" style={{ fontSize: 14 }}>
              Applying For
            </h5>
          </Col>
          <Col md="6">
            <Input
              type="select"
              name="application_type"
              id="application_type"
              onChange={(e) => handleChange("application_type", e.target.value)}
              value={formData.application_type}
            >
              <option>Select</option>
              <option>Self</option>
              <option>Spouse</option>
              <option>Child</option>
              <option>Relative</option>
              <option>Sibling</option>
              <option>Others</option>
            </Input>
          </Col>
        </Row>

        <Row className="form-group-input">
          <Col md="4">
            <h5 className="card-title" style={{ fontSize: 14 }}>
              Address Line 1
            </h5>
          </Col>
          <Col md="6">
            <Input
              type="text"
              name="address_line1"
              id="address_line1"
              placeholder="Enter House No/Apartment No & Name:"
              onChange={(e) =>
                handleChangeAddress(e, "current_address", "address_line1")
              }
              value={formData?.address?.current_address?.address_line1}
            />
          </Col>
        </Row>

        <Row className="form-group-input">
          <Col md="4">
            <h5 className="card-title" style={{ fontSize: 14 }}>
              Address Line 2
            </h5>
          </Col>
          <Col md="6">
            <Input
              type="text"
              name="cur_town"
              id="cur_town"
              placeholder="Enter Street Name/No & Area"
              onChange={(e) =>
                handleChangeAddress(e, "current_address", "cur_town")
              }
              value={formData?.address?.current_address?.cur_town}
            />
          </Col>
        </Row>

        <Row className="form-group-input">
          <Col md="4">
            <h5 className="card-title" style={{ fontSize: 14 }}>
              Enter Village/Town/City:
            </h5>
          </Col>
          <Col md="6">
            <Input
              type="text"
              name="city"
              id="city"
              onChange={(e) =>
                handleChangeAddress(e, "current_address", "city")
              }
              value={formData?.address?.current_address?.city}
            />
          </Col>
        </Row>

        <Row className="form-group-input">
          <Col md="4">
            <h5 className="card-title" style={{ fontSize: 14 }}>
              State
            </h5>
          </Col>
          <Col md="6">
            <Input
              type="text"
              name="state"
              id="state"
              onChange={(e) =>
                handleChangeAddress(e, "current_address", "state")
              }
              value={formData.address.current_address.state}
            />
          </Col>
        </Row>

        <Row className="form-group-input">
          <Col md="4">
            <h5 className="card-title" style={{ fontSize: 14 }}>
              District
            </h5>
          </Col>
          <Col md="6">
            <Input
              type="text"
              name="district"
              id="district"
              onChange={(e) =>
                handleChangeAddress(e, "current_address", "district")
              }
              value={formData.address.current_address.district}
            />
          </Col>
        </Row>

        <Row className="form-group-input">
          <Col md="4">
            <h5 className="card-title" style={{ fontSize: 14 }}>
              Pincode
            </h5>
          </Col>
          <Col md="6">
            <Input
              type="text"
              name="pincode"
              id="pincode"
              onChange={(e) =>
                handleChangeAddress(e, "current_address", "pincode")
              }
              value={formData.address.current_address.pincode}
            />
          </Col>
        </Row>

        <Row className="form-group-input">
          <Col md="4">
            <h5 className="card-title" style={{ fontSize: 14 }}>
              Country
            </h5>
          </Col>
          <Col md="6">
            <Input
              type="select"
              name="country"
              id="country"
              onChange={(e) =>
                handleChangeAddress(e, "current_address", "country")
              }
              value={formData?.address?.current_address?.country}
            >
              <option value="">Select Country</option>
              <option value="india">India</option>
            </Input>
          </Col>
        </Row>

        <Row className="form-group-input">
          <Col md="4">
            <h5 className="card-title" style={{ fontSize: 14 }}>
              Period of stay at the above address in years
            </h5>
          </Col>
          <Col md="6">
            <Input
              type="text"
              name="period_of_stay"
              id="period_of_stay"
              onChange={(e) =>
                handleChangeAddress(e, "current_address", "period_of_stay")
              }
              value={formData?.address?.current_address?.period_of_stay}
            />
          </Col>
        </Row>

        <Row className="form-group-input" check>
          <Col md="8">
            <Label check style={{ display: "flex", alignItems: "center" }}>
              Current and permanent address are the same
              <Input
                type="checkbox"
                name="address_type"
                id="address_type"
                checked={formData?.address_type}
                onChange={(e) => handleChange("address_type", e.target.checked)}
                style={{ marginLeft: 10 }}
              />
            </Label>
          </Col>
        </Row>

        {!formData?.address_type && (
          <>
            <Row className="form-group-input">
              <Col md="4">
                <h5 className="card-title" style={{ fontSize: 14 }}>
                Address Line 1
                </h5>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="address_line1"
                  id="p_address_line1"
                  placeholder="Enter House No/Apartment No & Name:"
                  onChange={(e) =>
                    handleChangeAddress(e, "permanent_address", "address_line1")
                  }
                  value={formData?.address?.permanent_address?.address_line1}
                />
              </Col>
            </Row>

            <Row className="form-group-input">
              <Col md="4">
                <h5 className="card-title" style={{ fontSize: 14 }}>
                Address Line 2
                </h5>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="cur_address_line2"
                  id="cur_address_line2"
                  placeholder="Enter Street Name/No & Area"
                  onChange={(e) =>
                    handleChangeAddress(e, "permanent_address", "cur_town")
                  }
                  value={formData?.address?.permanent_address?.cur_town}
                />
              </Col>
            </Row>

            <Row className="form-group-input">
              <Col md="4">
                <h5 className="card-title" style={{ fontSize: 14 }}>
                  Enter Village/Town/City:
                </h5>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="city"
                  onChange={(e) =>
                    handleChangeAddress(e, "permanent_address", "city")
                  }
                  value={formData?.address?.permanent_address?.period_of_stay}
                />
              </Col>
            </Row>

            <Row className="form-group-input">
              <Col md="4">
                <h5 className="card-title" style={{ fontSize: 14 }}>
                  State
                </h5>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="state"
                  onChange={(e) =>
                    handleChangeAddress(e, "permanent_address", "state")
                  }
                  value={formData?.address?.permanent_address?.period_of_stay}
                />
              </Col>
            </Row>

            <Row className="form-group-input">
              <Col md="4">
                <h5 className="card-title" style={{ fontSize: 14 }}>
                  District
                </h5>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="district"
                  onChange={(e) =>
                    handleChangeAddress(e, "permanent_address", "district")
                  }
                  value={formData?.address?.permanent_address?.period_of_stay}
                />
              </Col>
            </Row>

            <Row className="form-group-input">
              <Col md="4">
                <h5 className="card-title" style={{ fontSize: 14 }}>
                  Pincode
                </h5>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="pincode"
                  onChange={(e) =>
                    handleChangeAddress(e, "permanent_address", "pincode")
                  }
                  value={formData?.address?.permanent_address?.period_of_stay}
                />
              </Col>
            </Row>

            <Row className="form-group-input">
              <Col md="4">
                <h5 className="card-title" style={{ fontSize: 14 }}>
                  Country
                </h5>
              </Col>
              <Col md="6">
                <Input
                  type="select"
                  name="country"
                  onChange={(e) =>
                    handleChangeAddress(e, "permanent_address", "country")
                  }
                  value={formData?.address?.permanent_address?.country}
                >
                  <option value="">Select Country</option>
                  <option value="india">India</option>
                  {/* Map countries here */}
                </Input>
              </Col>
            </Row>

            <Row className="form-group-input">
              <Col md="4">
                <h5 className="card-title" style={{ fontSize: 14 }}>
                  Period of stay at the above address in years
                </h5>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="period_of_stay"
                  onChange={(e) =>
                    handleChangeAddress(
                      e,
                      "permanent_address",
                      "period_of_stay"
                    )
                  }
                  value={formData?.address?.permanent_address?.period_of_stay}
                />
              </Col>
            </Row>
          </>
        )}

        {/* <Row className="form-group-input">
          <Col md="4">
            <h5 className="card-title" style={{ fontSize: 14 }}>
              Proof of Identity
            </h5>
          </Col>
          <Col md="6">
            <Input
              type="select"
              name="identity_proof"
              id="identity_proof"
              onChange={(e) => handleChange("identity_proof", e.target.value)}
              value={formData.applicantType}
            >
              <option>Select </option>
              <option value={"Passport"}>Passport</option>
              <option value={"License"}>Driver's License</option>
              <option value={"IdentityCard"}>National Identity Card</option>
              <option value={"Aadhaar"}>Aadhaar Card</option>
              <option value={"VoterId"}>Voter ID Card</option>
              <option value={"Others"}>Others</option>
            </Input>
       
          </Col>
        </Row>

        <Row className="form-group-input">
          <Col md="4">
            <h5 className="card-title" style={{ fontSize: 14 }}>
              Proof of Address
            </h5>
          </Col>

          <Col md="6">
            <Input
              type="select"
              name="address_proof"
              id="address_proof"
              onChange={(e) => handleChange("address_proof", e.target.value)}
              value={formData.address_proof}
            >
              <option value={"Passport"}>Select</option>
              <option value={"Utility"}>Utility Bill</option>
              <option value={"RationCard"}>Ration Card</option>
              <option value={"Property"}>Property Tax Bill</option>
              <option value={"Lease"}>Lease Agreement</option>
              <option value={"Others"}>Others</option>
            </Input>
          </Col>
         
        </Row> */}

        <Row className="form-group-input">
          <Col md="4">
            <h5 style={{ fontSize: 14 }}>ID Proof</h5>
          </Col>
          <Col md="6">
            <Input
              type="select"
              name="id_proof"
              onChange={(e) => handleChange("identity_proof", e.target.value)}
              value={formData.applicantType}
            >
              <option value="">Select ID Proof</option>
              <option value="Aadhar">Aadhar</option>
              <option value="PAN">PAN</option>
            
              <option value="Driving License">Driving License</option>

              {/* Add other options if needed */}
            </Input>

            
            {formData?.identity_proof && (<Input
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
              onChange={(e) => handleChange("address_proof", e.target.value)}
              value={formData.address_proof}
            >
              <option value="">Select Address Proof</option>
              <option value="Ration Card">Ration Card</option>
              <option value="House Agreement">House Agreement</option>

              {/* Add other options if needed */}
            </Input>

           {formData?.address_proof && ( <Input
              style={{ marginTop: 5 }}
              type="file"
              name="address_copy"
              id="address_copy"
              onChange={(e) => handleFileChange(e, "address_copy")}
            />
          )}
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
              onChange={(e) => handleChange("income_proof", e.target.value)}
              value={formData.income_proof}
            >
              <option value="">Select Income Proof</option>
              <option value="ITR">ITR</option>
              <option value="Salary Slip">Salary Slip</option>
              <option value="Bank Statement">Bank Statement</option>
              {/* Add other options if needed */}
            </Input>

            {formData?.income_proof && ( <Input
              style={{ marginTop: 5 }}
              type="file"
              name="income_copy"
              id="income_copy"
              onChange={(e) => handleFileChange(e, "income_copy")}
            />)}
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}

export default Benefactor;
