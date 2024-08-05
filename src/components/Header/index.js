import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

class Header extends Component {
  state = {viewMobileNavLinks: false}

  onClickHomeRoute = () => {
    const {history} = this.props
    console.log(history)
    history.replace('/')
    this.setState({viewMobileNavLinks: false})
  }

  onClickAboutRoute = () => {
    const {history} = this.props
    history.replace('/about')
    this.setState({viewMobileNavLinks: false})
  }

  onClickVaccinationRoute = () => {
    const {history} = this.props
    history.replace('/vaccination')
    this.setState({viewMobileNavLinks: false})
  }

  viewNavLinks = () => {
    const {viewMobileNavLinks} = this.state
    return (
      <div className="mobile-nav-items-alignment">
        <ul className="mobile-nav-items">
          <Link className="nav-links" onClick={this.onClickHomeRoute} to="/">
            <li>Home</li>
          </Link>
          <Link
            className="nav-links"
            onClick={this.onClickVaccinationRoute}
            to="/vaccination"
          >
            <li>Vaccination</li>
          </Link>
          <Link
            className="nav-links"
            onClick={this.onClickAboutRoute}
            to="/about"
          >
            <li>About</li>
          </Link>
        </ul>
        <img
          src="https://res.cloudinary.com/dpj5lzzyz/image/upload/v1718706884/Solid_dkudgs.svg"
          alt="close"
          className="icons"
          onClick={this.onClickCloseIcon}
        />
      </div>
    )
  }

  onClickMobileNavBarIcon = () => {
    this.setState(prevState => ({
      viewMobileNavLinks: !prevState.viewMobileNavLinks,
    }))
  }

  onClickCloseIcon = () => {
    this.setState(prevState => ({
      viewMobileNavLinks: !prevState.viewMobileNavLinks,
    }))
  }

  onClickHeading = () => {
    const {history} = this.props
    history.replace('/')
  }

  render() {
    const {viewMobileNavLinks} = this.state

    return (
      <>
        <nav className="header-bg-container ">
          <Link to="/" onClick={this.onClickHeading} className="logo-link">
            <h1 className="covid19-text">
              COVID19<span className="india-text">INDIA</span>
            </h1>
          </Link>
          <div className="nav-links-mobile-container">
            <img
              src="https://res.cloudinary.com/dpj5lzzyz/image/upload/v1718688869/add-to-queue_1_lgfd2s.svg"
              alt="navbar"
              className="icons"
              onClick={this.onClickMobileNavBarIcon}
            />
          </div>

          <ul className="nav-links-desktop-container">
            <Link className="nav-links" onClick={this.onClickHomeRoute} to="/">
              <li>Home</li>
            </Link>
            <Link
              className="nav-links"
              onClick={this.onClickVaccinationRoute}
              to="/vaccination"
            >
              <li>Vaccination</li>
            </Link>
            <Link
              className="nav-links"
              onClick={this.onClickAboutRoute}
              to="/about"
            >
              <li>About</li>
            </Link>
          </ul>
        </nav>
        <div className="nav-links-mobile-container">
          {viewMobileNavLinks && this.viewNavLinks()}
        </div>
      </>
    )
  }
}

export default withRouter(Header)
