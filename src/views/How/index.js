import React, { useState } from "react";
import { Button, Card, CardBody, CardFooter, Input, Table } from "reactstrap";
import "../styles.scss";
import VolumeControl from "../ui/VolumeControl";
import HowTable from "../../components/dashboard/HowTable";

function How({setActiveTab}) {
  const [data, setData] = useState([
    {
      id: 1,
      screen_demand: "10 or more",
      lts_cost: "₹ 90",
      above_slots: "20% extra charges",
      checked: false,
    },
    {
      id: 2,
      screen_demand: "7 to 9",
      lts_cost: "₹ 80",
      above_slots: "10% extra charges",
      checked: false,
    },
    {
      id: 3,
      screen_demand: "4 to 6",
      lts_cost: "₹ 70",
      above_slots: "No extra charges",
      checked: false,
    },
    {
      id: 4,
      screen_demand: "1 to 3",
      lts_cost: "₹ 60",
      above_slots: "10% discount",
      checked: false,
    },
    {
      id: 5,
      screen_demand: "No campaigns",
      lts_cost: "₹ 50",
      above_slots: "20% discount",
      checked: false,
    },
    // Add more data as needed
  ]);

  const handleCheckboxChange = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleAddFund = () => {
    // Add functionality for handling the "Add fund" action
  };

  return (
    <Card style={{ marginTop: 20 }}>
    <CardBody>
    <HowTable data={data}/>
    </CardBody>
    <CardFooter tag={'h5'} style={{fontWeight: "300"}}>
    Daily spend estimate: <strong>₹ 3,000</strong> to <strong>₹, 7000</strong> Estimates are subject to change on a daily basis. Review regularly.
</CardFooter>
    <CardFooter>
         <div style={{background:'#6FA8DC',display:'flex',justifyContent:'space-between',padding:20,alignItems:'center'}}>
           <div style={{background:'#6FA8DC',}}colSpan="8"><div style={{display:'flex',alignItems:'center'}}><h5 style={{fontWeight: "300"}}>Set Campaign budget:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹</h5><div style={{marginLeft:10,display:'flex',justifyContent:'center',alignItems:'center', width:100,height:35,background:'#fff'}}>50,000</div></div> </div>
           <div style={{background:'#6FA8DC',color:'red',display:'flex',alignItems:'center'}}colSpan="4"><h5 style={{fontWeight: "300"}}>Insufficient balance</h5> &nbsp;&nbsp; <span>
       <Button color="primary" onClick={handleAddFund}>+ Add fund</Button>
     </span></div>
         </div>
            </CardFooter>
            <CardFooter style={{width:'100%',justifyContent:'center',display:'flex'}}>

          <Button color="secondary" style={{width:120}} onClick={()=>setActiveTab('When')}>  <i class="bi bi-caret-left-fill"></i> Go Back</Button>{" "}
          <div style={{display:'flex'}}>
          <Button style={{width:120,marginLeft:150}} color="secondary">Save</Button>{" "}
      
          <Button color="secondary" style={{width:120,marginLeft:25,marginRight:150}}>  Exit</Button>{" "}
          </div>
          <Button color="primary" style={{width:120}} onClick={()=>setActiveTab('Review')}>Next   <i class="bi bi-caret-right-fill"></i></Button>
        </CardFooter>
    </Card>

  );
}

export default How;
