import React, { useState,useEffect,useImperativeHandle,forwardRef } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
  Table,
  ModalFooter,
} from "reactstrap";
import "./styles.css";
import { AiOutlineClose } from "react-icons/ai";
import { get, put } from "../../services/Api";
import { API_GET_DISBURSEMENT, API_UPDATE_DISBURSEMENT } from "../../services/ApiConstant";

const Disbursement = forwardRef(({casId,deletedDRows,activeStep,setDeletedDRows,setApproveAmt,date,requestAmt,setRequestAmt,setInstallmentCount,setPlan,setSchedule,plan,installmentCount,schedule,approvAmt,setDate },ref) => {

    useImperativeHandle(ref, () => ({
      getDisbursment
    }));
  // Calculate auto-populated values
  // const installmentAmt = approvedAmount / installmentCount;
 




  useEffect(()=>{
    if(casId && activeStep === 0){
      setDate();
      getDisbursment()
    }
  },[casId,activeStep])


  const getDisbursment = async () => {
    try{

      const disbursementData  = await get(API_GET_DISBURSEMENT+"?case_id="+casId);
      console.log("response===",disbursementData);
      if(disbursementData?.approved_amt > 0){
        setApproveAmt(disbursementData?.approved_amt)
      }
      else{
        setApproveAmt(disbursementData?.request_amt)
      }
    
      setRequestAmt(disbursementData?.request_amt);
      setInstallmentCount(disbursementData?.disbursement_count)
      setPlan(disbursementData?.disbursement_schedule)
      setSchedule(disbursementData?.disbursement_details)
      if(disbursementData?.disbursement_details?.[0]?.planned_date){
        setDate(disbursementData?.disbursement_details?.[0]?.planned_date)

      }
      else{
        setDate(new Date());
      }

    }
    catch(error){
      console.error("Error fetching purpose details:", error);

    }

  }


  const handleGenerateSchedule = () => {
    // Generate schedule based on input values
    const generatedSchedule = [];
    const disbursementPlanMonths = {
      monthly: 1,
      quarterly: 3,
      "half-yearly": 6,
      yearly: 12,
      "one shot": 0,
    };
    const disbursementPlanMonthDifference = disbursementPlanMonths[plan];
    if (disbursementPlanMonthDifference === undefined) {
      // Invalid plan, do nothing
      return;
    }
    for (let i = 0; i < parseInt(installmentCount); i++) {
      const plannedDate = new Date(date);
      plannedDate.setMonth(
        plannedDate.getMonth() + i * disbursementPlanMonthDifference
      );
      const installmentAmt = parseFloat(approvAmt) / parseInt(installmentCount);
      generatedSchedule.push({
        sequence: i + 1,
        planned_date: plannedDate.toISOString().slice(0, 10), // Format as "YYYY-MM-DD"
        installment_amt: installmentAmt,
      });
    }
    setSchedule(generatedSchedule);
  };

  const handleDateChange = (index, value) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[index].planned_date = value;
    setSchedule(updatedSchedule);
  };

  const handleAmountChange = (index, value) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[index].installment_amt = value;
    setSchedule(updatedSchedule);
  };

  const handleConfirm = () => {
    // Handle confirmation logic here
  };



  const handleAddRow = () => {
    const newRow = {
      sequence: schedule.length + 1,
      planned_date: "",
      installment_amt: "",
    };
    setSchedule([...schedule, newRow]);
  };

  const handleRemoveRow = (index) => {
    const updatedSchedule = schedule.filter((item, i) => i !== index);
    setDeletedDRows([...deletedDRows, {...schedule[index],disbursement_status:"delete"}]);
    setSchedule(updatedSchedule);
  };

  return (
    <>
      <FormGroup className="form-group-input">
        <h5 style={{ fontSize: 14, width: 300 }}>Requested amount</h5>
        <Input
          style={{ width: "92%" }}
          id="requestAmt"
          type="text"
          value={requestAmt}
          disabled
        />
      </FormGroup>
      <FormGroup className="form-group-input">
        <h5 style={{ fontSize: 14, width: 300 }}>Approved amount</h5>
        <Input
          style={{ width: "92%" }}
          id="approvAmt"
          type="text"
          value={approvAmt}
          onChange={(e) => setApproveAmt(e.target.value)}
        />
      </FormGroup>
      <FormGroup className="form-group-input">
        <h5 style={{ fontSize: 14, width: 300 }}>Disbursement start date</h5>
        <Input
          id="disbursementDate"
          type="date"
          value={date}
          style={{ width: "92%" }}
          onChange={(e) => setDate(e.target.value)}
        />
      </FormGroup>
      <FormGroup className="form-group-input">
        <h5 style={{ fontSize: 14, width: 300 }}>Disbursement plan</h5>
        <Input
          type="select"
          style={{ width: "92%" }}
          name="disbursement_schedule"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
        >
          <option value="">Select</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="half-yearly">Half-Yearly</option>
          <option value="yearly">Yearly</option>
          <option value="one shot">One Shot</option>
        </Input>
      </FormGroup>
      <FormGroup className="form-group-input">
        <h5 style={{ fontSize: 14, width: 300 }}>No of installments</h5>
        <Input
          style={{ width: "92%" }}
          id="installmentCount"
          type="text"
          value={installmentCount}
          onChange={(e) => setInstallmentCount(e.target.value)}
        />
      </FormGroup>
      {!schedule?.length && (
        <Button
          style={{ float: "right" }}
          color="primary"
          onClick={handleGenerateSchedule}
        >
          Generate schedule
        </Button>
      )}
      {schedule.length > 0 && (
        <Table style={{ marginTop: 10 }}>
          <thead>
            <tr>
              <th></th>
              <th>Planned date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <Input
                    type="date"
                    style={{ width: "80%" }}
                    value={item.planned_date}
                    onChange={(e) => handleDateChange(index, e.target.value)}
                  />
                </td>
                <td style={{ display: "flex", alignItems: "center" }}>
                  <Input
                    type="text"
                    style={{ width: "80%" }}
                    value={item.installment_amt}
                    onChange={(e) => handleAmountChange(index, e.target.value)}
                  />
                  <AiOutlineClose
                    onClick={() => handleRemoveRow(index)}
                    style={{ marginLeft: 15, cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {schedule?.length > 0 && (
        <div
          onClick={handleAddRow}
          style={{ color: "blue", cursor: "pointer" }}
        >
          + Add Row
        </div>
      )}


    </>
  );
})

export default Disbursement;
