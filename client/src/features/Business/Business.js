
import { selectBusinessById } from "./businessSlice";
import { useSelector} from "react-redux";

const Business = ({businessId}) =>{
    const business = useSelector(state => selectBusinessById(state, businessId))

    return(
        <div>
            <p>Business here!</p>
            <p>{business.name}</p>
            <p>{business.description}</p>
            <p>{business.priceRange}</p>
   
        </div>
    )
}

export default Business