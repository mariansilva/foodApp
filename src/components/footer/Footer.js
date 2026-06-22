import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
    <div className='footer-content'></div>
      <div className='footer-content-left'>
        <img src={assets.logo} alt=''></img>
        <p>Lorem Ipsum is simply dummy text of the printing and typinsgetting industry</p>
      <div className='footer-social-icons'>
      <img src={assets.facebook_icon} alt=''></img>
      <img src={assets.twitter_icon} alt=''></img>
      <img src={assets.linkedin_icon} alt=''></img>
      </div>
      </div>
    <div className='footer-content-center'></div>
     <div className='footer-content-right'></div>
    </div>
   
  )
}

export default Footer
