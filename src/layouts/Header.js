import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import { ReactComponent as LogoWhite } from "../assets/images/logos/xtremelogowhite.svg";
import user1 from "../assets/images/users/user1.jpg";

const Header = ({ title,isHide,onNewCase,onSearch,setRejected,setStatus }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [dropdownOpen4, setDropdownOpen4] = React.useState(false);
  const toggle4 = () =>{
    toggleDropdown3()
    setDropdownOpen4((prevState) => !prevState);
  } 
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  const [dropdownOpen2, setDropdownOpen2] = useState(null);
  const [dropdownOpen3, setDropdownOpen3] = useState(null);

  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDropdown2 = () => setDropdownOpen2((prevState) => !prevState);
  const toggleDropdown3 = () => setDropdownOpen3((prevState) => !prevState);
  const handleSearchClick = () => {
    setSearchActive(true);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchActive(false);
  };

  return (
    <Navbar color="primary" dark expand="md" className="p-0" style={{height:60}}>
      <i
        class="bi bi-list"
        style={{ fontSize: 30, color: "#fff", cursor: "pointer" }}
        onClick={() => showMobilemenu()}
      ></i>

      <div
        className="d-flex align-items-center p-2"
        style={{ justifyContent: "center", height: "100%",position:'absolute',left:50, paddingTop: 5 }}
      >
        <h6 style={{ color: "#fff", marginTop: 8 }}>{title}</h6>
      </div>
      {!isHide && (

      <div className="search-container" style={{position:'absolute',right:60}}>
        {searchActive ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              style={{ marginRight: 10, width: 400 }}
              placeholder="Search..."
            />
            <i
              className="bi bi-x-circle"
              style={{ fontSize: 24, cursor: "pointer" }}
              onClick={handleClearSearch}
            ></i>
          </div>
        ) : (
          <>
            
           
           
            <Dropdown isOpen={dropdownOpen3} toggle={toggleDropdown3}>
              <DropdownToggle
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
               <i class="bi bi-three-dots-vertical" style={{fontSize:30}}></i>
              </DropdownToggle>
              <DropdownMenu right style={{width:200,background:'#fff'}}>
                <DropdownItem  onClick={onSearch}>
                <i
              className="bi bi-search"
              style={{ fontSize: 24, marginRight: 10, cursor: "pointer" }}
             
            ></i> Search
                </DropdownItem>
                <DropdownItem>
                <i
              className="bi bi-arrow-down-up"
              style={{ fontSize: 24, marginRight: 10 }}
            ></i> Sort
                  </DropdownItem>

                <DropdownItem onClick={toggle4}> 

<Dropdown isOpen={dropdownOpen4} toggle={toggle4}>
            {/* <DropdownToggle caret> */}
            <i
              className="bi bi-funnel-fill"
              style={{ fontSize: 24, marginRight: 10 }}
            ></i> Filter
            {/* </DropdownToggle> */}
            <DropdownMenu>
              <DropdownItem header>Case Purpose</DropdownItem>
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem header>Month of Creation</DropdownItem>
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem header>Created By</DropdownItem>
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem header>Status</DropdownItem>
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
            </DropdownMenu>
          </Dropdown> 
            </DropdownItem>


            {/* <DropdownItem onClick={()=>setRejected(true)}>
            <i class="bi bi-x-circle-fill" style={{fontSize:22}}></i>&nbsp;&nbsp;&nbsp;&nbsp;Rejected Cases
                  </DropdownItem> */}

                  <DropdownItem onClick={()=>setStatus('closed')}><i class="bi bi-dash-circle-fill" style={{fontSize:22}}></i>&nbsp;&nbsp;&nbsp;&nbsp;Closed Case</DropdownItem>
                <DropdownItem onClick={()=>setStatus('rejected')}> <i class="bi bi-x-circle-fill" style={{fontSize:22}}></i>&nbsp;&nbsp;&nbsp;&nbsp;Reject Case</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Dropdown isOpen={dropdownOpen2} toggle={toggleDropdown2}>
              <DropdownToggle
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <i
                  className="bi bi-plus-circle-fill"
                  style={{ fontSize: 24 }}
                ></i> 
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={onNewCase}>
                  {/* <Link to="/new-case" style={{ textDecoration: "none" }}> */}
                    Create New Case
                  {/* </Link> */}
                </DropdownItem>
                <DropdownItem onClick={()=>setStatus('draft')}>View Drafts</DropdownItem>
               
              </DropdownMenu>
            </Dropdown>
          </>
        )}
      </div>
)}
      <Collapse navbar isOpen={isOpen} style={{position:'absolute',right:20}}>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="primary">
            <img
              src={user1}
              alt="profile"
              className="rounded-circle"
              width="30"
            ></img>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Info</DropdownItem>
            <DropdownItem>My Account</DropdownItem>
            <DropdownItem><Link to={'/new-password'}>Change Password</Link></DropdownItem>
            <DropdownItem divider />
            <DropdownItem>My Balance</DropdownItem>
            <DropdownItem>Inbox</DropdownItem>
            <DropdownItem>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
