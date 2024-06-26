import React, { useRef, useState } from "react";

import { Button, FormGroup, Input, Label, Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardBody,
  CardFooter, } from "reactstrap";

import "../styles.scss";
import { default as ReactSelect } from "react-select";

import { components } from "react-select";
import HoursDropdown from "../ui/HoursDropdown";

export const colourOptions = [
  { value: "ocean1", label: "Ocean" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
  { value: "yellow", label: "Yellow" },
  { value: "green", label: "Green" },
  { value: "forest", label: "Forest" },
  { value: "slate", label: "Slate" },
  { value: "silver", label: "Silver" },
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Option2 = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

const ruleName = [
  { label: "Active between", value: "1" },
  { label: "Does not run", value: "2" },
];

const When = ({ setActiveTab }) => {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#0bb7af", // Change the background color here
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#fff", // Change the placeholder color here
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff", // Change the color of the selected value here
    }),
  };

  const [selectedValue, setSelectedValue] = useState("");
  const [recurrence, setrecurrence] = useState([]);
  const [allRules, setAllRules] = useState([]);
  const [optionSelectedRule, setOptionSelectedRule] = useState({
    label: "+ Add Rule",
    value: "0",
  });

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState(generateTimeSlots());

  const [modalOpen, setModalOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value === "1") {
      setDropdownOpen(true);
    } else {
      setDropdownOpen(false);
    }
  };

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    if (selectedSlots.includes(value)) {
      setSelectedSlots(selectedSlots.filter(day => day !== value));
    } else {
      setSelectedSlots([...selectedSlots, value]);
    }
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });

    const selectedDays = recurrence.includes(value)
      ? recurrence.filter((day) => day !== value)
      : [...recurrence, value];

    setrecurrence(selectedDays);
  };

  const handleChangeRule = (selected) => {
    setOptionSelectedRule(selected);
    console.log("selected===", selected);
    toggleModal();
  };

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };


 

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSave = () => {
    // Implement save functionality here
    // console.log(`From ${startDate}, ${startTime} TO ${endDate}, ${endTime}`);
    // setSelectedDate(`From ${startDate}, ${startTime} TO ${endDate}, ${endTime}`)
    setAllRules([...allRules, optionSelectedRule]);
    setModalOpen(false);
    setOptionSelectedRule({
      label: "+ Add Rule",
      value: "0",
    });
  };
  function generateTimeSlots() {
    const slots = [];
    for (let i = 6; i < 30; i++) { // Adjusted to start from 6 AM and end at 6 AM next day
      const hour = i % 12 === 0 ? 12 : i % 12;
      const suffix = i < 12 || i === 24 ? "AM" : "PM"; // Handling midnight (24:00)
      const slot = `${hour}:00 ${suffix}-${(hour + 1) % 12}:00 ${suffix}`;
      slots.push(slot);
    }
    return slots;
  }
  
  function getUniqueValuesByKey(val) {
    console.log(val);
  

    // const uniqueValues = new Set();
    // devices.forEach((obj) => {
    //   uniqueValues.add({ label: obj[key], value: obj[key] });
    // });
    // return Array.from(uniqueValues);

    const uniqueValues = new Set();
    const uniqueArray = [];

    selectedSlots.forEach((obj) => {
      const value = obj;
      if (!uniqueValues.has(value)) {
        uniqueValues.add(value);
        uniqueArray.push(obj);
      }
    });

    console.log(uniqueArray);

    return uniqueArray?.filter((itm) => itm !== "");
  }


  const formatArray = (arr) => {
    if (arr.length > 3) {
      return arr.slice(0, 3).join(", ") + " ...";
    } else {
      return arr.join(", ");
    }
  };
  return (
    <Card>
    <CardBody>
      <br/>
    <label style={{ marginRight: 20 }}> Campaign duration</label>
    <br />
    {selectedDate && <p style={{color:'#3D85C6',fontSize:16,fontWeight:'bold'}}>{selectedDate}</p>}
    <br />
    <div style={{ display: "flex", width: 600, alignItems: "center" }}>
      <FormGroup style={{ display: "flex", alignItems: "center" }}>
        <Label style={{ width: 180 }} for="startDateInput">
          Start Date:
        </Label>
        <Input
          type="date"
          id="startDateInput"
          value={startDate}
          onChange={handleStartDateChange}
          style={{ width: 150 }}
        />
      </FormGroup>
      <FormGroup style={{ marginLeft: 20 }}>
        <HoursDropdown setHour={setStartTime} hour={startTime} />
      </FormGroup>
    </div>

    <div style={{ display: "flex", width: 600, alignItems: "center" }}>
      <FormGroup style={{ display: "flex", alignItems: "center" }}>
        <Label style={{ width: 180 }} for="endDateInput">
          End Date:
        </Label>
        <Input
          type="date"
          id="endDateInput"
          value={endDate}
          onChange={handleEndDateChange}
          style={{ width: 150 }}
        />
      </FormGroup>
      <FormGroup style={{ marginLeft: 20 }}>
        <HoursDropdown setHour={setEndTime}  hour={endTime} />
      </FormGroup>
    </div>
      <div>
        <Label style={{ width: 180 }} for="dateInput">
          Runs on :{" "}
        </Label>
        {days.map((day) => (
          <div
            key={day}
            className={`day ${recurrence.includes(day) ? "selected" : ""}`}
            onClick={() =>
              handleInputChange({ target: { name: "recurrence", value: day } })
            }
          >
            {day}
          </div>
        ))}
      </div>
      {allRules.map((rule) => (
            <div
              style={{
                position: "relative",
                marginTop: 20,
                fontWeight: "600",
                width: '94%',
                background: "#CFE2F3",
                borderRadius: 10,
                height: 40,
                display: "flex",
                paddingLeft: 10,
                alignItems: "center",
              }}
              className="selected-items"
            >
              <label>+ {rule.label}{" : "}</label>
              <span style={{ marginLeft: 5,color:'blue' }}>
                {
                  formatArray(getUniqueValuesByKey(selectedSlots)
                 )
                }
              </span>
              <div
                style={{ position: "absolute", right: 10, cursor: "pointer" }}
                onClick={() => {
                  setOptionSelectedRule({ label: "Active between", value: "1" })
                  toggleModal();
                }}
              >
                <i class="bi bi-pencil"></i>
              </div>
            </div>
           ))} 
      <div style={{ width: 200, marginTop: 20 }}>
        <ReactSelect
          options={ruleName?.filter(
            (itm) => !allRules?.find((obj) => obj.value === itm.value)
          )}
          isMulti={false}
          closeMenuOnSelect={true}
          hideSelectedOptions={true}
          components={{
            Option2,
          }}
          placeholder="Add Rule"
          onChange={(e) => handleChangeRule(e)}
          allowSelectAll={true}
          value={optionSelectedRule}
          styles={customStyles}
        />
      </div>
      <br/><br/><br/>

      <CardFooter style={{width:'100%',justifyContent:'center',display:'flex'}}>
          <Button color="secondary" style={{width:120}} onClick={()=>setActiveTab('What')}>  <i class="bi bi-caret-left-fill"></i> Go Back</Button>{" "}
          <div style={{display:'flex'}}>
          <Button style={{width:120,marginLeft:150}}  onClick={handleSave} color="secondary">Save</Button>{" "}
      
          <Button color="secondary" style={{width:120,marginLeft:25,marginRight:150}}>  Exit</Button>{" "}
          </div>
          <Button color="primary" style={{width:120}} onClick={()=>setActiveTab('How')}>Next   <i class="bi bi-caret-right-fill"></i></Button>
        </CardFooter>
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Select Time Slots</ModalHeader>
        <ModalBody style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <FormGroup>
            {generateTimeSlots().map((slot) => (
              <FormGroup key={slot} check>
                <Label check>
                  <Input
                    type="checkbox"
                    value={slot}
                    checked={selectedSlots.includes(slot)}
                    onChange={handleCheckboxChange}
                  />{" "}
                 <div style={{width:200,marginTop:8,marginLeft:15}}>{slot}</div>
                </Label>
              </FormGroup>
            ))}
          </FormGroup>
        </ModalBody>
        <ModalFooter>
        <Button style={{width:120}} color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
          <Button style={{width:120}} color="primary" onClick={handleSave}>
            Save
          </Button>{" "}
        
        </ModalFooter>
      </Modal>

   </CardBody>
   </Card>
  );
};

export default When;
