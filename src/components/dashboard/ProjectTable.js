import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Progress,
  Button,
  Dropdown,
} from "reactstrap";
import user1 from "../../assets/images/users/user1.jpg";
import videoFile from "../../assets/videos/sample.mp4";
import "./ToggleSwitch.css";

import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Stepper from "../Stepper";
import { Link, useNavigate } from "react-router-dom";
import { get } from "../../services/Api";
import { API_CASE_DETAILS, FILE_BASE_URL } from "../../services/ApiConstant";

const ProjectTables = ({
  data,
  isRejected,
  toggleModal,
  toggleRepaymentWidget,
  onAction,
  onMoreAction,
  setIsOpen2,
  setCaseId,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const [isApprover, setIsApprover] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);
  const [options, setOptions] = useState({
    new: ["View & Edit", "Ask a Question"],
    disbursement: ["View Details", "Repay"],
    repayment: ["View Details", "Disburse", "Close Case"],
    closed: ["Disbursement Info", "Repayment Info"],
    draft: ["Delete"],
  });

  useEffect(() => {
    const role = localStorage.getItem("user_role");

    if (role === "approver") {
      setIsApprover(true);

      setOptions({
        new: ["View & Edit", "Ask a Question", "Reject"],
        disbursement: ["View Details", "Repay", "Reject"],
        repayment: ["View Details", "Disburse", "Close Case", "Reject"],
        closed: ["Disbursement Info", "Repayment Info"],
        draft: ["Delete"],
      });
    } else {
      setIsApprover(false);
      setOptions({
        new: ["Ask a Question"],
        disbursement: ["View Details", "Repay"],
        repayment: ["View Details", "Disburse", "Close Case"],
        closed: ["Disbursement Info", "Repayment Info"],
        draft: ["Delete"],
      });
    }
  }, []);

  const steps = ["New", "Verification", "Evaluation", "Approval", "Approved"];

  function calculateDaysLeft(startDate, endDate) {
    // Convert start and end dates to JavaScript Date objects
    const startDateObj = parseDate(startDate);
    const endDateObj = parseDate(endDate);
    console.log(startDateObj);

    // Calculate the difference in milliseconds between the two dates
    const differenceMs = endDateObj - startDateObj;
    // Convert milliseconds to days and round down to the nearest integer
    const daysLeft = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

    return daysLeft;
  }

  function parseDate(dateString) {
    // Split the date string into day, month, and year parts
    const parts = dateString.split(" ");
    const day = parseInt(parts[0], 10);
    const month = parts[1];
    const year = parseInt(parts[2], 10);

    // Map month names to month numbers
    const months = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };

    // Create a new Date object with parsed values
    const date = new Date(year, months[month], day);

    return date;
  }

  function formatNumber(num) {
    if (num >= 1000 && num < 1000000) {
      return (num / 1000).toFixed(1) + "K";
    } else {
      return num;
    }
  }

  const [dropdownOpen2, setDropdownOpen2] = useState(null);

  const toggleDropdown2 = (index) => {
    // if(index === dropdownOpen2){
    //   setDropdownOpen2(null);
    // }
  };

  const dropdownRef = useRef(null);

  const [cardWidth, setCardWidth] = useState(0);
  const [margin, setMargin] = useState(0);
  const [count, setCount] = useState(0);

  const [cardsPerRow, setCardsPerRow] = useState(1);

  useEffect(() => {
    const updateCardsPerRow = () => {
      const containerWidth = window.innerWidth;
      const newCardsPerRow = Math.floor(containerWidth / 375);
      setCardsPerRow(newCardsPerRow);
    };

    updateCardsPerRow();
    window.addEventListener("resize", updateCardsPerRow);

    return () => window.removeEventListener("resize", updateCardsPerRow);
  }, []);

  const handleClickOutside = (event) => {
    console.log("dropdownRef==", dropdownRef);
    event?.preventDefault();
    setTimeout(() => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen2(null);
      } else if (!dropdownRef.current) {
        setDropdownOpen2(null);
      }
    }, 400);
  };

  useEffect(() => {
    if (dropdownOpen2 !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen2, data]);

  useEffect(() => {
    // Get screen width
    let screenWidth = 0;
    if (window.innerWidth < 760) {
      screenWidth = window.innerWidth * 0.95;
    } else {
      screenWidth = screenWidth - 260;
      screenWidth = screenWidth * 0.95;
    }

    // screenWidth = screenWidth*0.95
    // Define minimum card width
    const minCardWidth = 375;
    // Calculate modulus value
    // if(screenWidth > 375){
    const modulus = Math.floor(screenWidth / minCardWidth);
    setCount(modulus);
    console.log("modulus==", modulus);
    // Calculate card width
    const calculatedCardWidth = screenWidth / modulus;
    console.log("calculatedCardWidth==", calculatedCardWidth);
    console.log("screenWidth==", 0.02 * screenWidth);
    setMargin(0.04 * screenWidth);
    setCardWidth(calculatedCardWidth - 0.04 * screenWidth);
    // }
    // else{
    //   setCardWidth(screenWidth-0.02 * screenWidth);
    //   setMargin(0.02 * screenWidth);
    //   setCount(2)
    //   // setCardWidth(calculatedCardWidth - 0.04 * screenWidth);

    // }
  }, []);

  const calculateAge = (date) => {
    const dt = new Date(date);
    const now = new Date();
    let age = now.getFullYear() - dt.getFullYear();
    const monthDiff = now.getMonth() - dt.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dt.getDate())) {
      age--;
    }

    return age;
  };

  const getStatus = (itm) => {
    const status = itm?.approval_status;
    if (
      status === "new" ||
      status === "evaluation" ||
      status === "approval" ||
      status === "verification"
    ) {
      return itm?.pending_info
        ? "? Answer Query"
        : isApprover
        ? "Approve"
        : "View & Edit";
    } else if (status === "disbursement") {
      return "Disburse";
    } else if (status === "repayment") {
      return "Repay";
    } else if (status === "closed") {
      return "Details";
    } else if (status === "draft") {
      return "Edit & Submit";
    }

    // return status === "new" ? "View & Edit" : status === "Rejected" ? "Rejected" : "Pending"
  };

  function capitalizeFirstLetter(string) {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const approvedTable = (item) => {
    return (
      <>
        <div
          className="css-69i1ev"
          style={{ width: "92%", margin: "0px auto" }}
        >
          <div className="css-rvp98e" style={{ width: "30%" }}>
            <div className="css-0">
              <p className="MuiTypography-root MuiTypography-caption-sm css-1apuigl">
                Approved
              </p>
              <p className="MuiTypography-root MuiTypography-subtitle css-1jh0mz3">
                ₹{parseFloat(item?.approved_amt)?.toFixed(0) || "--"}
              </p>
            </div>
          </div>
          <div className="css-0" style={{ width: "20%" }}>
            <p className="MuiTypography-root MuiTypography-caption-sm css-1apuigl">
              Disbursed
            </p>
            <p className="MuiTypography-root MuiTypography-subtitle css-bfkfjx">
              ₹{item?.total_disbursement}
            </p>
          </div>
          <div className="css-0" style={{ width: "50%" }}>
            <p className="MuiTypography-root MuiTypography-caption-sm css-1m50ljv">
              Next Disbursement
            </p>
            {item?.next_disburse_days > 0 ? (
              <p className="MuiTypography-root MuiTypography-subtitle css-1qtl08s">
                ₹{item?.next_disburse_amt} in {item?.next_disburse_days} d
              </p>
            ) : (
              <>
              {!item?.next_disburse_amt ? (
                <p className="MuiTypography-root MuiTypography-subtitle css-1qtl08s">
                  --
                </p>
              ) : (
              <p
                className="MuiTypography-root MuiTypography-subtitle css-1qtl08s"
                style={{ color: "red" }}
              >
                ₹{item?.next_disburse_amt} Overdue
              </p>
              )}

</>
            )}
          </div>
        </div>
        <div
          className="css-69i1ev"
          style={{ width: "92%", margin: "8px auto" }}
        >
          <div className="css-rvp98e" style={{ width: "30%" }}>
            <div className="css-0">
              <p className="MuiTypography-root MuiTypography-caption-sm css-1apuigl">
                Repayble
              </p>
              <p className="MuiTypography-root MuiTypography-subtitle css-1jh0mz3">
                {"₹" +
                  (parseFloat(item?.pending_repayment) +
                    parseFloat(item?.repayment_received)) || "--"}
              </p>
            </div>
          </div>
          <div className="css-0" style={{ width: "20%" }}>
            <p className="MuiTypography-root MuiTypography-caption-sm css-1apuigl">
              Repaid
            </p>
            <p className="MuiTypography-root MuiTypography-subtitle css-bfkfjx">
              ₹{item?.repayment_received}
            </p>
          </div>
          <div className="css-0" style={{ width: "50%" }}>
            <p className="MuiTypography-root MuiTypography-caption-sm css-1m50ljv">
              Next Repayment
            </p>
            {/* <p className="MuiTypography-root MuiTypography-subtitle css-1qtl08s">
              {item?.next_repay_days || "--"}
            </p> */}
            {item?.next_repay_days > 0 ? (
              <p className="MuiTypography-root MuiTypography-subtitle css-1qtl08s">
                ₹{item?.next_repay_amt} in {item?.next_repay_days} d
              </p>
            ) : (
              <>
                {!item?.next_repay_days ? (
                  <p className="MuiTypography-root MuiTypography-subtitle css-1qtl08s">
                    --
                  </p>
                ) : (
                  <>
                    <p
                      className="MuiTypography-root MuiTypography-subtitle css-1qtl08s"
                      style={{ color: "red" }}
                    >
                      ₹{item?.next_repay_amt} Overdue
                    </p>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </>
    );
  };

  const newTable = (item) => {
    return (
      <>
        <div
          className="css-69i1ev"
          style={{ width: "92%", margin: "0px auto" }}
        >
          <div className="css-rvp98e" style={{ width: "30%" }}>
            <div className="css-0">
              <p className="MuiTypography-root MuiTypography-caption-sm css-1apuigl">
                Request
              </p>
              <p className="MuiTypography-root MuiTypography-subtitle css-1jh0mz3">
                ₹{parseFloat(item?.request_amt)?.toFixed(0) || "--"}
              </p>
            </div>
          </div>
          <div className="css-0" style={{ width: "30%" }}>
            <p className="MuiTypography-root MuiTypography-caption-sm css-1apuigl">
              Disbursement
            </p>
            <p className="MuiTypography-root MuiTypography-subtitle css-bfkfjx">
            {item?.disbursement_schedule &&
            item?.approval_status !== "disbursement" &&
            item?.approval_status !== "repayment" ? (
              <a
                onClick={() => toggleModal(item?.case_id)}
                style={{ color: "blue",cursor:'pointer' }}
                // className="MuiTypography-root MuiTypography-subtitle css-1jh0mz3"
              >
                {capitalizeFirstLetter(item?.disbursement_schedule) || "--"}
              </a>
            ) : (
              <a
                style={{ textDecoration: "none" }}
                // className="MuiTypography-root MuiTypography-subtitle css-1jh0mz3"
              >
                {capitalizeFirstLetter(item?.disbursement_schedule) || "--"}
              </a>
            )}
            </p>
          </div>
          <div className="css-0" style={{ width: "40%" }}>
            <p className="MuiTypography-root MuiTypography-caption-sm css-1m50ljv">
              Repayment
            </p>
            <p className="MuiTypography-root MuiTypography-subtitle css-1qtl08s">
              {item?.grant_type && item?.approval_status !== "disbursement" &&
              item?.approval_status !== "repayment" ? (
                <a
                  onClick={() => toggleRepaymentWidget(item?.case_id)}
                  style={{ color: "blue",cursor:'pointer', textDecoration: "underline" }}
                >
                  {capitalizeFirstLetter(item?.grant_type)}
                </a>
              ) : (
                <a
                  onClick={() => toggleRepaymentWidget(item?.case_id)}
                  style={{ textDecoration: "none" }}
                >
                  {capitalizeFirstLetter(item?.grant_type) || '--'}
                </a>
              )}
            </p>
          </div>
        </div>
        <div
          className="css-69i1ev"
          style={{ width: "92%", margin: "8px auto" }}
        >
          <div className="css-rvp98e" style={{ width: "30%" }}>
            <div className="css-0">
              <p className="MuiTypography-root MuiTypography-caption-sm css-1apuigl">
                Security
              </p>
              <p className="MuiTypography-root MuiTypography-subtitle css-1jh0mz3">
                {item?.collateral || "--"}
              </p>
            </div>
          </div>
          <div className="css-0" style={{ width: "20%" }}>
            <p className="MuiTypography-root MuiTypography-caption-sm css-1apuigl">
              Guarantor
            </p>
            <p className="MuiTypography-root MuiTypography-subtitle css-bfkfjx">
              {item?.guarantor_name || "--"}
            </p>
          </div>
          <div className="css-0" style={{ width: "50%" }}>
            <p className="MuiTypography-root MuiTypography-caption-sm css-1m50ljv">
              Referred by
            </p>
            <p className="MuiTypography-root MuiTypography-subtitle css-1qtl08s">
              {item?.referred_by || "--"}
            </p>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {/* <div className="css-fny4qb"></div> */}
      <div
        className="card-container"
        style={{ "--cards-per-row": cardsPerRow }}
      >
        {data?.map((item, index) => (
          <div
            className="card"
            key={index}
            // style={{
            //   width: cardWidth,
            //   margin: margin / count,
            //   // marginBottom: 0,
            //   position: "relative",
            //   overflow: "hidden",
            //   minWidth: 375,
            // }}
          >
            <div style={{ background: "rgb(237, 246, 255)", padding: 10 }}>
              <p
                style={{ textAlign: "center" }}
                className="MuiTypography-root MuiTypography-caption-sm css-1wyh1n3"
              >
                {item?.case_id} - {item.purpose}
              </p>
            </div>
            <div className="css-znfnci">
              <div
                onClick={() => {
                  navigate("/case-details", { state: item });
                  window.location.reload();
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "95%",
                  margin: "15px auto",
                  cursor: "pointer",
                }}
              >
                <div className="css-xhimbi">
                  <img
                    src={item?.profile_pic? FILE_BASE_URL+ item.profile_pic:
                      item?.gender === "M"
                        ? require("../../assets/images/men_def.jpg")
                        : require("../../assets/images/female_def.jpg")
                    }
                    alt="Online Payments"
                  />
                </div>
                <div className="css-0">
                  <div className="MuiTypography-root MuiTypography-subtitle css-jfsrw0">
                    {item?.firstname + " " + item?.lastname}
                  </div>
                  <div
                    className="MuiTypography-root MuiTypography-subtitle css-jfsrw0"
                    style={{ fontSize: 12 }}
                  >
                    {item?.gender === "M"
                      ? "Male"
                      : "Female" + ", " + calculateAge(item?.dob)}
                    , {item?.profession}, Income ₹{" "}
                    {formatNumber(item?.tot_fam_income)}
                  </div>
                  <div
                    className="MuiTypography-root MuiTypography-subtitle css-jfsrw0"
                    style={{ fontSize: 12 }}
                  >
                    {item?.address?.current_address?.cur_town},{" "}
                    {item?.address?.current_address?.district}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="css-1yg4hw3"> */}
            <div
              className="css-69i1ev"
              style={{ width: "92%", margin: "0px auto" }}
            >
              <Stepper
                steps={steps}
                isRejected={isRejected}
                state={item?.approval_status}
              />
            </div>

            {item?.approval_status !== "new" && approvedTable(item)}

            {item?.approval_status === "new" && newTable(item)}

            <div
              className="css-nmceeh"
              style={{
                padding: 10,
                background: "rgb(237, 246, 255)",
                display: "flex",
                alignItems: "center",
                // height: 35,
              }}
            >
              <p
                style={{
                  color: "blue",
                  fontSize: 13,
                  display: "-webkit-box",
                  height: 35,
                  // maxHeight: "3em",
                  // minHeight:"2rem",
                  // -webkit-box-orient: vertical;
                  // -webkit-line-clamp: 2;
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                className="MuiTypography-root MuiTypography-caption-sm css-1apuigl"
              >
                {item.short_description}{" "}
              </p>
            </div>
            {getStatus(item) && (
              <div
                style={{
                  display: "flex",
                  paddingTop: 10,
                  paddingBottom: 5,
                  alignItems: "center",
                  paddingRight: 10,
                  justifyContent: "flex-end",
                }}
              >
                {item?.approval_status === "draft" ? (
                  <Button
                    size="sm"
                    style={{
                      width: 140,
                      marginRight: 15,
                      background: "#6c757d",
                    }}
                  >
                    Delete
                  </Button>
                ) : (
                  <div ref={dropdownRef}>
                    <Dropdown
                      isOpen={dropdownOpen2 === item?.case_id}
                      toggle={() => toggleDropdown2(item?.case_id)}
                    >
                      <DropdownToggle
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        <Button
                          onClick={() => setDropdownOpen2(item?.case_id)}
                          color="info"
                          outline
                          size="sm"
                          style={{ minWidth: 140 }}
                        >
                          More Actions...{" "}
                          <i
                            class="bi bi-caret-down-fill"
                            style={{ color: "#000" }}
                          ></i>
                        </Button>
                      </DropdownToggle>
                      <DropdownMenu right>
                        {options?.[item?.approval_status]?.map((otp) => (
                          <DropdownItem onClick={() => onMoreAction(otp, item)}>
                            {/* <Link to="/new-case" style={{ textDecoration: "none" }}> */}
                            {otp}
                            {/* </Link> */}
                          </DropdownItem>
                        ))}

                        {item?.pending_info && (
                          <DropdownItem onClick={() => onAction(item)}>
                            Approve
                          </DropdownItem>
                        )}
                        {/* 
   <DropdownItem>View Drafts</DropdownItem>
   */}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                )}
                <Button
                  onClick={() => onAction(item)}
                  color="info"
                  size="sm"
                  style={{ width: 140 }}
                >
                  {getStatus(item)}
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ProjectTables;
