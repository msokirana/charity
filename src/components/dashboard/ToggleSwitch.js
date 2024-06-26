import React, { useState } from "react";
import { Input } from "reactstrap";
import "./ToggleSwitch.css"; // Import CSS file for custom styling

const ToggleSwitch = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Input
      type="switch"
      id="exampleCustomSwitch"
      label={isChecked ? "ON" : "OFF"}
      checked={isChecked}
      onChange={toggleSwitch}
    />
  );
};

export default ToggleSwitch;
