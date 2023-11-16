import { useState, useEffect } from "react"
import { useNavigate} from "react-router-dom"
import { useSelector } from "react-redux"
import { useUpdateBusinessMutation, useDeleteBusinessMutation } from "../Business/businessSlice";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const EditBusinessForm = ({business}) =>{

  const [ updateBusiness, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateBusinessMutation();

  const [deleteBusiness, {
    isSuccess: isDelSuccess,
    isError: isDelError,
    error:delerror,
  }] = useDeleteBusinessMutation();

  const navigate = useNavigate();

  const [name, setName] = useState(business.name)
  const [tagline, setTagline] = useState(business.tagline)
  const [description, setDescription] = useState(business.description)

  useEffect(() =>{
    if(isSuccess || isDelSuccess){
      setName('')
      setTagline('')
      setDescription('')
      navigate('/admin/businesses')
    }
  },[isSuccess, isDelSuccess, navigate])

  const onNameChanged = e => setName(e.target.value);
  const onTaglineChanged = e => setTagline(e.target.value);
  const onDescriptionChanged = e => setDescription(e.target.value);


  const canSave = [name, description, tagline].every(Boolean) && !isLoading;


  const onSaveBusinessClicked = async (e) =>{
    await updateBusiness({ id:business.id, name, description, tagline })
  }

  const onDeleteBusinessClicked = async () =>{
    await onDeleteBusinessClicked({id:business.id})
  }

  // const errClass = (isError || isDelError) ? "errmsg" : "offscreen"

  const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    return(
      
      <div className="business-form">
      <h1>Edit a New Business</h1>
      <p className={'errClass'}>{errContent}</p>

          <Form onSubmit={e => e.preventDefault()}>
          <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={onNameChanged} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridWebsiteURL">
            <Form.Label>Website Url</Form.Label>
            <Form.Control type="url" placeholder="Website Url" />
          </Form.Group>

        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridTagline">
            <Form.Label>Tag Line</Form.Label>
            <Form.Control type="text" placeholder="Description of business in 100 characters or less" value={tagline}maxLength="100"  onChange={onTaglineChanged}/>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="tel" placeholder="(555)-555-5555" />
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

        <Button variant="primary" type="submit"  className='business-submit-button' onClick={onSaveBusinessClicked}>
          Save Business
        </Button>
        <Button variant="primary" type="submit"  className='business-submit-button' onClick={onDeleteBusinessClicked}>
          Delete
        </Button>
      </Form>
    </div>
    )
}

export default EditBusinessForm