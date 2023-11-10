import './admin.css'
import { selectBusinessById } from "../Business/businessSlice";
import { useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import BusinessCard from '../Business/BusinessCard';

const AdminBusinessCard = ({businessId}) =>{
  const navigate = useNavigate();
    const business = useSelector(state => selectBusinessById(state, businessId));

    const onClickEditBusiness = () =>{
      navigate(`/admin/business/${businessId}`)
  }

    if(business) {

    return (
        <div className="admin-business-card">
          <BusinessCard businessId={business.id}/>

          <button onClick={onClickEditBusiness} >Edit</button>
        </div>
        
      );}else return null
}

export default AdminBusinessCard