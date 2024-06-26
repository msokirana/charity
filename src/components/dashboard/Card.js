import React, { useState,useEffect } from "react";

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

const Card =({item,index,isRejected,toggleModal,toggleRepaymentWidget})=>{

    const [dropdownOpen, setDropdownOpen] = useState(null);

    const [searchActive, setSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
  
    const navigate = useNavigate();
  
    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);
  
  
    const handleSearchClick = () => {
      setSearchActive(true);
    };
  
    const handleSearchInputChange = (e) => {
      setSearchQuery(e.target.value);
    };
  
    const handleClearSearch = () => {
      setSearchQuery('');
      setSearchActive(false);
    };
  
    const toggleFullScreen = (video) => {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        /* Safari */
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        /* IE11 */
        video.msRequestFullscreen();
      }
    };
  
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
  
    const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  
  
  
    function formatNumber(num) {
      if (num >= 1000 && num < 1000000) {
        return (num / 1000).toFixed(1) + "K";
      } else {
        return num;
      }
    }
  
  
    const [cardWidth, setCardWidth] = useState(0);
    const [margin, setMargin] = useState(0);
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      // Get screen width
      const screenWidth = (window.innerWidth-260);
      // Define minimum card width
      const minCardWidth = 375;
      // Calculate modulus value
      const modulus = Math.floor(screenWidth / minCardWidth);
      setCount(modulus)
      console.log("modulus==",modulus)
      // Calculate card width
      const calculatedCardWidth = screenWidth / modulus 
      console.log("calculatedCardWidth==",calculatedCardWidth)
      console.log("screenWidth==",screenWidth)
      setMargin(0.03*screenWidth)
      setCardWidth(calculatedCardWidth-0.03*screenWidth);
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
      }


return(
    <div

    key={index}
   
    style={{position:'relative',  background: "rgb(237, 246, 255)",display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center', width: cardWidth,margin:margin/count,marginBottom:60}}
  
  >
    {/* <div className="css-znfnci"></div> */}
      <p className="card-list-title">
       {item?.case_id} - {item.purpose}
      </p>
      <img src={require('../../assets/images/layout.png')} style={{width:'60%',height:100,marginTop:-15}}/>

    <div className="card-heading">


    </div>

    {/* <div className="card=heading">
      <div className="css-5f1jit"  onClick={() => {
      navigate("/case-details", { state: item });
      window.location.reload()
    }}>
        <div className="css-wqanl7">
          <div className="css-xhimbi">
            <img
              src={
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
              {item?.gender ==="M"?"Male":"Female"+ ", " + calculateAge(item?.dob)},{" "}
              {item?.profession}, Income{" "}
              ₹ {formatNumber(item?.tot_fam_income)}
            </div>
            <div
              className="MuiTypography-root MuiTypography-subtitle css-jfsrw0"
              style={{ fontSize: 12 }}
            >
              {item?.address?.current_address?.cur_town}, {item?.address?.current_address?.district}
            </div>
          </div>
        </div>
      </div>
      <Stepper steps={steps} isRejected={isRejected} state={item?.approval_status}/>
      <div className="css-69i1ev">
        <div className="css-rvp98e" style={{width:'30%'}}>
          <div className="css-0">
            <p className="MuiTypography-root MuiTypography-caption-sm css-1apuigl">
              Request
            </p>
            <p className="MuiTypography-root MuiTypography-subtitle css-1jh0mz3">
              ₹{item?.request_amt}
            </p>
          </div>
        </div>
       <div className="css-0"  style={{width:'20%'}}>
          <p className="MuiTypography-root MuiTypography-caption-sm css-1apuigl">
            Disbursement
          </p>
          <a onClick={()=>toggleModal(item?.case_id)} style={{color:'blue'}} className="MuiTypography-root MuiTypography-subtitle css-1jh0mz3">
            {item?.disbursement_schedule || "--"}
          </a>
        </div>
        <div className="css-0"  style={{width:'50%'}}>
          <p className="MuiTypography-root MuiTypography-caption-sm css-1m50ljv">
            Repayment
          </p>
          <p className="MuiTypography-root MuiTypography-subtitle css-1qtl08s">
            <a onClick={()=>toggleRepaymentWidget(item?.case_id)} style={{color:'blue',textDecoration:'underline'}}>{item?.grant_type}</a>
          </p>
        </div>
      </div>

      <div className="css-69i1ev" style={{ marginTop: 8 }}>
       <div className="css-rvp98e"  style={{width:'30%'}}>
          <div className="css-0">
            <p className="MuiTypography-root MuiTypography-caption-sm css-1apuigl">
              Security
            </p>
            <p className="MuiTypography-root MuiTypography-subtitle css-1jh0mz3">
              {item?.collateral || "--"}
            </p>
          </div>
        </div>
     <div className="css-0"  style={{width:'20%'}}>
          <p className="MuiTypography-root MuiTypography-caption-sm css-1apuigl">
            Guarantor
          </p>
          <p className="MuiTypography-root MuiTypography-subtitle css-bfkfjx">
            {item?.guarantor_name|| "--"}
          </p>
        </div>
        

      <div className="css-0"  style={{width:'50%'}}>
          <p className="MuiTypography-root MuiTypography-caption-sm css-1m50ljv">
            Referred by
          </p>
          <p className="MuiTypography-root MuiTypography-subtitle css-1qtl08s">
            {item?.referred_by || "--"}
          </p>
        </div>
      </div>
      <div
        className="css-nmceeh"
        style={{
          padding: 4,
          background: "rgb(237, 246, 255)",
          display: "flex",
          alignItems: "center",
          height:35
        }}
      >
        <p
          style={{ color: "blue", fontSize: 12 }}
          className="MuiTypography-root MuiTypography-caption-sm css-1apuigl"
        >
          {item.short_description}{" "}
        </p>
      </div>
    </div> */}
  </div>
)

}


export default Card;