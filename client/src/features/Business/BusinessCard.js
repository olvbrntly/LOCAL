import { selectBusinessById } from "./businessSlice"
import { useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import "./business.css"


const BusinessCard = ({businessId}) =>{
  
    const navigate = useNavigate();

    const business = useSelector(state => selectBusinessById(state, businessId));

    const onClickLearnMore = () =>{
      navigate(`/business/${businessId}`)
    }

    if(business) {

    return (
        <Card className="business-card">
          
          <Card.Img variant="top" src="holder.js/100px180?text=Image cap" className="business-card-logo"/>
          
          <Card.Title className="business-card-title">{business.name}</Card.Title>
        
          <Card.Text className="business-card-tagline">{business.tagline} </Card.Text>
        {/* Will become address  */}
          <Card.Text className="business-card-address"> {business.phoneNumber} </Card.Text>
          
          <Card.Text className="business-card-learn-more" onClick={onClickLearnMore}>Learn More </Card.Text>
          
        </Card>
      );}else return null
}

export default BusinessCard