import Cookie from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {IoExitOutline} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const Header = props => {
  const logoutTriggered = () => {
    const {history} = props
    Cookie.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <ul className="nav-bar-mobile-container">
        <Link to="/" className="nav-link">
          <li className="logo-list">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="home-page-website-logo"
            />
          </li>
        </Link>
        <div className="home-jobs-headers">
          <Link className="nav-link" to="/">
            <li className="common-headers">
              <AiFillHome />
            </li>
          </Link>
          <Link className="nav-link" to="/jobs">
            <li className="common-headers">
              <BsFillBriefcaseFill />
            </li>
          </Link>

          <li className="common-headers" onClick={logoutTriggered}>
            <IoExitOutline />
          </li>
        </div>
      </ul>

      <ul className="nav-bar-large-container">
        <Link to="/" className="nav-link">
          <li className="logo-list">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="home-page-large-website-logo"
            />
          </li>
        </Link>
        <div className="home-jobs-headers">
          <Link className="nav-link" to="/">
            <li className="common-headers">
              <p>Home</p>
            </li>
          </Link>
          <Link className="nav-link" to="/jobs">
            <li className="common-headers">
              <p>Jobs</p>
            </li>
          </Link>
        </div>

        <li className="logout-header-list" onClick={logoutTriggered}>
          <button
            type="button"
            onClick={logoutTriggered}
            className="logout-header-button"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}
export default withRouter(Header)
