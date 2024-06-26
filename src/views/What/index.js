import React, { useRef, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const What = ({ setActiveTab }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [showRadioButtons, setShowRadioButtons] = useState(true);

  const fileInputRef = useRef(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const video = document.createElement("video");
      video.src = URL.createObjectURL(file);
      video.onloadedmetadata = () => {
        if (video.videoWidth <= 2048 && video.videoHeight <= 3060) {
          setSelectedFile(file);
          setVideoUrl(video.src);
          setShowRadioButtons(false); // Hide radio buttons after file upload
        } else {
          alert("Please select a video with resolution 2048x3060.");
          event.target.value = ""; // Clear the file input
        }
      };
    }
  };

  const handleEditFile = () => {
    // Implement edit functionality
  };

  const handleDeleteFile = () => {
    setSelectedFile(null);
    setVideoUrl("");
    setShowRadioButtons(true); // Show radio buttons after deleting the file
  };

  return (
    <>
      <Card style={{ marginTop: 20 }}>
        <CardBody>
          <label style={{ marginRight: 20 }}>
            {" "}
            Video to be used (Min resolution 2048 X 3060 pixel*)
          </label>
          <br /><br />
          {showRadioButtons && ( // Conditionally render radio buttons
            <div>
              <FormGroup check>
                <Label check style={{display:'flex',alignItems:'center'}}>
                  <Input
                    type="radio"
                    name="radioOption"
                    value="upload"
                    checked={selectedOption === "upload"}
                    onChange={handleOptionChange}
                  />
                  <span style={{ marginLeft: 15,marginTop:-5 }}>Upload New Video File</span>
                </Label>
              </FormGroup>
              {selectedOption === "upload" && (
              <>
                <Input
                  type="file"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />

              </>
            )}
              <FormGroup check>
                <Label check style={{display:'flex',alignItems:'center'}}>
                  <Input
                    type="radio"
                    name="radioOption"
                    value="gallery"
                    checked={selectedOption === "gallery"}
                    onChange={handleOptionChange}
                  />{" "}
                  <span style={{ marginLeft: 15,marginTop:-5 }}>
                    Select a File from Library
                  </span>
                </Label>
              </FormGroup>
            </div>
          )}
          {!showRadioButtons && selectedFile && ( // Conditionally render selected file details
            <div style={{ color: 'blue',marginBottom:10,fontSize:20 }}>
              {selectedFile.name} &nbsp; &nbsp;
              {/* <i class="bi bi-pencil"></i>
              &nbsp; &nbsp; */}
              {/* <FontAwesomeIcon icon={faEdit} onClick={handleEditFile} style={{ marginLeft: 10, cursor: 'pointer' }} /> */}
              <i class="bi bi-trash" onClick={handleDeleteFile}></i>
            </div>
          )}
          {selectedFile && ( // Conditionally render video
            <div style={{borderRadius:10,overflow:'hidden'}}>
              <video controls style={{borderRadius:20}}>
                <source src={videoUrl} type={selectedFile.type} />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </CardBody>
        <br/><br/><br/>
        <CardFooter style={{width:'100%',justifyContent:'center',display:'flex'}}>
          <Button color="secondary" style={{width:120}} onClick={()=>setActiveTab('Where')}>  <i class="bi bi-caret-left-fill"></i> Go Back</Button>{" "}
          <div style={{display:'flex'}}>
          <Button style={{width:120,marginLeft:150}}   color="secondary">Save</Button>{" "}
      
          <Button color="secondary" style={{width:120,marginLeft:25,marginRight:150}}>  Exit</Button>{" "}
          </div>
          <Button color="primary" onClick={()=>setActiveTab('When')} style={{width:120}}>Next   <i class="bi bi-caret-right-fill"></i></Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default What;
