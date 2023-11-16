import './admin.css'
import { selectBusinessById } from "../Business/businessSlice";
import { useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
// import BusinessCard from '../Business/BusinessCard';
import Card from 'react-bootstrap/Card';

const AdminBusinessCard = ({businessId}) =>{
  const navigate = useNavigate();
  const business = useSelector(state => selectBusinessById(state, businessId));

  const onClickEditBusiness = () =>{
    const id = businessId
    navigate(`/admin/business/edit/${id}`)
  }

  const onClickLearnMore = () =>{
    const id = businessId
    navigate(`/admin/business/${id}`)
  }

    if(business) {

    return (
        <div className="admin-business-card">
           <Card className="business-card">
          
          <Card.Img variant="top" src="holder.js/100px180?text=Image cap" className="business-card-logo"/>
          
          <Card.Title className="business-card-title">{business.name}</Card.Title>
        
          <Card.Text className="business-card-tagline">{business.tagline} </Card.Text>
        {/* Will become address  */}
          <Card.Text className="business-card-address"> {business.phoneNumber} </Card.Text>
          
          <Card.Text className="business-card-learn-more" onClick={onClickLearnMore}>Learn More </Card.Text>
          
          </Card>

          <button onClick={onClickEditBusiness} >Edit</button>
        </div>
        
      );}else return null
}

export default AdminBusinessCard