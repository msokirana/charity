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

const AddRule = ({
  addRule,
  toggleRuleModal,
  optionSelected,
  saveSelectedRule,
  optionSelectedRule,
  getUniqueValuesByKey,
  handleCheckboxChange,
  handleChange,
}) => {
  const getKey = () => {
    if (optionSelectedRule?.value === "1") {
      return "Area";
    }
    if (optionSelectedRule?.value === "2") {
      return "Pincodes";
    }
    if (optionSelectedRule?.value === "3") {
      return "Average_daily";
    }
    if (optionSelectedRule?.value === "4") {
      return "Street_facing";
    }
    if (optionSelectedRule?.value === "5") {
      return "Income_group";
    }
    if (optionSelectedRule?.value === "6") {
      return "Locality_type";
    }
    if (optionSelectedRule?.value === "7") {
      return "Signage_type";
    }
    if (optionSelectedRule?.value === "8") {
      return "Screen_shape";
    }
    if (optionSelectedRule?.value === "9") {
      return "Screen_dimensions";
    }
    if (optionSelectedRule?.value === "10") {
      return "Screen_demand";
    }
  };

  console.log(getUniqueValuesByKey(optionSelectedRule?.value));
  console.log(optionSelectedRule);
  const key = getKey();
  return (
    <Modal
      isOpen={addRule}
      toggle={toggleRuleModal}
      style={{ maxWidth: "800px", width: "100%" }}
    >
      <ModalHeader toggle={toggleRuleModal}>
        Add Rule - {optionSelectedRule?.label}
      </ModalHeader>
      <ModalBody style={{ maxHeight: 600 }}>
        <div
          style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
        >
          {getUniqueValuesByKey(optionSelectedRule?.value)?.map((checkbox) => (
            <FormGroup style={{ margin: 8 }} key={checkbox?.[key]} check>
              <Label check style={{ display: "flex", alignItems: "center" }}>
                <Input
                  type="checkbox"
                  style={{ marginRight: 5 }}
                  checked={checkbox?.checked}
                  onChange={() =>
                    handleCheckboxChange(
                      optionSelectedRule?.value,
                      checkbox?.[key]
                    )
                  }
                />{" "}
                {checkbox?.[key]}
              </Label>
            </FormGroup>
          ))}
        </div>
      </ModalBody>
      <ModalFooter>
      <Button  style={{width:120}} color="secondary" onClick={toggleRuleModal}>
          Cancel
        </Button>
        <Button  style={{width:120}} color="primary" onClick={() => saveSelectedRule()}>
          Save
        </Button>{" "}
    
      </ModalFooter>
    </Modal>
  );
};

export default AddRule;
