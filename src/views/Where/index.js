import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import cityJson from "../../assets/json/device.json";
import "../styles.scss";
import { default as ReactSelect } from "react-select";

import { components } from "react-select";
import DevicesModal from "./DevicesModal";
import AddRule from "./AddRule";
import SelectCityModal from "./SelectCityModal";

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

const ruleName = [
  { label: "Area within cities", value: "1" },
  { label: "Pincodes", value: "2" },
  { label: "Average daily LTS", value: "3" },
  { label: "Street facing", value: "4" },
  { label: "Income groups", value: "5" },
  { label: "Locality type", value: "6" },
  { label: "Signage Type", value: "7" },
  { label: "Screen Shape", value: "8" },
  { label: "Screen dimensions", value: "9" },
  { label: "Screen demand", value: "10" },
];

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

const Option2 = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

const Where = ({ data,setActiveTab }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [cities, setCities] = useState([]);
  const [optionSelected, setOptionSelected] = useState({});
  const [deviceModalOpen, setDeviceModalOpen] = useState(false);
  const [addRule, setAddRule] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);
  const [viewCities, setViewCitites] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [optionSelectedRule, setOptionSelectedRule] = useState({
    label: "+ Add Rule",
    value: "0",
  });

  const [devices, setDevices] = useState([]);

  const [allRules, setAllRules] = useState([]);

  useEffect(() => {
    const uniqueArray = cityJson.filter(
      (obj, index, self) => index === self.findIndex((o) => o.City === obj.City)
    );

    setCities(uniqueArray.filter((itm) => itm.City !== ""));
  }, []);

  

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleRuleModal = () => {
    setAddRule(!addRule);
  };

  const toggleDeviceModal = () => {
    setDeviceModalOpen(!deviceModalOpen);
  };

  const handleItemChange = (e, type) => {
    const { value, checked } = e.target;
    if (type === "city") {
      setSelectedCities((prevItems) =>
        checked
          ? [...prevItems, value]
          : prevItems.filter((item) => item !== value)
      );
    } else {
      setSelectedDevices((prevItems) =>
        checked
          ? [...prevItems, value]
          : prevItems.filter((item) => item !== value)
      );
    }
  };

  const saveSelectedItems = () => {
    toggleModal();
    // Handle save action if needed
  };

  const getKey = (val) => {
    if (val === "1") {
      return "Area";
    }
    if (val === "2") {
      return "Pincodes";
    }
    if (val === "3") {
      return "Average_daily";
    }
    if (val === "4") {
      return "Street_facing";
    }
    if (val === "5") {
      return "Income_group";
    }
    if (val === "6") {
      return "Locality_type";
    }
    if (val === "7") {
      return "Signage_type";
    }
    if (val === "8") {
      return "Screen_shape";
    }
    if (val === "9") {
      return "Screen_dimensions";
    }
    if (val === "10") {
      return "Screen_demand";
    }
  };

  function getUniqueValuesByKey(val) {
    console.log(val);
    const key = getKey(val);

    // const uniqueValues = new Set();
    // devices.forEach((obj) => {
    //   uniqueValues.add({ label: obj[key], value: obj[key] });
    // });
    // return Array.from(uniqueValues);

    const uniqueValues = new Set();
    const uniqueArray = [];

    devices.forEach((obj) => {
      const value = obj[key];
      if (!uniqueValues.has(value)) {
        uniqueValues.add(value);
        uniqueArray.push(obj);
      }
    });

    console.log(uniqueArray);

    return uniqueArray?.filter((itm) => itm[key] !== "");
  }

  useEffect(() => {
    console.log(devices);
  }, [devices]);

  const handleChange = (selected, key) => {
    setOptionSelected({ ...optionSelected, [key]: selected });
  };

  const saveSelectedRule = () => {
    console.log(optionSelectedRule);
    // let rules = allRules || [];

    const findIndex = allRules.findIndex(
      (obj) => obj.value === optionSelectedRule.value
    );

    console.log("findIndex====", findIndex);
    if (findIndex > -1) {
    } else {
      setAllRules([...allRules, optionSelectedRule]);
    }

    toggleRuleModal();
    setOptionSelectedRule({ label: "+ Add Rule", value: "0" });
  };

  useEffect(() => {
    setDevices([]);
    setSelectedDevices([]);

    console.log(selectedCities);
    selectedCities?.forEach((itm) => {
      const allDevice = cityJson
        .filter((obj) => obj.City === itm)
        ?.map((obj) => {
          let newObj = obj;

          newObj.checked = true;

          return newObj;
        });
      console.log("allDevice==", allDevice);
      setDevices((prev) => [...prev, ...allDevice]);
      setSelectedDevices((prev) => [
        ...prev,
        ...allDevice?.map((obj) => obj.Screen_Id.toString()),
      ]);
    });
  }, [selectedCities]);

  const handleChangeRule = (selected) => {
    //   setAddRule(true)
    setOptionSelectedRule(selected);
    console.log("selected===", selected);
  };

  useEffect(() => {
    if (optionSelectedRule && optionSelectedRule?.value !== "0") {
      setAddRule(true);
    }
  }, [optionSelectedRule]);

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

  const [checkboxes, setCheckboxes] = useState([]);

  const handleCheckboxChange = (key, value) => {
    // setCheckboxes(prevCheckboxes =>
    //   prevCheckboxes.map(checkbox =>
    //     checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox
    //   )
    // );
    const keyName = getKey(key);

    console.log({ key, value });

    const filterDevices = devices.map((obj) => {
      if (obj[keyName] === value) {
        return { ...obj, checked: !obj.checked };
      }
      return obj;
    });

    setDevices(filterDevices);
    console.log(devices);
  };

  const formatArray = (arr) => {
    if (arr.length > 3) {
      return arr.slice(0, 3).join(", ") + " ...";
    } else {
      return arr.join(", ");
    }
  };

  return (
    <>
      <Card style={{ marginTop: 20 }}>
        <CardBody>
          <div className="item-header">
            <h5>Screens</h5>
            <Button
              className="btn"
              color="link"
              onClick={() => setDeviceModalOpen(true)}
            >
              {devices?.filter((itm) => itm.checked)?.length} Screens
            </Button>
          </div>
          {selectedCities?.length > 0 ? (
            <>
              <label> Select cities and towns to cover</label>
              <div
                className="selected-items"
                style={{ display: "flex",color:'blue', alignItems: "center" }}
              >
                {formatArray(selectedCities)}

                <i
                  class="bi bi-pencil"
                  style={{ marginLeft: 10, cursor: "pointer" }}
                  onClick={toggleModal}
                ></i>
              </div>
            </>
          ) : (
            <>
              <label style={{ marginRight: 20 }}>
                {" "}
                Select cities and towns to cover
              </label>
              <Button
                onClick={toggleModal}
                className="btn"
                outline
                color="primary"
              >
                Select
                <i class="bi bi-caret-right-fill"></i>
              </Button>
            </>
          )}

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
              + {rule.label}{" : "}
              {/* <label>+ {rule.label}{" : "}</label> */}
              <span style={{ marginLeft: 5,color:'blue' }}>
                {formatArray(
                  getUniqueValuesByKey(rule.value)
                    ?.filter((itm) => itm?.checked)
                    ?.map((obj) => obj?.[getKey(rule.value)])
                )}
              </span>
              <div
                style={{ position: "absolute", right: 10, cursor: "pointer" }}
                onClick={() => setOptionSelectedRule(rule)}
              >
                <i class="bi bi-pencil"></i>
              </div>
            </div>
          ))}

          {/* <Button onClick={()=> setAddRule(true)} color="success" style={{ marginTop: "80px" }}>
               <i class="bi bi-plus-circle-fill"></i> Add rule
             </Button> */}
          {selectedCities?.length > 0 && (
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
          )}
        </CardBody>

        <br/><br/><br/>
        <CardFooter style={{width:'100%',justifyContent:'center',display:'flex'}}>
          {/* <Button color="secondary" style={{width:120}}>  <i class="bi bi-caret-left-fill"></i> Go Back</Button>{" "} */}
          <div style={{display:'flex'}}>
          <Button style={{width:120,marginLeft:150}} color="secondary">Save</Button>{" "}
      
          <Button color="secondary" style={{width:120,marginLeft:25,marginRight:150}}>  Exit</Button>{" "}
          </div>
          <Button color="primary" style={{width:120,background:selectedCities?.length === 0 &&'grey'}} onClick={()=>setActiveTab('What')}>Next   <i class="bi bi-caret-right-fill"></i></Button>
        </CardFooter>
      </Card>
      <SelectCityModal
        {...{
          cities,
          modalOpen,
          toggleModal,
          selectedCities,
          handleItemChange,
          saveSelectedItems,
        }}
      />

      <DevicesModal
        {...{
          deviceModalOpen,
          toggleDeviceModal,
          devices,
          handleItemChange,
          selectedDevices,
          saveSelectedItems,
        }}
      />
      <AddRule
        {...{
          saveSelectedRule,
          addRule,
          toggleRuleModal,
          optionSelectedRule,
          getUniqueValuesByKey,
          handleCheckboxChange,
          handleChange,
        }}
      />
    </>
  );
};

export default Where;
