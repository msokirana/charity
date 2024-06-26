import React, { useEffect, useState, useRef } from "react";
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

import { styled } from "@mui/material/styles";
import { API_APPROVE_UPDATE_CASE_, API_CREATE_CASE, API_UPDATE_DISBURSEMENT, API_UPDATE_REPAYMENT } from "../../services/ApiConstant";
import { post, put } from "../../services/Api";
import Disbursement from "./disbursment";
import Repayment from "./repayment";

function Approver({ isOpen2,caseId, setIsOpen2,isApprove}) {
  const [installmentCount, setInstallmentCount] = useState(0);
  const [requestAmt, setRequestAmt] = useState();
  const [approvAmt, setApproveAmt] = useState();
  const [date, setDate] = useState(new Date());
  const [plan, setPlan] = useState("");
  const [schedule, setSchedule] = useState([]);

  const [message, setMessage] = useState("")


  const childDisRef = useRef();
  const childRepRef = useRef();




  const [repayCount, setRepayCount] = useState(0);
  const [pricipleAmt, setPrincipleAmt] = useState();
  const [repayAmt, setRepayAmt] = useState();
  const [tenuer, setTenuer] = useState(0);
  const [repayType, setRepayType] = useState("");
  const [rdate, setRDate] = useState(new Date());
  const [repaySchedule, setRepaySchedule] = useState("");
  const [rschedule, setRSchedule] = useState([]);

  const [deletedDRows, setDeletedDRows] = useState([]);
  const [deletedRRows, setDeletedRRows] = useState([]);

  const [isRepaid, setIsRePaid] = useState(false);

 
  const steps = [
    "Disbursement",
    "Repayment",
    "Confirmation",
  ];


  const [isEdit, setIsEdit] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const toggle = () => {
    setIsOpen2(!isOpen2);
  };

  const handleNext = () => {
    if(activeStep==0){
      handleSaveDisbursement(true)
      
    }
    else{
      
      handleSave(true)
    }
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if(activeStep==1){
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
    else{
      toggle()

    }
    
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  const handleSaveDisbursement = async (isNext) => {
    const totalAmount = schedule.reduce(
      (total, item) => total + parseFloat(item.installment_amt),
      0
    );
    if (totalAmount > parseFloat(approvAmt)) {
      alert("Total amount exceeds the approved amount!");
    } else {
      try {
        // const disbursement_details =
        console.log("rschedule==", schedule);
        const disbursement_details = schedule.map((item) => {
          const itm = {
            ...item,
            disbursed_date: null,
            disbursed_amt: null,
            remaining_amt: null,
            tot_disbursed_amt: null,
            disbursement_status: "pending",
            disbursement_txn_info: null,
            created_by: 0,
            updated_by: 0,
          };

          return itm;
        });

        const deletedItem = deletedDRows.filter((item) => item.id > 0) 

        const payload = {
          created_by: 0,
          updated_by: 0,
          request_amt: parseFloat(requestAmt),
          approved_amt: parseFloat(approvAmt),
          disbursement_schedule: plan,
          disbursement_count: disbursement_details?.length,
          disbursement_start_date: rdate,
          disbursement_details: [...disbursement_details,...deletedItem],
        };

        const response = await put(
          API_UPDATE_DISBURSEMENT + caseId + "/",
          payload
        );
        if(!isNext){

        setMessage("Saved Successfully!")
        setTimeout(() => {
          setMessage('')
        }, 2000);
      }

        if (childDisRef.current) {
          childDisRef.current.getDisbursment();
        }
        if(isNext){
          setActiveStep(1)
        }
        console.log("response==", response);
        // toggleModal();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onApprove = async() =>{
    try {
      // const disbursement_details =
    

      const payload = {
        status: "disbursement"
      };

      const response = await put(
        API_APPROVE_UPDATE_CASE_ + caseId + "/",
        payload
      );
      setActiveStep(2)
      // toggle();
      console.log("response==", response);
      // toggleModal();
    } catch (error) {
      console.log(error);
    }
  }

  const handleSave = async (isNext) => {
    const totalAmount = rschedule.reduce(
      (total, item) => total + parseFloat(item.planned_repayment_amt),
      0
    );
    if (totalAmount > parseFloat(repayAmt)) {
      alert("Total amount exceeds the approved amount!");
    } else {
      try {
        // const disbursement_details =
        console.log("schedule==", rschedule);
        const disbursement_details = rschedule.map((item) => {
          const itm = {
            ...item,
            created_by: 0,
            updated_by: 0,
            repayment_date: null,
            actual_repayment_amt: "0.00",
            outstanding_amt: "0.00",
            tot_repayed_amt: "0.00",
            repayment_status: "pending",
            repayment_txn_info: null,
          };

          return itm;
        });

        const deletedItem = deletedRRows.filter((item) => item.id > 0) 


        const payload = {
          created_by: 0,
          updated_by: 0,
          // request_amt: pricipleAmt,
          // approved_amt: repayAmt,
          repay_plan: repayType,
          repayment_count: disbursement_details?.length,
          repay_percent: parseFloat(repayAmt),
          repayment_start_date: date,
          // repayment_details: disbursement_details,
          repayment_details: [...disbursement_details,...deletedItem],
        };

        const response = await put(
          API_UPDATE_REPAYMENT + caseId + "/",
          payload
        );

        if(!isNext){

          setMessage("Saved Successfully!")
          setTimeout(() => {
            setMessage('')
          }, 2000);

        }


        if (childRepRef.current) {
          childRepRef.current.getDisbursment();
        }
        if(isNext){
          onApprove();

        }
        console.log("response==", response);
        // toggleModal();
      } catch (error) {
        console.log(error);

      }
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
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }

  const handleConfirm = () => {
    // Handle confirmation logic here
  };



  return (
    <Modal
      // className="new-case-modal"
      style={{ height: window.screen.height * 0.70,}}
      isOpen={isOpen2}
      onClose={toggle}
    >
      <ModalHeader style={{borderBottom:'none'}} toggle={toggle}>
        {" "}
        {steps[activeStep]} : Case {caseId}
        {/* <div
          style={{
            alignItems: "center",
            fontSize: 14,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h6>{steps[activeStep]} : Case {caseId}</h6>
          <i
            class="bi bi-x-lg"
            onClick={toggle}
            style={{ fontSize: 26,position:'absolute',right:15, color: "grey", cursor: "pointer" }}
          ></i>
        </div> */}
      </ModalHeader>
      <ModalBody  style={{ height: window.screen.height * 0.60,overflowY:'scroll',padding:0}}>
      <Stepper activeStep={activeStep} alternativeLabel style={{marginBottom:-10,marginTop:0}}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {/* {label} */}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        {/* {getStepContent(activeStep, formData, handleChange)} */}
        {activeStep === 0 && (
   <Disbursement
   casId={caseId}
   ref={childDisRef}
   {...{setApproveAmt,deletedDRows, setDeletedDRows,activeStep,date,requestAmt,setRequestAmt,setInstallmentCount,setPlan,setSchedule,plan,installmentCount,schedule,approvAmt,setDate}}
          
 />
        )}

        {activeStep === 1 && (
             <Repayment
             casId={caseId}
             installmentCount={repayCount}
             setInstallmentCount={setRepayCount}
             schedule={rschedule}
             setSchedule={setRSchedule}
             date={rdate}
             setDate={setRDate}
             ref={childRepRef}
             {...{setPrincipleAmt,deletedRRows, setDeletedRRows,setIsRePaid,setRepaySchedule,setRepayType,setTenuer,setRepayAmt,pricipleAmt,repayAmt,tenuer, repayType,repaySchedule}}
           />
        )}
        {activeStep === 2 && (
         <div style={{width:'100%',justifyContent:'center',height:'100%',alignItems:'center',display:'flex',flexDirection:'column'}}>
          <img src={require('../../assets/images/done.png')} style={{width:100,height:100,marginTop:-50}}/>
          <br/>
          <p style={{fontSize:20}}>Approved</p>
         </div>
        )}

       
        
      </ModalBody>
      <p style={{fontSize:16,color:'green',textAlign:'center'}}>{message}</p>

      <ModalFooter
          // style={{
          //   display: "flex",
          //   // paddingLeft: 40,
          //   // paddingRight: 40,
          //   marginTop: 20,
          //   justifyContent: "space-between",
          //   width:'97%'
          // }}
        >

          <Button onClick={handleBack} >
          {activeStep ==1 && (<i class="bi bi-caret-left-fill"></i>)}  {activeStep >0?activeStep ===2?"Close": "Back" : "Close"}{" "}
          </Button>
          {activeStep <2 && ( <Button
            onClick={() => activeStep==0?handleSaveDisbursement(): handleSave()}
            disabled={!isApprove?(activeStep===0 && schedule.length==0)|| (activeStep===1 && rschedule.length==0): false}
          >
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
          </Button>)}

         {activeStep <2 && ( <Button
            color="primary"
            disabled={!isApprove?(activeStep===0 && schedule.length==0)|| (activeStep===1 && rschedule.length==0):false}
            // disabled={activeStep <3}
            onClick={handleNext}
          >
            {activeStep === 0?"Next":  "Submit"}{" "}
            <i class="bi bi-caret-right-fill"></i>
          </Button>
          )}
        </ModalFooter>
   
    </Modal>
  );
}

export default Approver;
