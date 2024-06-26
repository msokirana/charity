
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










const SelectCityModal = ({cities,modalOpen,toggleModal,selectedCities,handleItemChange,saveSelectedItems})=>{



return (
    <Modal
    isOpen={modalOpen}
    toggle={toggleModal}
    style={{ maxWidth: "700px", width: "100%" }}
  >
    <ModalHeader toggle={toggleModal}>Select cities and towns</ModalHeader>
    <ModalBody>
      {cities.map(({ Screen_Id, City, District, State, count }) => (
        <FormGroup check key={Screen_Id?.toString()}>
          <Label check>
            <Input
              type="checkbox"
              value={City?.toString()}
              onChange={(e) => handleItemChange(e, "city")}
              checked={selectedCities.includes(City?.toString())}
            />{" "}
            <div style={{marginTop:8,marginLeft:15,width:400}}>{City}, {District}, {State}, {count}</div>
          </Label>
        </FormGroup>
      ))}
    </ModalBody>
    <ModalFooter>
    <Button style={{width:120}} color="secondary" onClick={toggleModal}>
        Cancel
      </Button>
      <Button style={{width:120}}  color="primary" onClick={saveSelectedItems}>
        Save
      </Button>{" "}
   
    </ModalFooter>
  </Modal>
)

      }

      export default SelectCityModal;