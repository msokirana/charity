import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";
import ProjectTables from "../components/dashboard/ProjectTable";
import TopCards from "../components/dashboard/TopCards";
import Blog from "../components/dashboard/Blog";
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";
import FormComponent from "../components/dashboard/FormComponent";
import CampaignTab from "./CampaignTab";
import Header from "../layouts/Header";
import { useLocation } from "react-router-dom";
import { useState ,useEffect} from "react";


const AddCampaign = () => {

  const location = useLocation();

  const [receivedData, setreceivedData] = useState();
  // const receivedData = location.state;

  console.log("receivedData==",receivedData)

  useEffect(()=>{
    const data = localStorage.getItem('campaigns');
    if(data){
      setreceivedData(JSON.parse(data)?.[0])
    }
  },[])



  return (
    <>
    <Header title={receivedData?.Name} />
    <div>
      {/***Top Cards***/}
  
      {/***Sales & Feed***/}
    
      {/***Table ***/}
      <Row>
        <Col lg="12">
          {/* <FormComponent /> */}
          <CampaignTab data={receivedData}/>
        </Col>
      </Row>
      {/***Blog Cards***/}
     
    </div>
    </>
  );
};

export default AddCampaign;
