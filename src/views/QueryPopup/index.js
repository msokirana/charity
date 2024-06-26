import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { post, put } from '../../services/Api';
import { API_CASE_QUERY } from '../../services/ApiConstant';

const QueryPopup = ({isOpen,toggleQuery,caseId}) => {
  const [query, setQuery] = useState('');


  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const response = await put(API_CASE_QUERY+caseId+"/", { question_text:query,state:'close' });
        console.log("response====",response)
        toggleQuery();
        // Perform actions after successful login, such as setting tokens in local storage, etc.
      } catch (error) {
  
      }
  };

  useEffect(()=>{
    if(isOpen){
      setQuery('')
    }
  },[isOpen])

  return (
    <div>
   
      <Modal isOpen={isOpen} toggle={toggleQuery}>
        <ModalHeader toggle={toggleQuery}>Ask Your Query : Case {caseId}</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="userQuery">Your Query</Label>
              <Input
                type="textarea"
                name="query"
                id="userQuery"
                style={{width:'95%'}}
                placeholder="Type your query here..."
                value={query}
                onChange={handleInputChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleQuery}>Cancel</Button>
          <Button color="primary" disabled={!query?.trim()} onClick={handleSubmit}>Submit</Button>

        </ModalFooter>
      </Modal>
    </div>
  );
};

export default QueryPopup;
