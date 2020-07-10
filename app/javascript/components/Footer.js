import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = props => {
  return(
    <div id="footer">

      <div className="footer-left">
        <div style={{display:"flex"}}>
          <NavLink className="footer-link" to ="/about">About Us</NavLink>
        </div>
        <div style={{display:"flex"}}>
          <NavLink className="footer-link" to ="/contact">Contact Us</NavLink>
        </div>
        <p className="footer-message">Developed by Tre Persona, ©2020</p>
      </div>

      <div className="footer-right">
        
      </div>
  
    </div>
  )
}

export default Footer