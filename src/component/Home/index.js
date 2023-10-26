import {Component} from 'react'
import Cookie from 'js-cookie'
import {Link, Redirect} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = props => {
  const jwtToken = Cookie.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  const findJobsClicked = () => {
    const {history} = props
    history.replace('./jobs')
  }

  return (
    <div>
      <Header />
      <div className="home-container">
        <div className="home-large-card-container">
          <h1 className="home-motto">Find The Job That Fits Your Life </h1>
          <p className="home-description">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the Job that fits your abilities and
            potential.
          </p>
          <div>
            <button
              type="button"
              onClick={findJobsClicked}
              className="find-jobs-button"
            >
              Find Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home
