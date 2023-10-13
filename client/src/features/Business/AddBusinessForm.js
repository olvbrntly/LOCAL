import React from "react"
import { useState } from "react"
// import { useSelector } from "react-redux"
import { useAddBusinessMutation } from "./businessSlice"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const AddBusinessForm = () =>{

    const [name, setName]= useState('');
    const [description, setDescription] = useState('')

    const [addBusiness,{isLoading}]  = useAddBusinessMutation()

    const onNameChanged = e => setName(e.target.value);
    const onDescriptionChanged = e => setDescription(e.target.value);

    const canSave = [name,description].every(Boolean) && !isLoading;

    const onSaveBusinessClicked = async () =>{
        if(canSave){
            try{
                await addBusiness({name, description}).unwrap();
                setName('');
                setDescription('')
            }catch(err){
                console.error('Failed to save business', err)
            }
        }
    }


    return(
        <Form>
        <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Business Name" onChange={onNameChanged} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Tag Line</Form.Label>
          <Form.Control type="text" placeholder="Description of business in 100 characters or less" />
        </Form.Group>
      </Row>


        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Description</Form.Label>
          <Form.Control type="textarea" placeholder="Full Description of Business" onChange={onDescriptionChanged}/>
        </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="tel" placeholder="(555)-555-5555" />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control placeholder="1234 Main St" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor" />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>...</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control />
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit" onClick={onSaveBusinessClicked}>
        Save Business
      </Button>
    </Form>
    )
}

export default AddBusinessForm