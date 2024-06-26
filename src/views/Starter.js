import React, { useState, useEffect } from "react";
import { Form, Input, InputGroup, InputGroupText } from "reactstrap";
import ProjectTables from "../components/dashboard/ProjectTable";
import Header from "../layouts/Header";

import { get, post, put } from "../services/Api";

import { Card } from "@mui/material";
import {
  API_APPROVE_UPDATE_CASE_,
  API_CASE_DETAILS,
  API_CASE_LIST,
  API_GET_DISBURSEMENT,
} from "../services/ApiConstant";
import InstallmentsModal from "../components/installmentsModal";
import RepaymentWidget from "../components/RepaymentWidget";

import NewCaseForm from "./NewCaseForm";
import { useNavigate } from "react-router-dom";
import TrackDisbursement from "../components/trackDisbursement";
import Approver from "./approver";
import TrackRepayment from "../components/trackRepayment";
import QueryPopup from "./QueryPopup";
import AlertPopup from "../components/AlertPopup";

const Starter = () => {
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [repaymentData, setRepaymentData] = useState(null);
  const [disbursementData, setDisbursementData] = useState(null);
  const [isTrackOpen, setIsTrackOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [caseId, setCaseId] = useState();
  const [status, setStatus] = useState("active");
  const [isRepayOpen, setIsRepayOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isApprove, setIsApprove] = useState(false);

  const [isQuery, setIsQuery] = useState(false);
  const navigate = useNavigate();

  const toggleQuery = () => setIsQuery(!isQuery);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const toggleTrackRepayWidget = () => {
    setIsRepayOpen(!isRepayOpen);
  };

  const toggleTrackWidget = () => setIsTrackOpen(!isTrackOpen);

  useEffect(() => {
    if (!isOpen || !isOpen2 || !isTrackOpen || !isRepayOpen) {
      getCaseList();
    }
  }, [isOpen, status, isOpen2, isTrackOpen, isRepayOpen]);

  const getCaseList = async () => {
    const response = await post(API_CASE_LIST, { status: status });
    setData(response);

    console.log("response====", response);
  };

  const [details, setDetails] = useState();

  const onAction = async (itm) => {
    const status = itm?.approval_status;
    const role = localStorage.getItem("user_role");
    console.log("itm====", itm);

    if (status === "draft") {
      const response = await get(
        API_CASE_DETAILS +
          "?case_id=" +
          itm?.case_id +
          "&coapplicant_user_id=" +
          itm?.coapplicant_user_id
      );
      setDetails(response);
      setIsOpen(true);
    } else if (status === "new" && role === "approver" && !itm?.pending_info) {
      setCaseId(itm?.case_id);
      if (
        itm?.grant_type === "Repayble" ||
        itm?.grant_type === "Non Repayable"
      ) {
        setIsApprove(true);
      } else {
        setIsApprove(false);
      }
      setIsOpen2(true);
    } else if (status === "new" && role === "approver" && itm?.pending_info) {
      setCaseId(itm?.case_id);
      setIsOpen2(true);
    } else if (status === "disbursement") {
      setCaseId(itm?.case_id);
      toggleTrackWidget();

      // navigate("/case-details", { state: itm });
    } else if (status === "repayment") {
      setCaseId(itm?.case_id);
      toggleTrackRepayWidget();

      // navigate("/case-details", { state: itm });
    } else if (itm?.pending_info) {
    } else {
      navigate("/case-details", { state: itm });
      window.location.reload();
    }
  };

  const onApprove = async (status, caseId) => {
    try {
      // const disbursement_details =

      const payload = {
        status: status,
      };

      const response = await put(
        API_APPROVE_UPDATE_CASE_ + caseId + "/",
        payload
      );
      getCaseList();
      // setActiveStep(2)
      // toggle();
      console.log("response==", response);
      // toggleModal();
    } catch (error) {
      console.log(error);
    }
  };

  const onMoreAction = (opt, itm) => {
    console.log("===", opt, itm);
    if (opt === "View Details" || opt === "View & Edit") {
      navigate("/case-details", { state: itm });
      window.location.reload();
    } else if (opt === "Repay") {
      setCaseId(itm?.case_id);
      toggleTrackRepayWidget();
    } else if (opt === "Disburse") {
      setCaseId(itm?.case_id);
      toggleTrackWidget();
    } else if (opt === "Repayment Info") {
      setCaseId(itm?.case_id);
      toggleTrackRepayWidget();
    } else if (opt === "Disbursement Info") {
      setCaseId(itm?.case_id);
      toggleTrackWidget();
    } else if (opt === "Ask a Question") {
      setCaseId(itm?.case_id);
      toggleQuery();
    } else if (opt === "Reject") {
      setVisible(true);

      // onApprove("rejected",itm?.case_id)
    } else if (opt === "Close Case") {
      onApprove("closed", itm?.case_id);
    } else if (opt === "Approve") {
    }
  };

  const [isSearch, setIsSearch] = useState(false);
  const [isRejected, setRejected] = useState(false);

  const [isInstallMent, setInstallMent] = useState(false);

  const toggleModal = (id) => {
    console.log("id===", typeof id);
    if (typeof id !== "object") {
      setCaseId(id);
    }
    setInstallMent(!isInstallMent);
  };
  const approvedAmount = 10000;
  const installmentCount = 12;

  const [isRepaymentWidgetOpen, setIsRepaymentWidgetOpen] = useState(false);

  const toggleRepaymentWidget = (id) => {
    if (typeof id !== "object") {
      setCaseId(id);
    }
    setIsRepaymentWidgetOpen(!isRepaymentWidgetOpen);
  };

  return (
    <>
      <Header
        setRejected={setRejected}
        onSearch={() => setIsSearch(true)}
        title={status === "draft" ? "Draft Case List" : "Case List"}
        onNewCase={toggle}
        setStatus={setStatus}
      />
      <AlertPopup
        visible={visible}
        title={""}
        desc={
          "Cases once rejected cannot be reinstated in the approval process. Are you sure you want to reject the case?"
        }
        handleOk={() => {}}
        handleCancel={() => setVisible(false)}
      />
      {isSearch && (
        <div style={{ padding: 20, display: "flex", width: "100%" }}>
          <Card style={{ width: "95%" }}>
            <Form>
              <div
                style={{
                  padding: 15,
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div style={{ width: "15%" }}>
                  <Input
                    type="select"
                    placeholder="Search by"
                    name="searchDropdown"
                    id="searchDropdown"
                  >
                    <option>Search By</option>
                    <option>Benefactor phone</option>
                    <option>Benefactor email</option>
                    <option>Short description</option>
                  </Input>
                </div>
                <div style={{ width: "70%", marginLeft: 50 }}>
                  <InputGroup>
                    <Input
                      type="text"
                      placeholder="Search text"
                      name="searchInput"
                      id="searchInput"
                    />
                    <InputGroupText>
                      <i class="bi bi-search" style={{ cursor: "pointer" }}></i>
                    </InputGroupText>
                  </InputGroup>
                </div>
                <div>
                  <i
                    class="bi bi-x-lg"
                    style={{ cursor: "pointer", fontSize: 28, marginLeft: 20 }}
                    onClick={() => setIsSearch(false)}
                  ></i>
                </div>
              </div>
            </Form>
          </Card>
        </div>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div>
          {/* <Button color="primary" onClick={toggleRepaymentWidget}>
            Open Repayment Widget
          </Button> */}
          <RepaymentWidget
            isOpen={isRepaymentWidgetOpen}
            toggleModal={toggleRepaymentWidget}
            casId={caseId}
          />
        </div>

        <div>
          {/* <Button color="primary" onClick={toggleModal}>
            Open Popup
          </Button> */}
          <InstallmentsModal
            isOpen={isInstallMent}
            toggleModal={toggleModal}
            casId={caseId}
          />
        </div>
      </div>

      <div
        className="case-modal"
        style={{ width: "100%", margin: "-90px auto" }}
      >
        <ProjectTables
          data={data}
          toggleRepaymentWidget={toggleRepaymentWidget}
          {...{ toggleModal, onAction, onMoreAction, setIsOpen2, setCaseId }}
          isRejected={isRejected}
        />

        {isOpen && (
          <NewCaseForm {...{ isOpen, setIsOpen }} editData={details} />
        )}

        <TrackDisbursement
          caseId={caseId}
          isOpen={isTrackOpen}
          toggleTrackWidget={toggleTrackWidget}
        />
        <TrackRepayment
          caseId={caseId}
          isOpen={isRepayOpen}
          toggleTrackWidget={toggleTrackRepayWidget}
        />

        {isOpen2 && <Approver {...{ isOpen2, setIsOpen2 }} isApprove={isApprove} caseId={caseId} />}
        <QueryPopup
          caseId={caseId}
          isOpen={isQuery}
          toggleQuery={toggleQuery}
        />
      </div>
    </>
  );
};

export default Starter;
