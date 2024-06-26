import React,{useState} from 'react';

import './FormComponent.css';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const FormComponent = () => {

    const [formData, setFormData] = useState({
        "priority": "",
        "startDate": "2024-03-09T13:53",
        "endDate": "2024-03-28T14:55",
        "recurrence": [
          "M",
          "o",
          "n",
          "Wed",
          "Thu"
        ],
        "activeTimeFrom": "10:54",
        "activeTimeTo": "12:54",
        "timezone": ""
      });

      const [selectedDateRange, setSelectedDateRange] = useState([new Date(formData.startDate), new Date(formData.endDate)]);

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log({ name, value });
      
        if (name === 'recurrence') {
          const selectedDays = formData.recurrence.includes(value)
            ? formData.recurrence.filter((day) => day !== value)
            : [...formData.recurrence, value];
      
          setFormData({ ...formData, recurrence: selectedDays });
        } else {
          setFormData({ ...formData, [name]: value });
      
          if (name === 'startDate' || name === 'endDate') {
            setSelectedDateRange([new Date(formData.startDate), new Date(formData.endDate)]);
          }
        }
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(JSON.stringify(formData, null, 2));
      };
    
      const handleDateChange = (date) => {
        setSelectedDateRange(date);
      };

      const getTileClassName = ({ date, view }) => {
        if (view === 'month' && date >= selectedDateRange[0] && date <= selectedDateRange[1]) {
          return 'selected-date';
        }
        return 'unselected-date';
      };


    return (
      <div style={{display:'flex'}}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="priority">Priority:</label>
          <select id="priority" name="priority" value={formData.priority} onChange={handleInputChange}>
          <option value="1">1-Highest</option>
          <option value="2">2-Medium</option>
          <option value="3">3-Lowest</option>
        </select>

        <label htmlFor="startDate">Start Date and Time:</label>
        <input type="datetime-local" id="startDate" name="startDate" value={formData.startDate} onChange={handleInputChange} />

        <label htmlFor="endDate">End Date and Time:</label>
        <input type="datetime-local" id="endDate" name="endDate" value={formData.endDate} onChange={handleInputChange} />

  
        <label htmlFor="recurrence">Recurrence (Days of the week):</label>
<div>
  {days.map((day) => (
    <div
      key={day}
      className={`day ${formData.recurrence.includes(day) ? 'selected' : ''}`}
      onClick={() => handleInputChange({ target: { name: 'recurrence', value: day } })}
    >
      {day}
    </div>
  ))}
</div>
  
        <label htmlFor="activeTimeFrom">Active Time From:</label>
        <input type="time" id="activeTimeFrom" name="activeTimeFrom" value={formData.activeTimeFrom} onChange={handleInputChange} />

        <label htmlFor="activeTimeTo">Active Time To:</label>
        <input type="time" id="activeTimeTo" name="activeTimeTo" value={formData.activeTimeTo} onChange={handleInputChange} />

        <label htmlFor="timezone">Timezone:</label>
        <select id="timezone" name="timezone" value={formData.timezone} onChange={handleInputChange}>
          <option value="GMT">GMT</option>
          <option value="EST">EST</option>
          <option value="PST">PST</option>
          {/* Add more options as needed */}
        </select>

          <button type="submit">Submit</button>
        </form>

        {/* <div>
  <label htmlFor="dateRange">Dialouge Schedule</label>
  <Calendar
    // onChange={handleDateChange}
    selectRange={true}
    value={selectedDateRange}
    // tileClassName={getTileClassName}
  />
</div> */}
      </div>
    );
  };

  export default FormComponent;