import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <h1 className="covid19-footer-text">
      COVID19<span className="span-text">INDIA</span>
    </h1>
    <p className="quote-text">
      we stand with everyone fighting on the front lines
    </p>
    <div className="socialmedia-container">
      <VscGithubAlt className="socialmedia-icons" />

      <FiInstagram className="socialmedia-icons" />
      <FaTwitter className="socialmedia-icons" />
    </div>
  </div>
)

export default Footer
