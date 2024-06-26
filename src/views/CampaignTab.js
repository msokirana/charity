import React, { useEffect, useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardBody,
  CardFooter,
  Button,
} from "reactstrap";

import cityJson from "../assets/json/device.json";
import Where from "./Where";
import './styles.scss'
import What from "./What";
import When from "./When";
import How from "./How";
import { Tab } from "bootstrap";

const CampaignTab = ({ data }) => {
  const [activeTab, setActiveTab] = useState("Where");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [cities, setCities] = useState([]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleItemChange = (e) => {
    const { value, checked } = e.target;
    setSelectedItems((prevItems) =>
      checked
        ? [...prevItems, value]
        : prevItems.filter((item) => item !== value)
    );
  };

  useEffect(() => {
    const uniqueCities = Array.from(
      new Set(cityJson.map((item) => item.City))
    ).filter((city) => city !== "");
    setCities(uniqueCities);
  }, []);

  return (
    <div className="campaign-tab-container">
      <Nav tabs className="campaign-tab-nav">
        {["Where", "What", "When", "How", "Review"].map((tab) => (
          <NavItem key={tab}>
            <NavLink
              className={activeTab === tab ? "active" : ""}
              onClick={() => toggleTab(tab)}
              style={{
                position: "relative",
                color: activeTab === tab ? "#fff" : "#000",
                backgroundColor: activeTab === tab ? "#328DCE" : "#E5F5FB",
                fontSize: 16,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {tab}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="Where">
          <Where data={data} setActiveTab={setActiveTab}/>
        </TabPane>
        <TabPane tabId="What">
        <What data={data} setActiveTab={setActiveTab}/>
        </TabPane>
        <TabPane tabId="When">
         <When  data={data} setActiveTab={setActiveTab}/>
        </TabPane>
        <TabPane tabId="How">
          <How  data={data} setActiveTab={setActiveTab}/>
        </TabPane>
        <TabPane tabId="Review">

          <Card>
            <CardBody>
              <h4>Review</h4>
              </CardBody>
        <CardFooter style={{width:'100%',justifyContent:'center',display:'flex'}}>
          <Button color="secondary" style={{width:120}} onClick={()=>setActiveTab('How')}>  <i class="bi bi-caret-left-fill"></i> Go Back</Button>{" "}
          <div style={{display:'flex'}}>
          <Button style={{width:120,marginLeft:150,visibility:'hidden'}}   color="secondary">Submit</Button>{" "}
      
          <Button color="secondary" style={{width:120,marginLeft:25,marginRight:150}}>  Exit</Button>{" "}
          </div>
          <Button color="primary" style={{width:120}}>Submit   <i class="bi bi-caret-right-fill"></i></Button>
        </CardFooter>
      </Card>
      </TabPane>
      </TabContent>
    </div>
  );
};

export default CampaignTab;
