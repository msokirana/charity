// import React, { useState } from "react";
// import {
//   Input,
//   InputGroup,
//   InputGroupAddon,
//   Dropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
// } from "reactstrap";

// const MultiSelectDropdown = ({ options, onChange }) => {
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

//   const handleOptionClick = (option) => {
//     const index = selectedOptions.indexOf(option);
//     if (index === -1) {
//       setSelectedOptions([...selectedOptions, option]);
//     } else {
//       setSelectedOptions([
//         ...selectedOptions.slice(0, index),
//         ...selectedOptions.slice(index + 1),
//       ]);
//     }
//   };

//   return (
//     <InputGroup>
//       <Input
//         type="text"
//         readOnly
//         value={selectedOptions.join(", ")}
//         onClick={toggleDropdown}
//       />
//         <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
//         <DropdownToggle caret>
//         <FontAwesomeIcon icon={faUser} />
//       </DropdownToggle>
//           <DropdownMenu>

     
//             {options.map((option, index) => (
//               <DropdownItem
//                 key={index}
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <input
//                   type="checkbox"
//                   checked={selectedOptions.includes(option?.value)}
//                   // readOnly
//                   onChange={(e) => {
//                     e.stopPropagation()
//                     e.preventDefault()
//                     handleOptionClick(option?.value)}}
//                 />
//                 {option?.label}
//               </DropdownItem>
//             ))}
//           </DropdownMenu>
//         </Dropdown>
//     </InputGroup>
//   );
// };


// export default MultiSelectDropdown;



import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';

const MultiSelectDropdown = ({options,handleSelect,selectedOptions}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [selectedItems, setSelectedItems] = useState([]);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  // const items = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];



  const isSelected = (item) => selectedOptions.includes(item);

  console.log("selectedOptions===",selectedOptions)

  const renderSelectedItems = () => {
    if (selectedOptions.length === 0) {
      return 'Select options';
    }
    return selectedOptions.join(', ');
  };

  return (
    <div>
      <Dropdown isOpen={dropdownOpen} toggle={toggle} >
        <DropdownToggle style={{display:'flex',alignItems:'center', justifyContent:'space-between', background:'#fff',color:'#000',border:"1px solid #dee2e6",width:'100%'}}>
         <div>{renderSelectedItems()}</div> 
        {/* <i class="bi bi-chevron-down"></i> */}
        <img style={{width:12,marginRight:5}} src="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27%3e%3cpath fill=%27none%27 stroke=%27%23343a40%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27m2 5 6 6 6-6%27/%3e%3c/svg%3e" />

        </DropdownToggle>
        <DropdownMenu>
          {options.map((item, index) => (
            <DropdownItem key={index} toggle={false} onClick={() => handleSelect(item.value)}>
              <input type="checkbox" checked={isSelected(item.value)} readOnly /> {item.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default MultiSelectDropdown;