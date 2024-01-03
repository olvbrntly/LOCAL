import { useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import { selectBusinessById } from "./businessSlice";
import Map from "./Map";

const BusinessInfoPage = () =>{
    const { id } = useParams();
    const business = useSelector(state => selectBusinessById(state, id))

    const address = `${business.address.street}, ${business.address.city}, ${business.address.state} ${business.address.zipCode}`
    console.log(address)
    return(
        <div className="business-learn-more-page">

        <div className="learn-more-name">
           <div className="learn-more-logo">LOGO</div>
           <h1>{business.name}</h1>
        </div>
           <div className="learn-more-buttons">
                <button>add</button>
                <button>heart</button>
           </div>

           <p className="learn-more-description">{business.description}</p>

           <div className="learn-more-contact">
                <h4>Contact</h4>
                <p>phone Number: {business.phoneNumber}</p>
                <p>email: {business.email}</p>
                <p>Url: {business.url}</p>
           </div>

           <div className="learn-more-address">
                <h4>Address</h4>
                <p>address top</p>
                <p>address bottom</p>
           </div>

           <div className="learn-more-map">
                <Map />
           </div>
        </div>
    )
}

export default BusinessInfoPage