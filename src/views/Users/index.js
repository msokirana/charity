import React, { useState, useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import ProjectTables from "../../components/dashboard/ProjectTable";

import { useNavigate } from "react-router-dom";
import Header from "../../layouts/Header";
import jsonData from "../../assets/csvjson.json";
import ReactSelect from "react-select";
import { components } from "react-select";
import UserTable from "../../components/dashboard/UserTable";
import AddUserModal from "./AddUserModal";



const Users = () => {
  const navigate = useNavigate();
  const [rSelected, setRSelected] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [campaignData, setCampaignData] = useState([{                
    "user_role": "Admin",    
    "email": "siddhartha.das@okirana.com",
    "first_name": "Siddhartha ",
    "last_name": "Das",
    "user_phonenumber": "8920568999",                
    "is_active": "Active", 
    "created_on":"20 Feb, 2024"                       
},
{                
  "user_role": "Member",    
  "email": "arvind.singh@okirana.com",
  "first_name": "Arvind ",
  "last_name": "Singh",
  "user_phonenumber": "8920568999",                
  "is_active": "Active",  
  "created_on":"28 Feb, 2024"                       
},
{                
  "user_role": "Admin, Member",    
  "email": "mohit.raj@okirana.com",
  "first_name": "Mohit ",
  "last_name": "Raj",
  "user_phonenumber": "8920568999",                
  "is_active": "Active", 
  "created_on":"19 Mar, 2024"                        
},
{                
  "user_role": "Member",    
  "email": "nisharangan@gmail.com",
  "first_name": "Nisha ",
  "last_name": "Rangan",
  "user_phonenumber": "8920568999",                
  "is_active": "Active",      
  "created_on":"7 Mar, 2024"                   
},
{                
  "user_role": "Member",    
  "email": "anuradha@hotmail.com",
  "first_name": "Anu ",
  "last_name": "Radha",
  "user_phonenumber": "8920568999",                
  "is_active": "Suspended",  
  "created_on":"19 Mar, 2024"                       
},
{                
  "user_role": "Member",    
  "email": "vimal.g01@gmail.com",
  "first_name": "Vimal ",
  "last_name": "Gupta",
  "user_phonenumber": "8920568999",                
  "is_active": "Suspended",  
  "created_on":"27 Mar, 2024"                       
}]);


  

  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  
  const handleChangeTag = (selectedOptions) => {
    setSelectedTags(selectedOptions);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const [data, setData] = useState(null);


  useEffect(() => {
    let filData = [];

    if (rSelected === 1) {
      filData = jsonData?.filter((item) => item["Campaign State"] === "Live");
    } else if (rSelected === 2) {
      filData = jsonData?.filter(
        (item) => item["Campaign State"] === "Expired"
      );
    } else if (rSelected === 3) {
      filData = jsonData?.filter((item) => item["Campaign State"] === "Draft");
    } else {
      filData = jsonData;
    }
    // else if(rSelected===4){
    //   filData = jsonData?.filter((item) => item['Campaign State'] === 'Live');

    // }

    const allCampaign = localStorage.getItem("campaigns");
    if (allCampaign) {
      filData = [...filData, ...JSON.parse(allCampaign)];
    }
    const uniqueTagValues = [...new Set(jsonData.map((item) => item.Campaign_tag))];
    const tag = uniqueTagValues?.map((item) => {
      let tag = {label:item,value:item}
     
      return tag
    });

    setTags(tag)

    console.log("tag====",tag)

    setData([...filData]);
    console.log(rSelected);
  }, [rSelected]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setCampaignData({ ...campaignData, [name]: newValue });
  };

  const handleSubmit = () => {
    let allCampaign = localStorage.getItem("campaigns");

    if (allCampaign) {
      allCampaign = JSON.parse(allCampaign);
    } else {
      allCampaign = [];
    }

    allCampaign.push({
      ...campaignData,
      ["Campaign State"]: "Draft",
      id: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    });
    console.log(allCampaign);
    localStorage.setItem("campaigns", JSON.stringify(allCampaign));

    toggleModal();
    navigate("/add-campaign", { state: campaignData });
  };

  const onRadioBtnClick = (rSelected) => {
    setRSelected(rSelected);
  };

  const handleClick = () => {
    navigate("/add-campaign");
  };

  return (
    <>
      <Header title={"Users"} />
      <div style={{ width: "95%", margin: "0px auto" }}>
        <Row>
          <Col lg="12">
            <div
              style={{
                display: "flex",
                padding: 10,
                width: "100%",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
          
              <div>
                <Button
                  color="light-success"
                  style={{ width: 200, height: 50, fontSize: 18 }}
                  onClick={toggleModal}
                >
                  + New User
                </Button>
              
              </div>
            </div>
            <UserTable data={campaignData} />

            <AddUserModal {...{modalOpen, setModalOpen}}/>
          </Col>
        </Row>
        {/***Blog Cards***/}
      </div>
    </>
  );
};

export default Users;
