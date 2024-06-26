import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Input,
} from "reactstrap";
import MultiRangeSlider from "multi-range-slider-react";
import Switch from "react-switch";

const HowTable = ({ data }) => {
  const [minValue, setMinValue] = useState(25);
  const [maxValue, setMaxValue] = useState(75);
  const [checkedItems, setCheckedItems] = useState({});
  const [checked, setChecked] = useState(false);

  const [sliderValues, setSliderValues] = useState([]);

  const handleInput = (index, e) => {
    const updatedSliderValues = [...sliderValues];
    updatedSliderValues[index] = { minValue: e.minValue, maxValue: e.maxValue };
    setSliderValues(updatedSliderValues);
  };


  // const handleInput = (e) => {
  //   setMinValue(e.minValue);
  //   setMaxValue(e.maxValue);
  // };

  const handleChange = (checked, index) => {
    setCheckedItems({
      ...checkedItems,
      [index]: checked
    });
  };

  const handleChangeToggle = (checked) => {
    setChecked(checked);
  }; 

  
  return (
    <>
      <CardTitle
        tag="h5"
        style={{
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
        }}
      >
        Campaign cost and budget
        <div
          style={{
            marginBottom: 20,
            marginRight:20,
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
        
          <span>{!checked?"Standard 30 sec slot":"Uploaded media file (30 sec)"}</span>
          <Switch
              onChange={handleChangeToggle}
              checked={checked}
            checkedIcon={false}
            uncheckedIcon={false}
          />
        </div>
      </CardTitle>
      <Card style={{ margin: 10 }}>
        <CardBody
          style={{
            display: "flex",
            height: 80,
            marginTop: 20,
            justifyContent: "space-between",
          }}
        >
          <CardTitle tag="h5" style={{ width: "5%" }}>Select</CardTitle>
          <CardTitle tag="h5" style={{ width: "15%" }}>
          <div>Screen Demand</div>
            <div style={{fontSize:18,fontWeight:400,marginTop:5}}>Parallel Campaigns</div>
          </CardTitle>
          <CardTitle tag="h5" style={{ width: "15%" }}>
            <div>Cost (Impressions) :</div>
            <div style={{fontSize:18,fontWeight:400,marginTop:5}}>Cost per ‘000 (CPM)</div>
              
          </CardTitle>
          <CardTitle tag="h5" style={{ width: "25%" }}>
            Limit slots per hour (120)
            <div style={{fontSize:18,fontWeight:400,marginTop:5,display:'flex', justifyContent:'space-between'}}>
              <div>Min</div>
              <div>Max</div>
            </div>
          </CardTitle>
          <CardTitle tag="h5" style={{ width: "25%" }}>
            Above 60 slots/hour
          </CardTitle>
          {/* <CardTitle tag="h5" style={{ width: "10%" }}>State</CardTitle>
          <CardTitle tag="h5" style={{ width: "15%" }}>Budget</CardTitle>
          <CardTitle tag="h5" style={{ width: "10%", display: "flex", justifyContent: "center" }}>Action</CardTitle> */}
        </CardBody>
      </Card>

      {data?.map((item, index) => (
        <Card key={index} style={{ margin: 10, backgroundColor: checkedItems[index] ? '#71B0EB' : 'white' }}>
          <CardBody
            style={{
              display: "flex",
              height: 70,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ width: "5%" }}>
              <Input 
                type="checkbox" 
                checked={checkedItems[index] || false} 
                onChange={(e) => handleChange(e.target.checked, index)}
              />
            </div>
            <div style={{ width: "15%", paddingRight: 20 }}>
              <CardTitle style={{ fontWeight: "300" }} tag="h5">
                {item?.screen_demand}
              </CardTitle>
            </div>

            <div style={{ width: "15%" }}>
              <h5 style={{ fontWeight: "300" }}>{item?.lts_cost}</h5>
            </div>

            <div style={{ width: "25%" }}>
              <MultiRangeSlider
                min={0}
                max={120}
                step={5}
                minValue={sliderValues[index]?.minValue || 25}
                maxValue={sliderValues[index]?.maxValue || 75}
                barInnerColor="#0d6efd"
                onInput={(e) => handleInput(index, e)}
                ruler={false}
              />
            </div>

            <div style={{ width: "25%" }}>
              <h5 style={{ fontWeight: "300" }}>{item?.above_slots}</h5>
            </div>
          </CardBody>
        </Card>
      ))}
    </>
  );
};

export default HowTable;
