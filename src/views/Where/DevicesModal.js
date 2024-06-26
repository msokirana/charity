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








const DevicesModal = ({deviceModalOpen,toggleDeviceModal,devices,handleItemChange,selectedDevices,saveSelectedItems}) => {







return (

    <Modal
    isOpen={deviceModalOpen}
    toggle={toggleDeviceModal}
    style={{ maxWidth: "800px", width: "100%" }}
  >
    <ModalHeader toggle={toggleDeviceModal}>Select Screens</ModalHeader>
    <ModalBody style={{ overflowY: "scroll", maxHeight: 700 }}>
      {devices?.filter((obj)=>obj.checked)?.map(
        ({
          Screen_Id,
          Screen_name,
          Owned_by,
          Owner_name,
          Business_name,
          GSTIN,
          Address,
          City,
          District,
          State,
          Area,
          Pincodes,
          Average_daily,
          Street_facing,
          Income_group,
          Locality_type,
          Signage_type,
          Screen_shape,
          Resolution_length_pix,
          Resolution_width_pix,
          Screen_demand,
          count,
        }) => (
          <Card style={{ padding: 10 }}>
            <FormGroup check key={Screen_Id?.toString()}>
              <Label check style={{ display: "flex" }}>
                <div style={{ width: 15 }}>
                  <Input
                    type="checkbox"
                    value={Screen_Id?.toString()}
                    onChange={(e) => handleItemChange(e, "device")}
                    checked={selectedDevices.includes(
                      Screen_Id?.toString()
                    )}
                  />{" "}
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ width: "20%" }}>
                      <label>Screen Id</label>
                      <p style={{ fontWeight: 400 }}>{Screen_Id}</p>
                    </div>

                    <div style={{ width: "30%" }}>
                      <label>Screen_name</label>
                      <p style={{ fontWeight: 400 }}>{Screen_name}</p>
                    </div>
                    <div style={{ width: "30%" }}>
                      <label>Owned_by</label>
                      <p style={{ fontWeight: 400 }}>{Owned_by}</p>
                    </div>
                    <div style={{ width: "20%" }}>
                      <label>Owner_name</label>
                      <p style={{ fontWeight: 400 }}>{Owner_name}</p>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ width: "20%" }}>
                      <label>Business_name</label>
                      <p style={{ fontWeight: 400 }}>{Business_name}</p>
                    </div>

                    <div style={{ width: "30%" }}>
                      <label>Average_daily</label>
                      <p style={{ fontWeight: 400 }}>{Average_daily}</p>
                    </div>

                    <div style={{ width: "30%" }}>
                      <label>Street_facing</label>
                      <p style={{ fontWeight: 400 }}>{Street_facing}</p>
                    </div>
                    <div style={{ width: "20%" }}>
                      <label>Income_group</label>
                      <p style={{ fontWeight: 400 }}>{Income_group}</p>
                    </div>

                    {/* <div style={{ width: "30%" }}>
                      <label>GSTIN</label>
                      <p style={{ fontWeight: 400 }}>{GSTIN}</p>
                    </div> */}
                    {/* <div style={{ width: "20%" }}>
                      <label>Address</label>
                      <p style={{ fontWeight: 400 }}>{Address}</p>
                    </div>
                    <div style={{ width: "20%" }}>
                      <label>City</label>
                      <p style={{ fontWeight: 400 }}>{City}</p>
                    </div> */}
                  </div>

                  {/* <div
                    style={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  > */}
                    {/* <div style={{ width: "30%" }}>
                      <label>District</label>
                      <p style={{ fontWeight: 400 }}>{District}</p>
                    </div>

                    <div style={{ width: "30%" }}>
                      <label>State</label>
                      <p style={{ fontWeight: 400 }}>{State}</p>
                    </div> */}
                    {/* <div style={{ width: "20%" }}>
                      <label>Area</label>
                      <p style={{ fontWeight: 400 }}>{Area}</p>
                    </div>
                    <div style={{ width: "20%" }}>
                      <label>Pincodes</label>
                      <p style={{ fontWeight: 400 }}>{Pincodes}</p>
                    </div> */}
                  {/* </div> */}

                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                  
                    <div style={{ width: "20%" }}>
                      <label>Locality_type</label>
                      <p style={{ fontWeight: 400 }}>{Locality_type}</p>
                    </div>
                    <div style={{ width: "30%" }}>
                      <label>Signage_type</label>
                      <p style={{ fontWeight: 400 }}>{Signage_type}</p>
                    </div>

                    <div style={{ width: "30%" }}>
                      <label>Screen_shape</label>
                      <p style={{ fontWeight: 400 }}>{Screen_shape}</p>
                    </div>
                    <div style={{ width: "20%" }}>
                      <label>Screen_demand</label>
                      <p style={{ fontWeight: 400 }}>{Screen_demand}</p>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                  
                    <div style={{ width: "20%" }}>
                      <label>Screen Dimension</label>
                      <p style={{ fontWeight: 400 }}>
                        {Resolution_length_pix}*{Resolution_width_pix}
                      </p>
                    </div>
                  </div>
                </div>

                {/* {City}, {District}, {State}, {count} */}
              </Label>
            </FormGroup>
            <CardFooter>
            {Address},&nbsp;{City},&nbsp;{District},&nbsp;{State},&nbsp;Pin-{Pincodes}
            </CardFooter>
          </Card>
        )
      )}
    </ModalBody>
    <ModalFooter>
    <Button style={{width:120}} color="secondary" onClick={toggleDeviceModal}>
        Cancel
      </Button>
      <Button style={{width:120}} color="primary" onClick={saveSelectedItems}>
        Save
      </Button>{" "}
    
    </ModalFooter>
  </Modal>
)

                }

                export default DevicesModal;