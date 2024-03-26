import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from"@fortawesome/free-solid-svg-icons";
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () =>{

    const navigate = useNavigate();
    const [zipCode, setZipCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/business/zipcode/${zipCode}`);
    };


    const onZipCodeChanged = e => setZipCode(e.target.value)

    return(
        <div className=" hero content">
            <div className="hero-content">

                
                <h1 className="hero-title">Shop LOCAL</h1>
                <p className="hero-text">Invest in your community. Find small, family owned, and local businesses near you.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        id="zip"
                        name="zip"
                        type="text"
                        pattern="[0-9]*"
                        placeholder="Zip Code"
                        value={zipCode}
                        onChange={onZipCodeChanged}
                    />
                    <button className='homepage-button' type="submit">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </form>

            </div>
        </div>
    )
}

export default Homepage;