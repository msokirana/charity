import React, { useState,useEffect,useImperativeHandle, forwardRef } from "react";
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
import { API_GET_REPAYMENT } from "../../services/ApiConstant";
import { get } from "../../services/Api";

const Repayment = forwardRef(({isOpen,setDeletedRRows,deletedRRows,setIsRePaid,setInstallmentCount,setSchedule,setPrincipleAmt,setRepaySchedule,setDate,setRepayType,setTenuer,installmentCount,setRepayAmt,pricipleAmt,repayAmt,tenuer, repayType,date,repaySchedule,schedule,casId },ref) => {
  const [firstInstallmentDate, setFirstInstallmentDate] = useState("");

  // Calculate auto-populated values
  // const installmentAmt = approvedAmount / installmentCount;



  useEffect(()=>{
    if(casId){
     
      getDisbursment()
    }
  },[casId])


  useImperativeHandle(ref, () => ({
    getDisbursment
  }));

  const getDisbursment = async () => {
    try{

      const disbursementData  = await get(API_GET_REPAYMENT+"?case_id="+casId);
      console.log("response===",disbursementData);
      if(disbursementData?.repay_percent > 0){
        setRepayAmt(disbursementData?.repay_percent)
      }
      else if(disbursementData?.approved_amt>0){
        setRepayAmt(disbursementData?.approved_amt)
      }
      setPrincipleAmt(disbursementData?.approved_amt)
      setInstallmentCount(disbursementData?.disbursement_count)
      setRepaySchedule(disbursementData?.repay_plan)
      setRepayType(disbursementData?.grant_type)
      setTenuer(disbursementData?.repayment_count)
      setSchedule(disbursementData?.repayment_details)
      if(disbursementData?.repayment_details?.length>0){
        setDate(disbursementData?.repayment_details?.[0]?.planned_date)
        setIsRePaid(true)
      }
      else{
        setDate();
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
    console.log("repaySchedule===",repaySchedule)
    const disbursementPlanMonthDifference =
      disbursementPlanMonths[repaySchedule];
    if (disbursementPlanMonthDifference === undefined) {
      // Invalid plan, do nothing
      return;
    }
    for (let i = 0; i < parseInt(tenuer); i++) {
      const plannedDate = new Date(date);
      plannedDate.setMonth(
        plannedDate.getMonth() + i * disbursementPlanMonthDifference
      );
      const installmentAmt = parseFloat(repayAmt) / parseInt(tenuer);
      generatedSchedule.push({
        sequence: i + 1,
        planned_date: plannedDate.toISOString().slice(0, 10), // Format as "YYYY-MM-DD"
        planned_repayment_amt: installmentAmt,
        id:null
      });
    }

    console.log("generatedSchedule===",generatedSchedule)
    setSchedule(generatedSchedule);
  };

  const handleDateChange = (index, value) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[index].planned_date = value;
    setSchedule(updatedSchedule);
  };

  const handleAmountChange = (index, value) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[index].planned_repayment_amt = value;
    setSchedule(updatedSchedule);
  };

  const handleConfirm = () => {
    // Handle confirmation logic here
  };

 
  const handleAddRow = () => {
    const newRow = {
      sequence: schedule.length + 1,
      planned_date: "",
      planned_repayment_amt: "",
      id:null
    };
    setSchedule([...schedule, newRow]);
  };

  const handleRemoveRow = (index) => {
    const updatedSchedule = schedule.filter((item, i) => i !== index);
    setDeletedRRows([...deletedRRows, {...schedule[index],repayment_status:"delete"}]);
    setSchedule(updatedSchedule);
  };

  return (
    <>
      <FormGroup className="form-group-input">
        <h5 style={{ fontSize: 14, width: 300 }}>Principal amount</h5>
        <Input
          style={{ width: "92%" }}
          id="pricipleAmt"
          type="text"
          value={pricipleAmt}
          disabled
        />
      </FormGroup>
      <FormGroup className="form-group-input">
        <h5 style={{ fontSize: 14, width: 300 }}>Repayment amount</h5>
        <Input
          style={{ width: "92%" }}
          id="repayAmt"
          type="text"
          value={repayAmt}
          onChange={(e) => setRepayAmt(e.target.value)}
        />
      </FormGroup>
      <FormGroup className="form-group-input">
        <h5 style={{ fontSize: 14, width: 300 }}>Repayment tenure (months)</h5>
        <Input
          style={{ width: "92%" }}
          id="approvAmt"
          type="text"
          value={tenuer}
          onChange={(e) => setTenuer(e.target.value)}
        />
      </FormGroup>
      <FormGroup className="form-group-input">
        <h5 style={{ fontSize: 14, width: 300 }}>Repayment Type</h5>
        <Input
          type="select"
          name="disbursement_schedule"
          value={repayType}
          style={{ width: "92%" }}
          onChange={(e) => setRepayType(e.target.value)}
        >
          <option value="">Select</option>
          <option value="Partially">Partially</option>
              <option value="Repayble">Repayble</option>
              <option value="Non Repayable">Non Repayable</option>
              <option value="In Service">In Service</option>
        </Input>
      </FormGroup>
      <FormGroup className="form-group-input">
        <h5 style={{ fontSize: 14, width: 300 }}>Repayment Schedule</h5>
        <Input
          type="select"
          name="schedule"
          value={repaySchedule}
          style={{ width: "92%" }}
          onChange={(e) => setRepaySchedule(e.target.value)}
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
        <h5 style={{ fontSize: 14, width: 300 }}>Repayment start date</h5>
        <Input
          id="disbursementDate"
          type="date"
          value={date}
          style={{ width: "92%" }}
          onChange={(e) => setDate(e.target.value)}
        />
      </FormGroup>
      {!schedule?.length && (
        <Button
          style={{ float: "right",marginRight:40 }}
          color="primary"
          onClick={handleGenerateSchedule}
        >
          Generate schedule
        </Button>
      )}
      {schedule.length > 0 && (
        <Table style={{ marginTop: 10 }}>
          <thead style={{ borderBottomColor: "#fff" }}>
            <tr>
              <th></th>
              <th>Repayment date</th>
              <th>EMI amount</th>
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
                    value={item.planned_repayment_amt}
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
});

export default Repayment;
