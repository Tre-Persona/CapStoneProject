import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = props => {
  return(
    <div id="footer">

      <div className="footer-left">
        <NavLink className="footer-link" to ="/about">About Us</NavLink>
        <NavLink className="footer-link" to ="/contact">Contact Us</NavLink>
        <p className="footer-message">Developed by Tre Persona, ©2020</p>
      </div>

      <div className="footer-right">
        
      </div>
  
    </div>
  )
}

export default Footer