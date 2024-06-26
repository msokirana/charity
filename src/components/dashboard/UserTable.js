import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Progress,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import user1 from "../../assets/images/users/user1.jpg";
import videoFile from "../../assets/videos/sample.mp4";
import "./ToggleSwitch.css";

const UserTable = ({ data }) => {
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleDropdown = (index) =>
    setDropdownOpen(index === dropdownOpen ? null : index);

    const toggleFullScreen = (video) => {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) { /* Safari */
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) { /* IE11 */
        video.msRequestFullscreen();
      }
    };

  return (
    <>
      <Card style={{ margin: 10 }}>
        <CardBody
          style={{
            display: "flex",
            height: 52,
            justifyContent: "space-between",
          }}
        >
          <CardTitle tag="h5" style={{ width: "25%" }}>
            Name 
          </CardTitle>
          <CardTitle tag="h5" style={{ width: "15%" }}>
            Email
          </CardTitle>
          <CardTitle tag="h5" style={{ width: "15%" }}>
          Role
          </CardTitle>
          <CardTitle tag="h5" style={{ width: "10%" }}>
          Status
          </CardTitle>
          <CardTitle tag="h5" style={{ width: "10%" }}>
          Created On
          </CardTitle>
          
          <CardTitle
            tag="h5"
            style={{ width: "10%", display: "flex", justifyContent: "center" }}
          >
            Action
          </CardTitle>
        </CardBody>
      </Card>
      <div>
        {data?.map((item, index) => (
          <Card key={index} style={{ margin: 10 }}>
            <CardBody
              style={{
                display: "flex",
                height: 50,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ width: "25%", paddingRight: 20 }}>
                <CardTitle tag="h5" style={{ fontWeight: "300" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop:10
                      // position: "relative",
                    }}
                  >
                  <i style={{fontSize:40}} class="bi bi-person-circle"></i>&nbsp;&nbsp;  {item?.first_name}&nbsp;{item?.last_name}
                   
                  </div>
                </CardTitle>
              </div>
              <div
                style={{
                  width: "15%",
                  display: "flex",
                  // justifyContent: "center",
                  // flexDirection: "column",
                }}
              >
                {item?.email}
              </div>
              <div
                style={{
                  width: "15%",
                  // display: "flex",
                  // justifyContent: "center",
                  // flexDirection: "column",
                }}
              >
                 {item?.user_role}
              </div>
              <div style={{ width: "10%" }}>
                  {item?.is_active} 
              </div>
            
              <div style={{ width: "10%" }}>
                  {item?.created_on} 
              </div>

              <div
                style={{
                  width: "10%",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <Dropdown
                  isOpen={index === dropdownOpen}
                  toggle={() => toggleDropdown(index)}
                >
                  <DropdownToggle
                    style={{
                      color: "#000",
                      background: "transparent",
                      border: "none",
                    }}
                  >
                    <i
                      className="bi bi-three-dots-vertical"
                      style={{ fontSize: 30 }}
                    ></i>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <i class="bi bi-pencil-fill"></i>&nbsp; Edit
                    </DropdownItem>
                    
         
                    <DropdownItem>
                      <i class="bi bi-trash3-fill"></i>&nbsp;&nbsp;Delete
                    </DropdownItem>

                    <DropdownItem>
                    <i class="bi bi-envelope"></i>&nbsp;&nbsp;Re-invite
                    </DropdownItem>

                  </DropdownMenu>
                </Dropdown>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  );
};

export default UserTable;
