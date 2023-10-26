import Cookie from 'js-cookie'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMessage: '', isLoginFailed: false}

  usernameEvent = event => {
    this.setState({username: event.target.value})
  }

  passwordEvent = event => {
    this.setState({password: event.target.value})
  }

  submitSuccess = token => {
    const {history} = this.props
    Cookie.set('jwt_token', token, {expires: 30})

    history.replace('/')
  }

  submitFailed = message => {
    this.setState({errorMessage: message, isLoginFailed: true})
  }

  submitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}

    const apiurl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiurl, options)
    const data = await response.json()

    if (response.ok) {
      this.submitSuccess(data.jwt_token)
    } else if (response.status === 400) {
      this.submitFailed(data.error_msg)
    }
  }

  renderUsername = () => (
    <>
      <label htmlFor="username" className="label-texts">
        USERNAME
      </label>
      <input
        type="text"
        placeholder="Username"
        id="username"
        autoComplete="current-username"
        onChange={this.usernameEvent}
        className="login-input-fields"
      />
    </>
  )

  renderPassword = () => (
    <>
      <label htmlFor="password" className="label-texts">
        PASSWORD
      </label>
      <input
        type="password"
        placeholder="Password"
        id="password"
        autoComplete="current-password"
        onChange={this.passwordEvent}
        className="login-input-fields"
      />
    </>
  )

  render() {
    const {username, password, errorMessage, isLoginFailed} = this.state
    const jwtToken = Cookie.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form">
        <form className="login-card-container" onSubmit={this.submitForm}>
          <div className="jobby-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt=" website logo"
              className="jobby-logo"
            />
          </div>
          <div className="two-login-fields">{this.renderUsername()}</div>
          <div className="two-login-fields">{this.renderPassword()}</div>
          <div className="login-button-container">
            <button type="submit" className="login-button-styles">
              Login
            </button>
          </div>
          {isLoginFailed && <p className="error-message">*{errorMessage}</p>}
        </form>
      </div>
    )
  }
}
export default LoginForm
