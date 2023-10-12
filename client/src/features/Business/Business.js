
import { selectBusinessById } from "./businessSlice";
import { useSelector} from "react-redux";
//import { useNavigate } from "react-router-dom";


const Business = ({businessId}) =>{
    const business = useSelector(state => selectBusinessById(state, businessId));

   

    if(business) {

    

    return(
        <div>
            <p>Business here!</p>
            <p>{business.name}</p>
            <p>{business.description}</p>
            <p>{business.priceRange}</p>
   
        </div>
    )}else return null
}

export default Business