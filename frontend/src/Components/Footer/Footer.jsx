import React, { useContext } from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faInstagram,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faHouse,
  faShoppingCart,
  faArrowRight,
  faPhone,
  faEnvelope,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import logo from "../../Assets/trading.png";


function Footer() {
  const { navigate } = useContext(AppContext);
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-social">
          <div className="website-title flex-center">
            <img src={logo} alt="logo" className="website-logo" />
            <h2 onClick={() => navigate("/")}>
              <span>Trade</span>Connect
            </h2>
          </div>
          <div className="footer-icons">
            <a href="/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faXTwitter} />
            </a>
          </div>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <div className="foot-link">
            <FontAwesomeIcon icon={faHouse} />
            <Link to="/">Home</Link>
          </div>
          <div className="foot-link">
            <FontAwesomeIcon icon={faShoppingCart} />
            <Link to="/account/cart">Cart</Link>
          </div>
          <div className="foot-link">
            <FontAwesomeIcon icon={faUser} />
            <Link to="/account">My Account</Link>
          </div>
        </div>
        <div className="footer-section">
          <h3>Know us</h3>
          <div className="foot-link">
            <FontAwesomeIcon icon={faArrowRight} />
            <Link to="/aboutus">About us</Link>
          </div>
          <div className="foot-link">
            <FontAwesomeIcon icon={faArrowRight} />
            <Link to="/tac">Terms & Conditions</Link>
          </div>
          <div className="foot-link">
            <FontAwesomeIcon icon={faArrowRight} />
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
        <div className="footer-section">
          <h3>Contact us</h3>
          <div className="foot-link">
            <FontAwesomeIcon icon={faPhone} />
            <p>9898233245</p>
          </div>
          <div className="foot-link">
            <FontAwesomeIcon icon={faPhone} />
            <p>9787654653</p>
          </div>
          <div className="foot-link">
            <FontAwesomeIcon icon={faEnvelope} />
            <a href="mailto:support@tradeconnect.com">
              support@tradeconnect.com
            </a>
          </div>
        </div>
      </div>
      <hr />
      <div className="footer-bottom">
        <p>
          Copyright &copy; {new Date().getFullYear()} TradeConnect || Website
          Developed for Final Year project-MERN stack
        </p>
      </div>
    </footer>
  );
}

export default Footer;
