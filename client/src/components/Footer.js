import React from 'react';
import '../index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faPinterest, faTiktok, faTwitter} from '@fortawesome/free-brands-svg-icons';
const Footer = () => {
    return(
        <div>
            <div className='footer-links'>
                <a href='http://localhost:3000/'>About</a>
                <a href='http://localhost:3000/'>Contact</a>
                <a href='http://localhost:3000/'>Terms and Conditions</a>
            </div>
            <div className='social-media-links'>
                <FontAwesomeIcon icon={faInstagram} />
                <FontAwesomeIcon icon={faFacebook} />
                <FontAwesomeIcon icon={faTwitter} />
                <FontAwesomeIcon icon={faTiktok} />
                <FontAwesomeIcon icon={faPinterest} />

            </div>
        </div>
    )
}

export default Footer