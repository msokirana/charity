import React, { useState, useEffect, useMemo, useRef } from "react";
import { Row, Col, CardBody, CardTitle, Input, Card, ListGroup, ListGroupItem, Button } from "reactstrap";
import { get, postFile } from "../../services/Api";
import { API_FILE_UPLOAD, API_PURPOSE_DETAILS } from "../../services/ApiConstant";
import MultiSelectDropdown from "../../components/MultiSelectDropdown";

function Purpose({ formData, setFormData, handleChange }) {
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [purposeDetails, setPurposeDetails] = useState([]);

  const [queries_details, setQuesryuDetails] = useState([]);

  const [selectedOptions, setSelectedOptions] = useState([]);

 

  const [purpose, setPurpose] = useState([
    "Education",
    "Home Loan/Renovation",
    "Medical",
    "Major Purchase",
    "Existing Debt",
    "Small Business",
    "Retirement",
    "Vehicle Purchase"
  ]);

  useEffect(() => {
    if (selectedPurpose) {
      getCasePurpose();
    }
  }, [selectedPurpose]);

  const inputRefs = useRef([]);


  const getCasePurpose = async () => {
    try {
      const response = await get(
        API_PURPOSE_DETAILS + "?display_label=" + formData.purpose
      );
      setPurposeDetails([...response]);
    } catch (error) {
      console.error("Error fetching purpose details:", error);
    }
  };

  const handleChangePurpose = (e, label, index) => {
    const { value } = e.target;
    const updatedPurposeDetails = [...queries_details];
    updatedPurposeDetails[index] = {
      question: label,
      answer: value,
    };

    console.log("queries_details===", queries_details);

    setQuesryuDetails(updatedPurposeDetails);
    handleChange("purpose_queries", {
      purpose_name: selectedPurpose,
      question_details: updatedPurposeDetails,
    });
  };


 
  useEffect(() => {
    if (formData.purpose) {
      getCasePurpose();
      setSelectedPurpose(formData.purpose);
    }
    console.log("formData===", formData);
  }, [formData]);

  const handleSelect =  (item, label, index)=> {
    let prevSelected =  selectedOptions.includes(item)
    ? selectedOptions.filter((i) => i !== item)
    : [...selectedOptions, item];
    setSelectedOptions(prevSelected);
    console.log(prevSelected)

    const updatedPurposeDetails = [...queries_details];
    console.log("updatedPurposeDetails===",updatedPurposeDetails)
    updatedPurposeDetails[index] = {
      question: label,
      answer: prevSelected,
    };
    console.log("updatedPurposeDetails===",updatedPurposeDetails)

    setQuesryuDetails(updatedPurposeDetails);
    handleChange("purpose_queries", {
      purpose_name: selectedPurpose,
      question_details: updatedPurposeDetails,
    });

  };

    const handleFileChange = async (event,label,index) => {
      // const file = event.target.files[0];
      console.log("event.target.files===",event.target.files)
      let updatedPurposeDetails = [...queries_details];
      Object.keys(event.target.files)?.map(async(k)=>{

        const file = event.target.files?.[k]
        console.log('File selected:', file)

        if (file) {
          // Create a new FormData object
          const formData = new FormData();
          formData.append('file', file);
    
          try {
            // Call the post function
            const response = await postFile(API_FILE_UPLOAD, formData);
            console.log('File uploaded successfully:', response);
            // handleChangePurpose(response?.file, label, index)
          
            console.log("updatedPurposeDetails[index]==",updatedPurposeDetails[index])
            if(updatedPurposeDetails[index]?.question){
              updatedPurposeDetails[index].answer = updatedPurposeDetails[index]?.answer+","+response?.file
            }
            else{
              updatedPurposeDetails[index] = {
                question: label,
                answer: response?.file,
              };
            }
           
        
            console.log("queries_details===", queries_details);
        
            setQuesryuDetails(updatedPurposeDetails);
            handleChange("purpose_queries", {
              purpose_name: selectedPurpose,
              question_details: updatedPurposeDetails,
            });
          } catch (error) {
            console.error('Error uploading file:', error);
          }
        }

      })
     
    }

    // const handleFileChange = (event, index) => {
    //   const files = Array.from(event.target.files);
    //   const updatedQuestions = [...questions];
    //   updatedQuestions[index].answer = files;
  
    //   setQuestions(updatedQuestions);
    // };
  
    const handleRemoveFile = (questionIndex, fileName) => {
      // let updatedPurposeDetails = [...queries_details];

      const updatedQuestions = [...queries_details];
      const updatedFiles = updatedQuestions[questionIndex].answer?.split(',')?.filter(file => file !== fileName);
      updatedQuestions[questionIndex].answer = updatedFiles?.join(',');
  
      // setQuestions(updatedQuestions);

      setQuesryuDetails(updatedQuestions);
            handleChange("purpose_queries", {
              purpose_name: selectedPurpose,
              question_details: updatedQuestions,
            });

      // const updatedQuestions = [...questions];
      // const updatedFiles = updatedQuestions[questionIndex].answer.filter(file => file.name !== fileName);
      // updatedQuestions[questionIndex].answer = updatedFiles;
  
      // setQuestions(updatedQuestions);
    };

  return (
    <Card style={{ minHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
      <CardBody>
        <Row className="form-group-input">
          <Col md="4">
            <h5 className="card-title" style={{ fontSize: 14 }}>
              Select the purpose of grant:
            </h5>
          </Col>
          <Col md="6">
            <Input
              type="select"
              name="purpose"
              onChange={(e) => handleChange("purpose", e.target.value)}
              value={formData?.purpose || ""}
            >
              <option value="">Select</option>
              {purpose.map((purpose, index) => (
                <option key={index} value={purpose}>
                  {purpose}
                </option>
              ))}
            </Input>
          </Col>
        </Row>
        <Row className="form-group-input">
          <Col md="4">
            <h5 className="card-title" style={{ fontSize: 14 }}>
              Short Description
            </h5>
            {/* <h5 className="card-title" style={{fontSize:14,fontStyle:'italic',color:'grey',fontWeight:400}}>Example: Farmer need educational loan for his daughter admission in medical college</h5> */}
          </Col>

          <Col md="6">
            <Input
              type="textarea"
              name="short_description"
              placeholder="Example: Farmer need educational loan for his daughter admission in medical college"
              onChange={(e) =>
                handleChange("short_description", e.target.value)
              }
              value={formData?.short_description || ""}
            />
          </Col>
        </Row>


        {purposeDetails?.map((field, index) => (
          <Row key={index} className="form-group-input">
            <Col md="4">
              <h5 className="card-title" style={{ fontSize: 14 }}>
                {field.label}
              </h5>
            </Col>
            <Col md="6">
              {field.type === "s_lov" ? (
                <Input
                  key={index}
                  type="select"
                  value={queries_details?.[index]?.answer || ""}
                  onChange={(e) => handleChangePurpose(e, field.label, index)}
                  innerRef={(ref) => (inputRefs.current[index] = ref)}
                >
                  <option value="">Select</option>
                  {field.children.map((purpose, idx) => (
                    <option key={purpose?.value} value={purpose?.value}>
                      {purpose?.label}
                    </option>
                  ))}
                </Input>
              ) : (
                <>
                  {field.type === "m_lov" ? (
                    <MultiSelectDropdown
                      options={field.children}
                      selectedOptions={
                        formData.purpose_queries?.question_details?.[index]
                          ?.answer || ""
                      }
                      handleSelect={(e) => handleSelect(e, field.label, index)}
                   
                    />
                  ) : (
                    <>
                    {field.type === "file" ? (
                      <>
                    <Input
                      key={index}
                      type={field.type}
                      onChange={(e) =>
                        handleFileChange(e, field.label, index)

                      }
                      multiple
                       accept=".jpg,.jpeg,.png,.pdf"
                      innerRef={(ref) => (inputRefs.current[index] = ref)}
                    />

{formData.purpose_queries?.question_details?.[index]
                          ?.answer.length > 0 && (
            <>
              {/* <p>{q.answer.map(file => file.name).join(', ')}</p> */}
              <ListGroup style={{width:'100%'}}>
                {formData.purpose_queries?.question_details?.[index]
                          ?.answer?.split(',')?.map((file, fileIndex) => (
                  <ListGroupItem key={fileIndex} style={{display:'flex',justifyContent:'space-between', width:'100%',paddingLeft:10,paddingRight:10}}>
                    <div style={{width:"80%"}}>{file?.split('/')?.[file?.split('/')?.length-1]}</div>
                    <Button
                    style={{fontSize:10,}}
                      close
                      onClick={() => handleRemoveFile(index, file)}
                      aria-label="Remove"
                    />
                  </ListGroupItem>
                ))}
              </ListGroup>
            </>
          )}



                    </>

                    ):(
                      <Input
                      key={index}
                      type={field.type}
                      value={
                        formData.purpose_queries?.question_details?.[index]
                          ?.answer || ""
                      }
                      onChange={(e) =>
                        handleChangePurpose(e, field.label, index)
                      }
                      innerRef={(ref) => (inputRefs.current[index] = ref)}
                    />

                    )

    }

                    </>
                  )}
                </>
              )}
            </Col>
          </Row>
        ))}
      
      </CardBody>
    </Card>
  );
}

export default Purpose;
