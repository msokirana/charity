import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
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
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { countries } from "../../constants/countries";
import Header from "../../layouts/Header";
import { useLocation, useParams } from "react-router-dom";
import { API_CASE_DETAILS, FILE_BASE_URL } from "../../services/ApiConstant";
import { get } from "../../services/Api";
import NewCaseForm from "../NewCaseForm";
import Approver from "../approver";
import RepaymentWidget from "../../components/RepaymentWidget";
import InstallmentsModal from "../../components/installmentsModal";
import QueryPopup from "../QueryPopup";

const CaseDetails = ({ route }) => {
  const [cardWidth, setCardWidth] = useState(0);
  const [margin, setMargin] = useState(0);
  const [count, setCount] = useState(0);

  const [proofOfIdentity, setProofOfIdentity] = useState(null);
  const [proofOfAddress, setProofOfAddress] = useState(null);
  const [proofOfIncome, setProofOfIncome] = useState(null);

  const [statesData, setStatesData] = useState([]);
  const [educationLevel, setEducationLevel] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [profession, setProfession] = useState("");
  const [income, setIncome] = useState("");
  const [dependants, setDependants] = useState("");
  const [applicantType, setApplicantType] = useState("");
  const [applicantType2, setApplicantType2] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [country, setCountry] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [occupation, setOccupation] = useState("");

  const [active, setACtive] = useState(0);

  const [permanentSameAsCurrent, setPermanentSameAsCurrent] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [nationality, setNationality] = useState("");
  const [religion, setReligion] = useState("");

  const [modalQuery, setModalQuery] = useState(false);

  const toggleQuery = () => setModalQuery(!modalQuery);

  const [isOpen2, setIsOpen2] = useState(false);

  const param = useParams();

  const location = useLocation();

  console.log("route=====", location?.state);

  const [isInstallMent, setInstallMent] = useState(false);

  const toggleModal = () => {
    setInstallMent(!isInstallMent);
  };
  const approvedAmount = 10000;
  const installmentCount = 12;

  const [isRepaymentWidgetOpen, setIsRepaymentWidgetOpen] = useState(false);

  const toggleRepaymentWidget = () => {
    setIsRepaymentWidgetOpen(!isRepaymentWidgetOpen);
  };

  // const data = location?.state;

  const [isOpen, setIsOpen] = React.useState(false);

  const [data, setData] = useState();

  const [caseData, setCaseData] = useState();

  useEffect(() => {
    if (location?.state && !modalQuery) {
      // setData(location.state)
      getCaseDetails();
    }
  }, [modalQuery,isOpen]);

  const getCaseDetails = async () => {
    const response = await get(
      API_CASE_DETAILS +
        "?case_id=" +
        location?.state?.case_id +
        "&coapplicant_user_id=" +
        location?.state?.coapplicant_user_id
    );
    setData(response);
  };

  const [formData, setFormData] = useState({
    loanType: "",
    presentQualification: "",
    presentAcademicScore: "",
    courseAppliedFor: "",
    courseStartDate: "",
    courseEndDate: "",
    universityOrCollege: "",
    totalSemesters: "",
    admissionStatus: "",
    totalFees: "",
    supportingDocuments: "",
    comments: "",
    costOfProperty: "",
    existingPropertyValue: "",
    guidanceValueCost: "",
    propertyLocation: "",
    natureOfExpenditure: "",
    renovationComments: "",
  });

  const [activeStep, setActiveStep] = useState(null);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const toggle = () => {
    setIsOpen(!isOpen);
    setActiveStep(null);
  };

  useEffect(() => {
    // Get screen width
    const screenWidth = window.innerWidth - 260;
    // Define minimum card width
    const minCardWidth = 375;
    // Calculate modulus value
    const modulus = Math.floor(screenWidth / minCardWidth);
    setCount(modulus);
    console.log("modulus==", modulus);
    if (modulus > 0) {
      const calculatedCardWidth = screenWidth / modulus;
      console.log("calculatedCardWidth==", calculatedCardWidth);
      console.log("screenWidth==", screenWidth);
      setMargin(0.03 * screenWidth);
      setCardWidth(calculatedCardWidth - 0.03 * screenWidth);
    } else {
      setCardWidth(350);
    }
    // Calculate card width
  }, []);



  function capitalizeFirstLetter(string) {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  return (
    <>
      <Row>
        <Col>
          <Header
            title={`View Case ${data?.case_info?.id} : [${data?.purpose_queries?.purpose_name}] ${data?.benefactor?.firstname} ${data?.benefactor?.lastname} - ${data?.case_info?.approval_status}`}
            ishide={true}
          />

          <QueryPopup
            caseId={location?.state?.case_id}
            isOpen={modalQuery}
            toggleQuery={toggleQuery}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              background: "#9FC5E8",
              padding: 10,
              paddingRight: 40,
            }}
          >
            <div>{data?.case_info?.short_description}</div>
            {/* <i  style={{marginRight:40,color:'#000'}} class="bi bi-pencil" onClick={()=>{

               setIsOpen(true);
               setActiveStep(0);
              
            }} ></i> */}
          </div>
         

          <Card
            style={{
              margin: 20,
              height: "auto",
              overflow: "hidden",
              background: activeStep === 1 ? "#FCE599" : "#fff",
            }}
          >
            <CardTitle
              tag="h6"
              className="p-3 mb-0"
              style={{
                background: activeStep === 1 ? "#FCE599" : "#fff",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <strong>Benefactor Information</strong>
              <i
                className="bi bi-pencil"
                onClick={() => {
                  setIsOpen(true);
                  setActiveStep(1);
                  setCaseData(data?.benefactor);
                }}
                style={{ color: "#000", cursor: "pointer" }}
              ></i>
            </CardTitle>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div style={{ flex: "1", padding: "10px" }}>
                <img
                  src={FILE_BASE_URL + data?.benefactor?.profile_pic}
                  alt="Profile"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                  }}
                />
                <div style={{ width: cardWidth, marginTop: 8 }}>
                  <div style={{ fontSize: 14, color: "grey" }}>First Name</div>
                  <div style={{ fontSize: 14, color: "#000" }}>
                    {data?.benefactor?.firstname}
                  </div>
                </div>
                <div style={{ width: cardWidth, marginTop: 8 }}>
                  <div style={{ fontSize: 14, color: "grey" }}>Email</div>
                  <div style={{ fontSize: 14, color: "#000" }}>
                    {data?.benefactor?.email}
                  </div>
                </div>
                <div style={{ width: cardWidth, marginTop: 8 }}>
                  <div style={{ fontSize: 14, color: "grey" }}>Phone No.</div>
                  <div style={{ fontSize: 14, color: "#000" }}>
                    {data?.benefactor?.phoneno}
                  </div>
                </div>
              </div>
              <div style={{ flex: "1", padding: "10px" }}>
                <div style={{ width: cardWidth, marginTop: 8 }}>
                  <div style={{ fontSize: 14, color: "grey" }}>Last Name</div>
                  <div style={{ fontSize: 14, color: "#000" }}>
                    {data?.benefactor?.lastname}
                  </div>
                </div>
                <div style={{ width: cardWidth, marginTop: 8 }}>
                  <div style={{ fontSize: 14, color: "grey" }}>
                    Date of birth
                  </div>
                  <div style={{ fontSize: 14, color: "#000" }}>
                    {data?.benefactor?.dob}
                  </div>
                </div>
                <div style={{ width: cardWidth, marginTop: 8 }}>
                  <div style={{ fontSize: 14, color: "grey" }}>Profession</div>
                  <div style={{ fontSize: 14, color: "#000" }}>
                    {data?.benefactor?.profession}
                  </div>
                </div>
              </div>
              <div style={{ flex: "1", padding: "10px" }}>
                <div style={{ width: cardWidth, marginTop: 8 }}>
                  <div style={{ fontSize: 14, color: "grey" }}>Address</div>
                  <div style={{ fontSize: 14, color: "#000" }}>
                    {data?.benefactor?.address?.current_address?.address_line1}{" "}
                    {data?.benefactor?.address?.current_address?.address_line2}
                  </div>
                </div>
                <div style={{ width: cardWidth, marginTop: 8 }}>
                  <div style={{ fontSize: 14, color: "grey" }}>Gender</div>
                  <div style={{ fontSize: 14, color: "#000" }}>
                    {data?.benefactor?.gender === "M" ? "Male" : "Female"}
                  </div>
                </div>
                <div style={{ width: cardWidth, marginTop: 8 }}>
                  <div style={{ fontSize: 14, color: "grey" }}>
                    Monthly Income
                  </div>
                  <div style={{ fontSize: 14, color: "#000" }}>
                    {data?.benefactor?.monthly_income}
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                padding: "10px",
              }}
            >
              {/* {data?.benefactor?.kycImages?.map((image, index) => ( */}
              <div style={{ textAlign: "center" }}>
                {!data?.benefactor?.identity_proof_copy?.endsWith(".pdf") ? (
                  <img
                    src={FILE_BASE_URL + data?.benefactor?.identity_proof_copy}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      margin: "5px",
                    }}
                  />
                ) : (
                  <div>
                    <a
                      href={`http://20.197.14.90:8000/${data?.benefactor?.identity_proof_copy}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: 14, color: "#000" }}
                    >
                      View PDF
                    </a>
                  </div>
                )}
                <div style={{ fontSize: 14, color: "#000" }}>
                  {data?.benefactor?.identity_proof}
                </div>
              </div>
              <div>
                {!data?.benefactor?.income_copy?.endsWith(".pdf") ? (
                  <img
                    src={FILE_BASE_URL + data?.benefactor?.income_copy}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      margin: "5px",
                    }}
                  />
                ) : (
                  <div>
                    <a
                      href={`http://20.197.14.90:8000/${data?.benefactor?.income_copy}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: 14, color: "#000" }}
                    >
                      View PDF
                    </a>
                  </div>
                )}
                <div style={{ fontSize: 14, color: "#000" }}>
                  {data?.benefactor?.income_proof}
                </div>
              </div>
              <div>
                {!data?.benefactor?.address_copy?.endsWith(".pdf") ? (
                  <img
                    src={FILE_BASE_URL + data?.benefactor?.address_copy}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      margin: "5px",
                    }}
                  />
                ) : (
                  <div>
                    <a
                      href={`http://20.197.14.90:8000/${data?.benefactor?.address_copy}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: 14, color: "#000" }}
                    >
                      View PDF
                    </a>
                  </div>
                )}
                <div style={{ fontSize: 14, color: "#000" }}>
                  {data?.benefactor?.address_proof}
                </div>
              </div>
              {/* ))} */}
            </div>
          </Card>
          <Card
            style={{
              margin: 20,
              height: "auto",
              overflow: "hidden",
              background: activeStep === 3 ? "#FCE599" : "#fff",
            }}
          >
            <CardTitle
              tag="h6"
              className=" p-3 mb-0"
              style={{
                background: activeStep === 3 ? "#FCE599" : "#fff",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <strong>Co-Applicant Information</strong>
              <i
                class="bi bi-pencil"
                onClick={() => {
                  setIsOpen(true);
                  setActiveStep(3);
                  console.log("======", data?.co_applicant_details);
                  if (data?.co_applicant_details) {
                    setCaseData(data?.co_applicant_details);
                  } else {
                    setCaseData({ address: { current_address: {} } });
                  }
                }}
                style={{ color: "#000", cursor: "pointer" }}
              ></i>
            </CardTitle>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div style={{ flex: "1", padding: "10px" }}>
                <div style={{ width: cardWidth, marginTop: 8 }}>
                  <div style={{ fontSize: 14, color: "grey" }}>First Name</div>
                  <div style={{ fontSize: 14, color: "#000" }}>
                    {data?.co_applicant_details?.firstname}
                  </div>
                </div>{" "}
                <div style={{ width: cardWidth, marginTop: 8 }}>
                  <div style={{ fontSize: 14, color: "grey" }}>Email</div>
                  <div style={{ fontSize: 14, color: "#000" }}>
                    {data?.co_applicant_details?.email}
                  </div>
                </div>{" "}
                <div style={{ width: cardWidth, marginTop: 8 }}>
                  <div style={{ fontSize: 14, color: "grey" }}>Phone No.</div>
                  <div style={{ fontSize: 14, color: "#000" }}>
                    {data?.co_applicant_details?.phone}
                  </div>
                </div>
              </div>
              <div style={{ flex: "1", padding: "10px" }}>
                <div style={{ width: cardWidth, marginTop: 8 }}>
                  <div style={{ fontSize: 14, color: "grey" }}>Last Name</div>
                  <div style={{ fontSize: 14, color: "#000" }}>
                    {data?.co_applicant_details?.lastname}
                  </div>
                </div>
                <div style={{ width: cardWidth, marginTop: 8 }}>
                  <div style={{ fontSize: 14, color: "grey" }}>
                    Date of birth
                  </div>
                  <div style={{ fontSize: 14, color: "#000" }}>
                    {data?.co_applicant_details?.dob}
                  </div>
                </div>
                <div style={{ width: cardWidth, marginTop: 8 }}>
                  <div style={{ fontSize: 14, color: "grey" }}>Profession</div>
                  <div style={{ fontSize: 14, color: "#000" }}>
                    {data?.co_applicant_details?.profession}
                  </div>
                </div>
              </div>
              <div style={{ flex: "1", padding: "10px" }}>
                <div style={{ width: cardWidth, marginTop: 8 }}>
                  <div style={{ fontSize: 14, color: "grey" }}>Address</div>
                  <div style={{ fontSize: 14, color: "#000" }}>
                    {
                      data?.co_applicant_details?.address?.current_address
                        ?.address_line1
                    }
                    &nbsp;{" "}
                    {
                      data?.co_applicant_details?.address?.current_address
                        ?.address_line2
                    }
                  </div>
                </div>{" "}
                <div style={{ width: cardWidth, marginTop: 8 }}>
                  <div style={{ fontSize: 14, color: "grey" }}>Gender</div>
                  <div style={{ fontSize: 14, color: "#000" }}>
                    {data?.co_applicant_details?.gender === "M"
                      ? "Male"
                      : "Female"}
                  </div>
                </div>
                <div style={{ width: cardWidth, marginTop: 8 }}>
                  <div style={{ fontSize: 14, color: "grey" }}>
                    Monthly Income
                  </div>
                  <div style={{ fontSize: 14, color: "#000" }}>
                    {data?.co_applicant_details?.monthly_income}
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card
            style={{
              margin: 20,
              height: "auto",
              overflow: "hidden",
              background: activeStep === 2 ? "#FCE599" : "#fff",
            }}
          >
            <CardTitle
              tag="h6"
              className=" p-3 mb-0"
              style={{
                background: activeStep === 2 ? "#FCE599" : "#fff",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <strong>Primary Case Information</strong>
              <i
                class="bi bi-pencil"
                onClick={() => {
                  setIsOpen(true);
                  setActiveStep(2);
                  setCaseData(data?.case_info);
                }}
                style={{ color: "#000" }}
              ></i>
            </CardTitle>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div style={{ flex: "1", padding: "10px" }}>
                <div style={{ width: cardWidth, marginTop: 8 }}>
                  <div style={{ fontSize: 14, color: "grey" }}>
                    Approval Status
                  </div>
                  <div style={{ fontSize: 14, color: "#000" }}>
                    {data?.case_info?.approval_status}
                  </div>
                </div>{" "}
                <div style={{ width: cardWidth, marginTop: 8 }}>
                  <div style={{ fontSize: 14, color: "grey" }}>Collateral</div>
                  <div style={{ fontSize: 14, color: "#000" }}>
                    {data?.case_info?.collateral}
                  </div>
                </div>{" "}
                <div style={{ width: cardWidth, marginTop: 8 }}>
                  <div style={{ fontSize: 14, color: "grey" }}>
                    Disbursement Schedule
                  </div>
                  <div style={{ fontSize: 14, color: "#000" }}>
                    <a
                      onClick={toggleModal}
                      style={{ color: "blue",cursor:'pointer', }}
                      className="MuiTypography-root MuiTypography-subtitle css-1jh0mz3"
                    >
                      {capitalizeFirstLetter(data?.case_info?.disbursement_schedule) || "--"}
                    </a>
                  </div>
                </div>
              </div>
              <div style={{ flex: "1", padding: "10px" }}>
                <div style={{ width: cardWidth, marginTop: 8 }}>
                  <div style={{ fontSize: 14, color: "grey" }}>Repayment</div>
                  <div style={{ fontSize: 14, color: "#000" }}>
                    <a
                      onClick={toggleRepaymentWidget}
                      style={{ color: "blue",cursor:'pointer', textDecoration: "underline" }}
                    >
                      {capitalizeFirstLetter(data?.case_info?.grant_type)}
                    </a>
                  </div>
                </div>
                <div style={{ width: cardWidth, marginTop: 8 }}>
                  <div style={{ fontSize: 14, color: "grey" }}>
                    Guarantor Email
                  </div>
                  <div style={{ fontSize: 14, color: "#000" }}>
                    {data?.case_info?.guarantor_email}
                  </div>
                </div>
                <div style={{ width: cardWidth, marginTop: 8 }}>
                  <div style={{ fontSize: 14, color: "grey" }}>
                    Guarantor Name
                  </div>
                  <div style={{ fontSize: 14, color: "#000" }}>
                    {data?.case_info?.guarantor_name}
                  </div>
                </div>
              </div>
              <div style={{ flex: "1", padding: "10px" }}>
                <div style={{ width: cardWidth, marginTop: 8 }}>
                  <div style={{ fontSize: 14, color: "grey" }}>
                    Guarantor Phone
                  </div>
                  <div style={{ fontSize: 14, color: "#000" }}>
                    {data?.case_info?.guarantor_phone}
                  </div>
                </div>{" "}
                <div style={{ width: cardWidth, marginTop: 8 }}>
                  <div style={{ fontSize: 14, color: "grey" }}>Purpose</div>
                  <div style={{ fontSize: 14, color: "#000" }}>
                    {data?.case_info?.purpose}
                  </div>
                </div>
                <div style={{ width: cardWidth, marginTop: 8 }}>
                  <div style={{ fontSize: 14, color: "grey" }}>Referred_by</div>
                  <div style={{ fontSize: 14, color: "#000" }}>
                    {data?.case_info?.referred_by}
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card
            style={{
              margin: 20,
              height: "auto",
              overflow: "hidden",
              background: activeStep === 0 ? "#FCE599" : "#fff",
            }}
          >
            <CardTitle
              tag="h6"
              className=" p-3 mb-0"
              style={{
                background: activeStep === 0 ? "#FCE599" : "#fff",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <strong>Case Purpose Details</strong>
              <i
                class="bi bi-pencil"
                onClick={() => {
                  setIsOpen(true);
                  setActiveStep(0);
                  setCaseData(data?.purpose_queries);
                }}
                style={{ color: "#000" }}
              ></i>
            </CardTitle>

            <div style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
              {data?.purpose_queries?.question_details?.map((itm) => (
                <div
                  style={{ width: cardWidth, marginTop: 8, padding: "10px" }}
                >
                  <div style={{ fontSize: 14, color: "grey" }}>
                    {itm?.question_text}
                  </div>
                  {itm?.answer_text?.includes("media/purpose") ? (
                    itm?.answer_text?.endsWith(".pdf") ? (
                      <div>
                        <a
                          href={`http://20.197.14.90:8000/${itm?.answer_text}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontSize: 14, color: "#000" }}
                        >
                          View PDF
                        </a>
                      </div>
                    ) : (
                      <img
                        src={`http://20.197.14.90:8000/${itm?.answer_text}`}
                        style={{ width: 100, height: 100 }}
                        alt="Preview"
                      />
                    )
                  ) : (
                    <div style={{ fontSize: 14, color: "#000" }}>
                      {itm?.answer_text}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
          <Card
            style={{
              margin: 20,
              height: "auto",
              overflow: "hidden",
              background: activeStep === 4 ? "#FCE599" : "#fff",
            }}
          >
            <CardTitle
              tag="h6"
              className=" p-3 mb-0"
              style={{
                background: activeStep === 4 ? "#FCE599" : "#fff",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <strong>My Queries</strong>
              <i
                class="bi bi-pencil"
                onClick={() => {
                  toggleQuery();
                  setActiveStep(4);
                }}
                style={{ color: "#000" }}
              ></i>
            </CardTitle>

            {data?.case_query?.map((itm) => (
              <div style={{ width: cardWidth, margin: 8 }}>
                <div style={{ fontSize: 14, color: "#000" }}>
                  {itm?.question_text}?
                </div>
                <div style={{ fontSize: 14, color: "#000" }}>
                  {itm?.answer_text}
                </div>
              </div>
            ))}
          </Card>
          <Card
            style={{
              margin: 20,
              height: "auto",
              overflow: "hidden",
              background: activeStep === 5 ? "#FCE599" : "#fff",
            }}
          >
            <CardTitle
              tag="h6"
              className=" p-3 mb-0"
              style={{
                background: activeStep === 5 ? "#FCE599" : "#fff",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <strong>Other Queries</strong>
              <i
                class="bi bi-pencil"
                onClick={() => {
                  setIsOpen(true);
                  setActiveStep(4);
                }}
                style={{ color: "#000" }}
              ></i>
            </CardTitle>
          </Card>
          <Card
            style={{
              margin: 20,
              height: "auto",
              overflow: "hidden",
              background: activeStep === 6 ? "#FCE599" : "#fff",
            }}
          >
            <CardTitle
              tag="h6"
              className=" p-3 mb-0"
              style={{
                background: activeStep === 6 ? "#FCE599" : "#fff",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <strong>Case History</strong>
              <i
                class="bi bi-pencil"
                onClick={() => {
                  setIsOpen(true);
                  setActiveStep(5);
                }}
                style={{ color: "#000" }}
              ></i>
            </CardTitle>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div style={{ flex: "1", padding: "10px" }}>
                <div style={{ width: cardWidth, marginTop: 8 }}>
                  <div style={{ fontSize: 14, color: "grey" }}>Evaluator</div>
                  <div style={{ fontSize: 14, color: "#000" }}>
                    Ramachandran Krishnan, Ramachandran Krishnan, Ramachandran
                    Krishnan <a style={{ color: "blue" }}>Edit Evaluator</a>
                  </div>
                </div>{" "}
              </div>
            </div>
          </Card>

          <div
            style={{
              display: "flex",
              width: "95%",
              gap: 20,
              margin: "0px auto",
              justifyContent: "center",
            }}
          >
            {/* <Button style={{ width: "20%" }} onClick={handleNext}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-floppy-fill"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z" />
                <path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z" />
              </svg>
              &nbsp; Save
            </Button> */}
            <Button
              style={{ width: "20%" }}
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              <i class="bi bi-x-lg"></i> Cancel
            </Button>
            <Button
              style={{ width: "20%" }}
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              <i class="bi bi-question"></i> Ask a question
            </Button>

            <Button
              style={{ width: "20%" }}
              color="primary"
              onClick={() => setIsOpen2(true)}
            >
              Approve <i class="bi bi-check2"></i>
            </Button>
          </div>
        </Col>
      </Row>

      {isOpen && (
        <NewCaseForm
          {...{ isOpen, setIsOpen }}
          type="edit"
          editData={data}
          step={activeStep}
          caseData={caseData}
        />
      )}
      {isOpen2 && (
        <Approver
          {...{ isOpen2, setIsOpen2 }}
          caseId={location?.state?.case_id}
        />
      )}

      <div>
        {/* <Button color="primary" onClick={toggleRepaymentWidget}>
            Open Repayment Widget
          </Button> */}
        <RepaymentWidget
          isOpen={isRepaymentWidgetOpen}
          toggleModal={toggleRepaymentWidget}
          casId={location?.state?.case_id}
        />
      </div>

      

      <div>
        {/* <Button color="primary" onClick={toggleModal}>
            Open Popup
          </Button> */}
        <InstallmentsModal
          isOpen={isInstallMent}
          toggleModal={toggleModal}
          casId={location?.state?.case_id}
        />
      </div>


      
    </>
  );
};

export default CaseDetails;
