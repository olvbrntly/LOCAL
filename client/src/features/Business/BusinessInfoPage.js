import { useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import { selectBusinessById } from "./businessSlice";
import MapComponent from "./Map";

const BusinessInfoPage = () =>{
    const { id } = useParams();
    const business = useSelector(state => selectBusinessById(state, id))

    const address = `${business.address.street}, ${business.address.city}, ${business.address.state} ${business.address.zipCode}`
    console.log(address)
    return(
        <div className="business-learn-more-page">

        <div className="learn-more-name">
           <div className="learn-more-logo"></div>
           <h1>{business.name}</h1>
        </div>
           <div className="learn-more-buttons">
                <button>add</button>
                <button>heart</button>
           </div>

           <p className="learn-more-description">{business.description}</p>

           <div className="learn-more-contact">
                <h4>Contact</h4>
                <p>{business.phoneNumber}</p>
                <p>{business.email}</p>
                <p>{business.url}</p>
           </div>

           <div className="learn-more-address">
                <h4>Address</h4>
                <p>{business.address.street}</p>
                <p>{business.address.city}, {business.address.state}, {business.address.zipCode}</p>
           </div>

           <div className="learn-more-map">
                <MapComponent lat={business.latitude} lng={business.longitude}/>
           </div>
        </div>
    )
}

export default BusinessInfoPage