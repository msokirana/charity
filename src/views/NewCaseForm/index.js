import React, { useEffect, useState } from "react";
import "../styles.scss";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";

import {
  Card,
  CardContent,
  Typography,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";

import SettingsIcon from "@mui/icons-material/Person";
// import GroupAddIcon from "@mui/icons-material/SupervisorAccountIcon";
import VideoLabelIcon from "@mui/icons-material/Article";
import GroupAddIcon from "@mui/icons-material/SupervisorAccount";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import Benefactor from "./benefactor";
import CaseInfo from "./caseinfo";
import CoApplicant from "./coapplicant";
import Purpose from "./purpose";
import { styled } from "@mui/material/styles";
import { API_CREATE_CASE, API_UPDATE_CASE } from "../../services/ApiConstant";
import { post, put } from "../../services/Api";

function NewCaseForm({ isOpen, setIsOpen,draftData,type, caseData, step, editData }) {
  const [message, setMessage] = useState("")


  const [formData, setFormData] = useState({
    short_description: "",
    firstname: "",
    lastname: "",
    gender: "",
    dob: "",
    phoneno: null,
    email: null,
    nationality: "",
    religion: "",
    marital_status: "",
    highest_edu: "",
    profession: "",
    monthly_income: 0,
    tot_fam_income: 0,
    tot_dependants: "",
    address: {
      current_address: {},

      permanent_address: {},
    },
    address_type: true,
  });

  const [coapplicant, setCoapplicant] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    dob: "",
    phoneno: "",
    email: "",
    nationality: "",
    religion: "",
    marital_status: "",
    highest_edu: "",
    profession: "",
    monthly_income: "0.00",
    tot_fam_income: "0.00",
    tot_dependants: "",
    cibil_score: "",
    covenants_risks: "",
    id_proof: "",
    address_proof: "",
    income_proof: "",
    address: {
      current_address: {
        address_line1: "",
        address_line2: "",
        cur_town: "",
        state: "",
        city: "",
        district: "",
        country: "",
        pincode: "",
        period_of_stay: "",
        address_type: "",
      },
    },
  });

  const steps = [
    "Purpose of loan",
    "Benefactor Information",
    "Case Information",
    "Co-Applicant Information",
  ];

  const [isEdit, setIsEdit] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

 

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleNext = () => {
    console.log(formData);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

 



  useEffect(()=>{
    if(editData && type !=="edit"){
      setActiveStep(0);
      setCoapplicant(editData?.co_applicant_details);
      setFormData({...editData?.benefactor,...editData?.case_info});

    }
    else if(type ==="edit"){
      setActiveStep(step);
      setCoapplicant(editData?.co_applicant_details);
      setFormData({...editData?.benefactor,...editData?.case_info});
    }
  },[editData,step])
  const handleEditSave = async () => {
    try {
      if (activeStep === 1) {
        let body = {
          ...editData,
          benefactor: { ...editData?.benefactor, ...formData },
        };

        const response = await put(API_UPDATE_CASE+editData?.case_info?.id+"/", body);
        toggle();
        console.log("response==", response);
      }
      if (activeStep === 2) {
        let body = {
          ...editData,
          benefactor: { ...editData?.benefactor, ...formData },
        };

        const response = await put(API_UPDATE_CASE+editData?.case_info?.id+"/", body);
        toggle();
        console.log("response==", response);
      }
      if (activeStep === 3) {
        let body = {
          ...editData,
          co_applicant_details: { ...editData?.co_applicant_details, ...coapplicant },
        };

        const response = await put(API_UPDATE_CASE+editData?.case_info?.id+"/", body);
        toggle();
        console.log("response==", response);
      }

     
    } catch (error) {
      console.log(error);
    }
  };

  function convertToFormData(body) {
    let payload = new FormData();

    for (let key in body) {
        if (body.hasOwnProperty(key)) {
            if (typeof body[key] === 'object' && body[key] !== null && !Array.isArray(body[key])) {
                for (let nestedKey in body[key]) {
                    if (body[key].hasOwnProperty(nestedKey)) {
                        if (typeof body[key][nestedKey] === 'object' && body[key][nestedKey] !== null) {
                            for (let deepNestedKey in body[key][nestedKey]) {
                                if (body[key][nestedKey].hasOwnProperty(deepNestedKey)) {
                                    payload.append(`${key}[${nestedKey}][${deepNestedKey}]`, body[key][nestedKey][deepNestedKey]);
                                }
                            }
                        } else {
                            payload.append(`${key}[${nestedKey}]`, body[key][nestedKey]);
                        }
                    }
                }
            } else {
                payload.append(key, body[key]);
            }
        }
    }

    return payload;
}


  const handleSave = async (status) => {
    try {
      console.log(formData?.purpose_queries)
      let query = formData?.purpose_queries;
      if(formData?.purpose_queries?.question_details?.length>0){
        query.question_details = formData?.purpose_queries?.question_details?.filter((itm)=> itm !== null &&itm !== undefined ) 

      }
      let body = {
        purpose: formData?.purpose || "",
        short_description: formData?.short_description || "",
        purpose_queries: query|| {},
        firstname: formData?.firstname || "",
        lastname: formData?.lastname || "",
        gender: formData?.gender || "",
        dob: formData?.dob || "",
        phoneno: formData?.phoneno || null,
        email: formData?.email || null,
        nationality: formData.nationality || "",
        religion: formData?.religion || "",
        marital_status: formData?.marital_status || "",
        highest_edu: formData?.highest_edu || "",
        profession: formData?.profession || "",
        monthly_income: formData?.monthly_income || 0,
        tot_fam_income: formData?.tot_fam_income || 0,
        tot_dependants: formData?.tot_dependants || 0,
        cibil_score: formData?.cibil_score || 0,
        covenants_risks: "",
        request_amt: formData?.request_amt || 0,
        has_guarantor: formData?.has_guarantor || 0,
        guarantor_user_id: 0,
        guarantor_name: formData?.guarantor_name || "",
        guarantor_phone: formData?.guarantor_phone || "",
        guarantor_email: formData?.guarantor_email || "",
        coordinator_user_id: 0,
        grant_type: formData?.grant_type || "",
        approval_status: status,
        disbursement_schedule: formData?.disbursement_schedule || "",
        collateral: formData?.collateral || "",
        referred_by: formData?.referred_by || "",
        case_submit_date: "",
        identity_proof: formData?.identity_proof || "",
        address_proof:formData?.address_proof|| "",
        income_proof: formData?.income_proof|| "",
        profile_pic: formData?.profile_pic|| "",
        identity_proof_copy: formData?.identity_proof_copy|| "",
        address_copy:  formData?.address_copy|| "",
        income_copy:  formData?.income_copy|| "",
        status: "active",
        address: {
          current_address: {
            address_line1:
              formData?.address?.current_address?.address_line1 || "",
            address_line2: "",
            cur_town: formData?.address?.current_address?.cur_town || "",
            city: formData?.address?.current_address?.city || "",
            district: formData?.address?.current_address?.district || "",
            state: formData?.address?.current_address?.state || "",
            country: formData?.address?.current_address?.country || "",
            pincode: formData?.address?.current_address?.pincode || "",
            address_type: "temporary",
            period_of_stay:
              formData?.address?.current_address?.period_of_stay || "",
          },
          permanent_address: {
            address_line1:
              formData?.address?.permanent_address?.address_line1 || "",
            address_line2: "",
            cur_town: formData?.address?.permanent_address?.cur_town || "",
            city: formData?.address?.permanent_address?.city || "",
            district: formData?.address?.permanent_address?.district || "",
            state: formData?.address?.permanent_address?.state || "",
            country: formData?.address?.permanent_address?.country || "",
            pincode: formData?.address?.permanent_address?.pincode || "",
            address_type: "permanent",
            period_of_stay:
              formData?.address?.permanent_address?.period_of_stay || "",
          },
        },
        default_shipping_flag: 1,
        default_billing_flag: 1,
        default_communication: 1,
        coapplicant: {
          coapplicant_user_id: 0,
          firstname: coapplicant?.firstname || "",
          lastname: coapplicant?.lastname || "",
          gender: coapplicant?.gender || "",
          dob: coapplicant?.dob || "",
          phoneno: coapplicant?.phoneno || null,
          email: coapplicant?.email || null,
          nationality: coapplicant?.nationality || "",
          religion: coapplicant?.religion || "",
          marital_status: coapplicant?.marital_status || "",
          highest_edu: coapplicant?.highest_edu || "",
          profession: coapplicant?.profession || "",
          monthly_income: coapplicant?.monthly_income || "",
          tot_fam_income: coapplicant?.tot_fam_income || "",
          tot_dependants: coapplicant?.tot_dependants || "",
          cibil_score: coapplicant?.cibil_score || "",
          covenants_risks: "No",
          identity_proof: coapplicant?.identity_proof || "",
          address_proof: coapplicant?.address_proof|| "",
          income_proof: coapplicant?.income_proof|| "",
          profile_pic: null,
          identity_proof_copy:  coapplicant?.identity_proof_copy|| "",
          address_copy:  coapplicant?.address_copy|| "",
          income_copy:  coapplicant?.income_copy|| "",
          is_guarantor: false,
          status: "active",
          address: {
            current_address: {
              address_line1:
                coapplicant?.address?.permanent_address?.address_line1 || "",
              address_line2: "",
              cur_town: coapplicant?.address?.permanent_address?.cur_town || "",
              city: coapplicant?.address?.permanent_address?.city || "",
              district: coapplicant?.address?.permanent_address?.district || "",
              state: coapplicant?.address?.permanent_address?.state || "",
              country: coapplicant?.address?.permanent_address?.country || "",
              pincode: coapplicant?.address?.permanent_address?.pincode || "",
              address_type: "permanent",
              period_of_stay:
                coapplicant?.address?.permanent_address?.period_of_stay || "",
            },
            // permanent_address: {
            //   address_line1: "",
            //   address_line2: "",
            //   cur_town: "",
            //   city: "",
            //   district: "",
            //   state: "",
            //   country: "",
            //   pincode: "",
            //   address_type: "",
            //   period_of_stay: "",
            // },
          },
          default_shipping_flag: 1,
          default_billing_flag: 1,
          default_communication: 1,
        },
      };


      const payload = convertToFormData(body)

      

      const response = await post(API_CREATE_CASE, body);
      setMessage("Case Saved Successfully!")
      setTimeout(() => {
        setMessage('')
      }, 2000);
      if(status === "new"){
        toggle();
      }
     
      console.log("response==", response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeCoApplicantDoc = ( name, value) => {

    // If the field  name starts with 'address.', we update the nested state
    if (name.startsWith("current_address.")) {
      const addressField = name.split(".")[1]; // Extract the nested field name
      const addressType = name.split(".")[0]; // Extract the address type (current_address/permanent_address)

      console.log("name====", { addressType, addressField });

      setCoapplicant((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [addressType]: {
            ...prevState.address[addressType],
            [addressField]: value,
          },
        },
      }));
    } else {
      setCoapplicant((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };


  const handleChangeCoApplicant = (e) => {
    const { name, value } = e.target;

    // If the field  name starts with 'address.', we update the nested state
    if (name.startsWith("current_address.")) {
      const addressField = name.split(".")[1]; // Extract the nested field name
      const addressType = name.split(".")[0]; // Extract the address type (current_address/permanent_address)

      console.log("name====", { addressType, addressField });

      setCoapplicant((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [addressType]: {
            ...prevState.address[addressType],
            [addressField]: value,
          },
        },
      }));
    } else {
      setCoapplicant((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 40,
    height: 40,
    marginBottom: 20,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      backgroundImage:
        "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {
      backgroundImage:
        "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    }),
  }));

  function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
      // 1: <SettingsIcon />,
      1: (
        <img
          src={require("../../assets/images/purpose.png")}
          style={{ width: 40, height: 40, borderRadius: 10 }}
          tintColor="#fff"
        />
      ),
      2: <SettingsIcon />,
      3: <VideoLabelIcon />,
      4: <GroupAddIcon />,
    };

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
        style={{marginBottom:10}}
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }

  return (
    
    <Modal
  className="new-case-modal"
  style={{ height: window.innerHeight * 0.9 }}
  isOpen={isOpen}
  onClose={toggle}
>
  <ModalHeader>
    <div
      style={{
        alignItems: "center",
        fontSize: 14,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h6>
        {caseData ? "Edit Case:" : "New Case:"} &nbsp;{steps[activeStep]}
      </h6>
      <i
        className="bi bi-x-lg"
        onClick={toggle}
        style={{
          fontSize: 26,
          position: "absolute",
          right: 15,
          color: "grey",
          cursor: "pointer",
        }}
      ></i>
    </div>
  </ModalHeader>
  <ModalBody style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
    {!caseData && (
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              {/* {label} */}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    )}
    {/* {getStepContent(activeStep, formData, handleChange)} */}
    {activeStep === 0 && (
      <Purpose {...{ formData, setFormData, handleChange }} />
    )}

    {activeStep === 1 && (
      <Benefactor {...{ formData, setFormData, handleChange }} />
    )}
    {activeStep === 2 && (
      <CaseInfo {...{ formData, setFormData, handleChange }} />
    )}
    {activeStep === 3 && (
      <CoApplicant {...{ coapplicant, handleChangeCoApplicant,handleChangeCoApplicantDoc }} />
    )}
  </ModalBody>
 {message &&( <p style={{fontSize:16,color:'green',textAlign:'center',marginTop:10, marginRight:20}}>{message}</p>)}

  <ModalFooter
    style={{
      display: "flex",
      paddingLeft: 40,
      paddingRight: 40,
      marginTop: 0,
      justifyContent: !caseData ? "space-between" : 'flex-end',
      borderTop: 'none'
    }}
  >
    
    {!caseData && (
      <Button onClick={handleBack} disabled={activeStep === 0}>
        <i className="bi bi-caret-left-fill"></i> Back
      </Button>
    )}
    <Button
      onClick={() => !editData ? handleSave("draft") : handleEditSave()}
      disabled={(activeStep === 1 && (!formData?.firstname || !formData?.lastname ||!formData?.phoneno)) ||  (activeStep === 2 && !formData?.has_guarantor)
      }

     
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-floppy-fill"
        viewBox="0 0 16 16"
      >
        <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z" />
        <path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z" />
      </svg>
      &nbsp; Save
    </Button>

    {!caseData && (
      <Button
        color="primary"
        onClick={() =>
          activeStep === 3 ? handleSave("new") : handleNext()
        }
        // disabled={activeStep < 3}
        disabled={(activeStep === 1 && (!formData?.firstname || !formData?.lastname ||!formData?.phoneno))
          || (activeStep === 2 && !formData?.has_guarantor)



        }
      >
        {activeStep === 3 ? "Submit" : "Next"}{" "}
        <i className="bi bi-caret-right-fill"></i>
      </Button>
    )}
  </ModalFooter>
</Modal>

  );
}

export default NewCaseForm;
