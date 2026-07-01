import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias
            eaque, ullam atque aliquid praesentium obcaecati libero beatae
            fugiat! Delectus nemo ducimus in unde omnis fuga debitis pariatur
            eveniet quo nihil?
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-centre">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Deliveryy</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-212-345-6578</li>
            <li>contact@tamato.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2026 © Tomato.com - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
