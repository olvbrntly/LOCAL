import React from 'react'
import '../index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const logo = require('./images/logo.png')

const Header = () =>{
    return(
        <div className='header'>
            <div className='logo'>
               <a href='http://localhost:3000/'> <img src={logo} alt='LOCAL logo' className='logo'></img> </a>
            </div>

            <div className='header-right'>
                <a href='http://localhost:3000/'>Locations</a>
                <a href='http://localhost:3000/'>Categories</a>
                <a href='http://localhost:3000/'>Login / Sign Up</a>
                <button className='user-button'>
                    <FontAwesomeIcon icon={faUser}/>
                </button>
            </div>
        </div>
    )
}

export default Header