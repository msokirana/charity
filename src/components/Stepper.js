import React, { useEffect, useState } from 'react';
import '../components/dashboard/ToggleSwitch.css';
const Stepper = ({ steps,isRejected,state }) => {
  const [currentStep, setCurrentStep] = useState(3);

  const handleNext = () => {
    setCurrentStep(prevStep => prevStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };

  function toCamelCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  useEffect(()=>{
    if(state === 'new'||state === 'draft'){
      setCurrentStep(0)
    }else if(state === 'verification'){
      setCurrentStep(1)
    }else if(state === 'evaluation'||state === 'approval'){
      setCurrentStep(2)
    }else if(state === 'disbursement'){
      setCurrentStep(3)
    }else if(state === 'repayment'){
      setCurrentStep(4)
    }else if(state === 'rejected'){
      setCurrentStep(5)

    }
  },[state])

  // const steps = ["New", "Verification", "Evaluation", "Approval", "Approved"];

  return (
    <div className="stepper" style={{justifyContent:'center',display:'flex',flexDirection:'column'}}>
        
    {isRejected ? (  <div className="step-progress">
        {steps.map((step, index) => (
          <div  key={index} className={`step ${index === 4 ? 'active' : ''}`}>
            {/* {index <= currentStep && <span className="step-label" >{step}</span>} */}
            <div  style={{background:index === 4?'red':"#ccc"}}  className={`${index === 4 ? "step-dot" : "step-line"}`} />
          </div>
        ))}
      </div>
      ):(
        <div className="step-progress">
        {steps.map((step, index) => (
          <div  key={index} className={`step ${index <= currentStep ? 'active' : ''}`}>
            {/* {index <= currentStep && <span className="step-label" >{step}</span>} */}
            <div   className={`${index === currentStep ? "step-dot" : "step-line"}`} />
          </div>
        ))}
      </div>
      )}


{!isRejected ? (   <span className="step-label" style={{textAlign:'center',fontSize:16,color:'#007bff'}}>{toCamelCase(state)}</span>):(
 <span className="step-label" style={{textAlign:'center',fontSize:16,color:'red'}}>{'Closed. Rejected'}</span>
)}

    </div>
  );
};

export default Stepper;
