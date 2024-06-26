import React, { useState, useEffect } from "react";
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
import "../styles.css";
import { AiOutlineClose } from "react-icons/ai";
import { API_GET_REPAYMENT, API_UPDATE_REPAYMENT } from "../../services/ApiConstant";
import { get, put } from "../../services/Api";
import moment from "moment";

const RepaymentWidget = ({ isOpen, toggleModal, casId }) => {
  const [firstInstallmentDate, setFirstInstallmentDate] = useState("");

  // Calculate auto-populated values
  // const installmentAmt = approvedAmount / installmentCount;
  const [installmentCount, setInstallmentCount] = useState();
  const [pricipleAmt, setPrincipleAmt] = useState();
  const [repayAmt, setRepayAmt] = useState(pricipleAmt);
  const [tenuer, setTenuer] = useState();
  const [repayType, setRepayType] = useState("");
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [repaySchedule, setRepaySchedule] = useState("");
  const [rSchedule, setRSchedule] = useState([]);
  const [deletedRows, setDeletedRows] = useState([]);
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (casId && isOpen) {
      getDisbursment();
    }
  }, [casId,isOpen]);

  const getDisbursment = async () => {
    try {
      const disbursementData = await get(
        API_GET_REPAYMENT + "?case_id=" + casId
      );
      console.log("response===", disbursementData);
      setPrincipleAmt(disbursementData?.approved_amt);
      setRepayAmt(disbursementData?.request_amt);
      setTenuer(disbursementData?.repayment_count);
      setRSchedule(disbursementData?.repayment_details);
      setRepayType(disbursementData?.grant_type);
      setRepaySchedule(disbursementData?.repay_plan);

      if(disbursementData?.repayment_details?.[0]?.planned_date){
        setDate(disbursementData?.repayment_details?.[0]?.planned_date)

      }
      else{
        setDate(moment(new Date()).format("YYYY-MM-DD"))
      }

    } catch (error) {
      console.error("Error fetching purpose details:", error);
    }
  };

  const handleSave = async () => {
    const totalAmount = rSchedule.reduce(
      (total, item) => total + parseFloat(item.installment_amt),
      0
    );
    if (totalAmount > parseFloat(repayAmt)) {
      alert("Total amount exceeds the approved amount!");
    } else {
      try {
        // const disbursement_details =
        console.log("rSchedule==", rSchedule);
        const disbursement_details = rSchedule.map((item) => {
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

        const deletedItem = deletedRows.filter((item) => item.id > 0) 

        const payload = {
          created_by: 0,
          updated_by: 0,
          // request_amt: pricipleAmt,
          // approved_amt: repayAmt,
          repay_plan: repaySchedule,
          repayment_count:disbursement_details?.length,
          repay_percent: repayAmt,
          repayment_start_date: date,
          grant_type:repayType,
          repayment_details: [...disbursement_details,...deletedItem],
        };

        const response = await put(
          API_UPDATE_REPAYMENT + casId + "/",
          payload
        );

        getDisbursment();
        setMessage("Saved Successfully!")
        setTimeout(() => {
          setMessage('')
        }, 2000);
        console.log("response==", response);
        // toggleModal();
      } catch (error) {
        console.log(error);
      }
    }
  };

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
    setRSchedule(generatedSchedule);
  };

  const handleDateChange = (index, value) => {
    const updatedSchedule = [...rSchedule];
    updatedSchedule[index].planned_date = value;
    setRSchedule(updatedSchedule);
  };

  const handleAmountChange = (index, value) => {
    const updatedSchedule = [...rSchedule];
    updatedSchedule[index].planned_repayment_amt = value;
    setRSchedule(updatedSchedule);
  };

  const handleConfirm = () => {
    // Handle confirmation logic here
  };

  const handleAddRow = () => {
    const newRow = {
      sequence: rSchedule?.length + 1,
      planned_date: null,
      planned_repayment_amt: "",
      id:null
    };
    console.log(newRow)
    setRSchedule([...rSchedule, newRow]);
  };

  const handleRemoveRow = (index) => {
    const updatedSchedule = rSchedule.filter((item, i) => i !== index);
    setDeletedRows([...deletedRows, {...rSchedule[index],repayment_status:"delete"}]);
    setRSchedule(updatedSchedule);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Repayment schedule : Case {casId}</ModalHeader>
      <ModalBody  style={{  maxHeight: 'calc(100vh - 300px)', overflowY: 'scroll',overflowX:'hidden' }}>
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
          <h5 style={{ fontSize: 14, width: 300 }}>
            Repayment tenure (months)
          </h5>
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
        {!rSchedule?.length && (
          <Button
            style={{ float: "right" }}
            color="primary"
            onClick={handleGenerateSchedule}
          >
            Generate schedule
          </Button>
        )}
        {rSchedule.length > 0 && (
          <Table style={{ marginTop: 10 }}>
            <thead style={{ borderBottomColor: "#fff" }}>
              <tr>
                <th></th>
                <th>Repayment date</th>
                <th>EMI amount</th>
              </tr>
            </thead>
            <tbody>
              {rSchedule.map((item, index) => (
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
                      onChange={(e) =>
                        handleAmountChange(index, e.target.value)
                      }
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

        {rSchedule?.length > 0 && (
          <div
            onClick={handleAddRow}
            style={{ color: "blue", cursor: "pointer" }}
          >
            + Add Row
          </div>
        )}
      </ModalBody>
      <ModalFooter>
      <p style={{fontSize:16,color:'green',marginRight:20}}>{message}</p>
        <Button color="primary" onClick={handleSave}>
          Save
        </Button>{" "}
      </ModalFooter>
    </Modal>
  );
};

export default RepaymentWidget;
