import React, { useState } from 'react';
import { Input } from 'reactstrap';

function HoursDropdown({setHour,hour}) {
//   const [selectedHour, setSelectedHour] = useState(""); // State to manage the selected hour

  const handleHourChange = (event) => {
    setHour(event.target.value);
  };

  return (
    <div>
      <Input type="select" value={hour} onChange={handleHourChange}>
        <option value="">Select Hour</option>
        {[...Array(24)].map((_, index) => (
          <option key={index} value={String(index).padStart(2, '0') + ':00'}>{String(index).padStart(2, '0')}:00</option>
        ))}
      </Input>
    </div>
  );
}

export default HoursDropdown;
