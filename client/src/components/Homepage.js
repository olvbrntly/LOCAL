import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from"@fortawesome/free-solid-svg-icons";


const Homepage = () =>{
    return(
        <div className=" hero content">
            <div className="hero-content">

                
                <h1 className="hero-title">Shop LOCAL</h1>
                <p className="hero-text">Invest in your community. Find small, family owned, and local businesses near you.</p>
                <form>
                <input id="zip" name="zip" type="text" pattern="[0-9]*" placeholder="Zip Code"/>
                <button className='homepage-button'><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                </form>

            </div>
        </div>
    )
}

export default Homepage;