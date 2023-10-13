
import { selectBusinessById } from "./businessSlice";
import { useSelector} from "react-redux";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

//import { useNavigate } from "react-router-dom";


const BusinessCard = ({businessId}) =>{
    const business = useSelector(state => selectBusinessById(state, businessId));

   

    if(business) {

    

    return (
        <Card style={{ width: '18rem', borderRadius:'25px'}}>
          {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
          <Card.Body>
            <Card.Title>{business.name}</Card.Title>
            <Card.Text> {business.priceRange}</Card.Text>
            <Card.Text>
                {/* will change to a tag line */}
             {business.description.substring(0,100)} 
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Email</ListGroup.Item>
            <ListGroup.Item>Phone Number </ListGroup.Item>
          </ListGroup>
          <Card.Body>
          <ListGroup.Item>Categories: Grocery </ListGroup.Item>
            <Card.Link href="#">Link to Business Info page </Card.Link>
          </Card.Body>
        </Card>
      );}else return null
}

export default BusinessCard