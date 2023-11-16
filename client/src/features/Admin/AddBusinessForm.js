import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
// import { useSelector } from "react-redux"
import { useAddBusinessMutation } from "../Business/businessSlice"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import '../Business/business.css'

const AddBusinessForm = () =>{

  const [addBusiness,
        {isLoading,
         isSuccess,
         isError,
         error
            
  }]  = useAddBusinessMutation()

  const navigate = useNavigate();

  const [name, setName]= useState('');
  const [description, setDescription] = useState('')
  const [tagline, setTagline] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (isSuccess) {
        setName('')
        setDescription('')
        setTagline('')
        setEmail('')
        setPhoneNumber('')
        setUrl('')
        navigate('/admin/businesses')
    }
  }, [isSuccess, navigate])

  const canSave = [name, description, tagline].every(Boolean) && !isLoading;

  const onNameChanged = e => setName(e.target.value);
  const onDescriptionChanged = e => setDescription(e.target.value);
  const onTaglineChanged = e => setTagline(e.target.value);
  const onEmailChanged = e => setEmail(e.target.value)
  const onPhoneNumberChanged = e => setPhoneNumber(e.target.value)
  const onUrlChanged = e => setUrl(e.target.value)

  const onSaveBusinessClicked = async (e) =>{
    e.preventDefault()
    if(canSave){
      await addBusiness({ name, description, tagline,email, phoneNumber, url })
    }
}

  const errClass = isError ? "errmsg" : "offscreen"

    return(
      
      <div className="business-form">
      <h1>Add a New Business</h1>
      <p className={errClass}>{error?.data?.message}</p>

          <Form onSubmit={onSaveBusinessClicked}>
          <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Business Name" onChange={onNameChanged} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridWebsiteURL">
            <Form.Label>Website Url</Form.Label>
            <Form.Control type="url" placeholder="Website Url" onChange={onUrlChanged} />
          </Form.Group>

        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridTagline">
            <Form.Label>Tag Line</Form.Label>
            <Form.Control type="text" placeholder="Description of business in 100 characters or less" maxLength="100"  onChange={onTaglineChanged}/>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={onEmailChanged}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="tel" placeholder="(555)-555-5555" onChange={onPhoneNumberChanged} />
          </Form.Group>
        </Row>


        <Form.Group as={Col} controlId="formGridDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control  as="textarea" rows={3} type="text" placeholder="Full Description of Business" onChange={onDescriptionChanged}/>
          </Form.Group>

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

        <Button variant="primary" type="submit" className='business-submit-button'>
          Save Business
        </Button>
      </Form>
    </div>
    )
}

export default AddBusinessForm