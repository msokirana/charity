import React, { useEffect, useState } from "react";
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
  Tooltip,
} from "reactstrap";
import "../styles.css";
import { AiOutlineClose } from "react-icons/ai";
import {
  API_APPROVE_UPDATE_CASE_,
  API_GET_DISBURSEMENT,
  API_UPDATE_DISBURSEMENT,
  API_UPDATE_TRACK_DISBURSEMENT,
} from "../../services/ApiConstant";
import { get, post, put } from "../../services/Api";
import moment from "moment/moment";

const TrackDisbursement = ({ isOpen, toggleTrackWidget, caseId }) => {
  // Calculate auto-populated values
  // const installmentAmt = approvedAmount / installmentCount;
 
  const [date, setDate] = useState(new Date());
  const [plan, setPlan] = useState("");
  const [isTrack, setIsTrack] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState({});
  const [disbursed_amt, setDisbursement] = useState();
  const [disbursement_txn_info, setdisbursement_txn_info] = useState();
  const [disbursed_date, setDisbursedDate] = useState();
  const [disburseId, setDisburseId] = useState();
  const [isAddRow, setIsAddRow] = useState(false);
  const [repayment,setRepayAmt] = useState(false);
  const [trackAmt, setTrackAmt] = useState();;

  const [data, setData] = useState();

  // const toggleTooltip = () => setTooltipOpen(!tooltipOpen);


  const toggleTooltip = (id) => {
    setTooltipOpen(prevState => ({
        ...prevState,
        [id]: !prevState[id]
    }));
};

  const [schedule, setSchedule] = useState([]);
  function capitalizeFirstLetter(string) {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    if(isOpen){
    if (caseId && !isTrack) {
      getDisbursment();
    }


  }

  if(isTrack || isAddRow){
    console.log("called-----")
    setDisbursement(null)
    setdisbursement_txn_info(null)
    setDisbursedDate(null)
    setDate(null);
  }
  }, [caseId, isTrack,isOpen,isAddRow]);

  const getDisbursment = async () => {
    try {
      const disbursementData = await get(
        API_GET_DISBURSEMENT + "?case_id=" + caseId
      );
      setData(disbursementData);
      setSchedule(disbursementData?.disbursement_details || []);
      console.log("response===", disbursementData);
    } catch (error) {
      console.error("Error fetching purpose details:", error);
    }
  };


  const onApprove = async() =>{
    try {
      // const disbursement_details =
    

      const payload = {
        status: "repayment"
      };

      const response = await put(
        API_APPROVE_UPDATE_CASE_ + caseId + "/",
        payload
      );
      setRepayAmt(true);
      console.log("response==", response);
      // toggleModal();
    } catch (error) {
      console.log(error);
    }
  }

  const handleSave = async () => {
    try {
      if (isAddRow) {
        const updatedSchedule = [...schedule];
        updatedSchedule[schedule?.length] = {
          installment_amt: disbursed_amt,
          planned_date: date,
          disbursement_status: "pending",
        };

        const payload = {
          ...data,
          disbursement_count:updatedSchedule?.length,
          disbursement_details: updatedSchedule,
        };

        const response = await put(
          API_UPDATE_DISBURSEMENT + caseId + "/",
          payload
        );

        setIsAddRow(false);

        setIsTrack(false);

        console.log(response);
      } else {
        console.log("schedule==", schedule);
        const payload = {
          id: disburseId,
          disbursed_amt: parseFloat(disbursed_amt||"0"),
          disbursement_txn_info: disbursement_txn_info,
          disbursed_date: disbursed_date,
        };

        const response = await put(
          API_UPDATE_TRACK_DISBURSEMENT + caseId + "/",
          payload
        );

        setIsTrack(false);
        setIsAddRow(false);
        console.log("response==", response);
      }
      // const disbursement_details =

      // toggleModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddRow = () => {
    // const newRow = {
    //   sequence: schedule.length + 1,
    //   planned: "",
    //   actual: "",
    // };
    // setSchedule([...schedule, newRow]);

    setIsAddRow(true);
    setIsTrack(true);
  };



  return (
    <Modal
      isOpen={isOpen}
      toggle={() => (isTrack ? setIsTrack(false) : toggleTrackWidget())}
      style={{ width: "100%" }}
    >
      <ModalHeader
        toggle={() => {
          setIsTrack(false);
          // toggleTrackWidget();
          setIsAddRow(false)

          if(!isTrack && !isAddRow){
            toggleTrackWidget();
          }
        }}
      >
        Track Disbursement : Case {caseId}
      </ModalHeader>
      {!isTrack ? (
        <ModalBody style={{  maxHeight: 'calc(100vh - 300px)', overflowY: 'scroll',overflowX:'hidden' }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            
            }}
          >
            <div>
              {/* <h5 style={{ fontSize: 14, }}>
                <span>Approved</span>
              </h5>
              <h5 style={{ fontSize: 14, }}>
                <strong>{parseFloat(data?.request_amt)?.toFixed(0)}</strong>
              </h5> */}

<p
                style={{ fontSize: 14, color: "grey" }}
                className="MuiTypography-root MuiTypography-caption-sm css-1apuigl"
              >
                Approved
              </p>
              <p className="MuiTypography-root MuiTypography-subtitle css-1jh0mz3">
                ₹{parseFloat(data?.approved_amt)?.toFixed(0)}
              </p>
            </div>

            <div style={{textAlign:'right'}}>
              {/* <h5 style={{ fontSize: 14,  }}>Disbursed</h5>
              <h5 style={{ fontSize: 14, }}>
                <strong>{parseFloat(data?.approved_amt)?.toFixed(0)}</strong>
              </h5> */}
              <p
                style={{ fontSize: 14, color: "grey" }}
                className="MuiTypography-root MuiTypography-caption-sm css-1apuigl"
              >
                Disbursed
              </p>
              <p className="MuiTypography-root MuiTypography-subtitle css-1jh0mz3">
                ₹{parseFloat(data?.total_disbursement)?.toFixed(0)}
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              {/* <h5 style={{ fontSize: 14, }}>Schedule</h5>

              <h5 style={{ fontSize: 14 }}>
                {" "}
                <strong>{data?.disbursement_schedule} </strong>
              </h5> */}
               <p
                style={{ fontSize: 14, color: "grey" }}
                className="MuiTypography-root MuiTypography-caption-sm css-1apuigl"
              >
                Schedule
              </p>
              <p className="MuiTypography-root MuiTypography-subtitle css-1jh0mz3">
                {capitalizeFirstLetter(data?.disbursement_schedule)}
              </p>
            </div>

            <div style={{textAlign:'right'}}>
              {/* <h5 style={{ fontSize: 14, }}>Pending </h5>

              <h5 style={{ fontSize: 14,}}>
                <strong>{data?.outstanding_disbursment}</strong>
              </h5> */}
               <p
                style={{ fontSize: 14, color: "grey" }}
                className="MuiTypography-root MuiTypography-caption-sm css-1apuigl"
              >
                Pending
              </p>
              <p className="MuiTypography-root MuiTypography-subtitle css-1jh0mz3">
              ₹{data?.outstanding_disbursment}
              </p>
            </div>
          </div>

          {schedule.length > 0 && (
            <Table style={{ marginTop: 20, background: "#fff" }}>
              <thead>
                <tr>
                  <th></th>
                  <th>Planned</th>
                  <th>Actual</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((item, index) => (
                  <tr
                    key={index}
                    style={{ borderRight: "2px solid #d5f3f2", padding: 10 }}
                  >
                    <td
                      style={{
                        borderRight: "2px solid #d5f3f2",
                        borderBottom: "2px solid #d5f3f2",
                      }}
                    >
                      {index + 1}
                    </td>
                    <td
                      style={{
                        borderRight: "2px solid #d5f3f2",
                        borderBottom: "2px solid #d5f3f2",
                      }}
                    >
                      ₹{item?.installment_amt} on{" "}
                      {moment(item?.planned_date, "YYYY-MM-DD").format(
                        "MMMM D, YYYY"
                      )}
                    </td>
                    <td
                      style={{
                        borderRight: "2px solid #d5f3f2",
                        borderBottom: "2px solid #d5f3f2",
                      }}
                    >
                      {item?.disbursed_date ? (
                        <>
                          ₹{item?.disbursed_amt} on{" "}
                          {moment(item?.disbursed_date, "YYYY-MM-DD").format(
                            "MMMM D, YYYY"
                          )}
                          <i
                            class="bi bi-info-circle"
                            style={{ cursor: "pointer", marginLeft: 5 }}
                            id={"closeIcon"+index}
                          ></i>
                          <Tooltip
                            placement="top"
                            isOpen={tooltipOpen?.[index]}
                            target={"closeIcon"+index}
                            toggle={()=>toggleTooltip(index)}
                          >
                            {item?.disbursement_txn_info}
                          </Tooltip>
                        </>
                      ) : (
                        <Button
                          onClick={() => {
                            setDisburseId(item?.id);
                            setIsTrack(true);
                            setTrackAmt(item?.installment_amt);
                          }}
                          color="primary"
                          outline
                        >
                          Track
                        </Button>
                      )}
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
        </ModalBody>
      ) : (
        <>
          {isAddRow ? (
            <ModalBody>
              <FormGroup
                className="form-group-input"
                style={{ paddingLeft: 0 }}
              >
                <h5 style={{ fontSize: 14, width: 300 }}>Planned Date</h5>
                <Input
                  style={{ width: "95%" }}
                  id="requestAmt"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </FormGroup>
              <FormGroup
                className="form-group-input"
                style={{ paddingLeft: 0 }}
              >
                <h5 style={{ fontSize: 14, width: 300 }}>
                  Planned Disburesement Amount
                </h5>
                <Input
                  style={{ width: "95%" }}
                  id="disbursed_amt"
                  type="number"
                  value={disbursed_amt}
                  onChange={(e) => setDisbursement(e.target.value)}
                />
              </FormGroup>
            </ModalBody>
          ) : (
            <ModalBody>
              <FormGroup
                className="form-group-input"
                style={{ paddingLeft: 0 }}
              >
                <h5 style={{ fontSize: 14, width: 300 }}>Planned Disbursement Amount</h5>
                <Input
                  style={{ width: "95%" }}
                  id="requestAmt"
                  type="text"
                  value={trackAmt}
                  disabled
                />
              </FormGroup>
              <FormGroup
                className="form-group-input"
                style={{ paddingLeft: 0 }}
              >
                <h5 style={{ fontSize: 14, width: 300 }}>
                  Actual Disbursement Amount
                </h5>
                <Input
                  style={{ width: "95%" }}
                  id="disbursed_amt"
                  type="number"
                  value={disbursed_amt}
                  onChange={(e) => setDisbursement(e.target.value)}
                />
              </FormGroup>
              <FormGroup
                className="form-group-input"
                style={{ paddingLeft: 0 }}
              >
                <h5 style={{ fontSize: 14, width: 300 }}>
                  Actual Disbursement Date
                </h5>
                <Input
                  style={{ width: "95%" }}
                  id="disbursed_date"
                  type="date"
                  value={disbursed_date}
                  onChange={(e) => setDisbursedDate(e.target.value)}
                />
              </FormGroup>

              <FormGroup
                className="form-group-input"
                style={{ paddingLeft: 0 }}
              >
                <h5 style={{ fontSize: 14, width: 300 }}>Disbursement Info</h5>
                <Input
                  style={{ width: "95%" }}
                  id="disbursement_txn_info"
                  type="textarea"
                  value={disbursement_txn_info}
                  onChange={(e) => setdisbursement_txn_info(e.target.value)}
                />
              </FormGroup>
            </ModalBody>
          )}
        </>
      )}
      <ModalFooter style={{ display: "flex" }}>
        {(!isTrack && !repayment) && (
          <Button onClick={onApprove} size="md" color="primary">
            Start Repayment
          </Button>
        )}{" "}
        <Button
          size="md"
          color="primary"
          onClick={() => (isTrack ? setIsTrack(false) : toggleTrackWidget())}
        >
          Close
        </Button>{" "}
        {(isAddRow || isTrack) && ( <Button size="md" color="primary" onClick={handleSave}>
          Save
        </Button>)}{" "}
      </ModalFooter>
    </Modal>
  );
};

export default TrackDisbursement;
