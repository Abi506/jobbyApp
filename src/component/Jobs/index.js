import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {BsSearch, BsFillBriefcaseFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'

import Header from '../Header'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    userSearchInput: '',
    jobsList: [],
    profileDetails: {},
    minimumPackage: '',
    selectedEmploymentTypes: [],
    isJobsLoading: true,
    isProfileLoading: true,
  }

  componentDidMount() {
    this.getProfile()
    this.getProducts()
  }

  getProfile = async () => {
    const token = Cookie.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const fetchedData = {
      name: data.profile_details.name,
      profileImageUrl: data.profile_details.profile_image_url,
      shortBio: data.profile_details.short_bio,
    }

    this.setState({profileDetails: fetchedData, isProfileLoading: false})
  }

  searchEvent = event => {
    this.setState({userSearchInput: event.target.value})
  }

  clicked = employmentTypeId => {
    const {selectedEmploymentTypes} = this.state
    // Clone the existing array of selected employment types
    const selectedTypes = [...selectedEmploymentTypes]

    // Check if the employment type is already selected
    const index = selectedTypes.indexOf(employmentTypeId)

    if (index === -1) {
      // If not selected, add it to the array
      selectedTypes.push(employmentTypeId)
    } else {
      // If already selected, remove it from the array
      selectedTypes.splice(index, 1)
    }

    // Update the state with the new array of selected types
    this.setState({selectedEmploymentTypes: selectedTypes}, () =>
      this.getProducts(),
    )
  }

  clickedSalary = event => {
    this.setState({minimumPackage: event.target.value}, () =>
      this.getProducts(),
    )
  }

  startSearch = () => {
    this.getProducts()
  }

  getFailedStatus = () => {
    ;<Redirect to="/not-found" />
  }

  getProducts = async () => {
    const {
      userSearchInput,
      selectedEmploymentTypes,
      minimumPackage,
    } = this.state

    const token = Cookie.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${selectedEmploymentTypes}&minimum_package=${minimumPackage}&search=${userSearchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.status === 200) {
      const fetchedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({jobsList: fetchedData, isJobsLoading: false})
    } else if (response.status === 400) {
      this.getFailedStatus()
    }
  }

  getEmploymentTypes = () => {
    const {selectedEmploymentTypes} = this.state
    return employmentTypesList.map(each => (
      <li
        className="each-list"
        key={each.employmentTypeId}
        onChange={() => this.clicked(each.employmentTypeId)}
      >
        <input
          type="checkbox"
          id={each.employmentTypeId}
          className="each-checkbox"
          checked={selectedEmploymentTypes.includes(each.employmentTypeId)}
          onChange={() => this.clicked(each.employmentTypeId)}
        />
        <label htmlFor={each.employmentTypeId} className="each-label">
          {each.label}
        </label>
      </li>
    ))
  }

  radioClicked = event => {
    this.setState({minimumPackage: event.target.value}, () =>
      this.getProducts(),
    )
  }

  getSalaryRanges = () => {
    const {minimumPackage} = this.state
    return salaryRangesList.map(each => (
      <li className="each-salary-list" key={each.salaryRangeId}>
        <input
          type="radio"
          value={each.salaryRangeId}
          onChange={this.radioClicked}
          id={each.salaryRangeId}
          checked={each.salaryRangeId === minimumPackage}
          className="each-radio"
        />
        <label htmlFor={each.salaryRangeId} className="each-salary-label">
          {each.label}
        </label>
      </li>
    ))
  }

  renderNoJobs = () => (
    <div className="no-jobs-container">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-image"
        />
      </div>
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-para">
        We could not find any jobs. Try other Filters
      </p>
    </div>
  )

  getListofJobs = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return this.renderNoJobs()
    }

    return jobsList.map(each => (
      <Link to={`/jobs/${each.id}`} key={each.id} className="nav-link">
        <li className="each-job">
          <div className="about-job-container">
            <div className="upper-part">
              <div>
                <img
                  src={each.companyLogoUrl}
                  alt="company name"
                  className="company-logo"
                />
              </div>
              <div>
                <h1 className="job-title">{each.title}</h1>
                <p className="rating-para">
                  <span>
                    <AiFillStar className="star-icon" />
                    {each.rating}
                  </span>
                </p>
              </div>
            </div>
            <div className="location-and-salary-container">
              <div className="location">
                <p className="location-para">
                  <span className="location-span">
                    <IoLocationSharp className="location-icon" />
                  </span>
                  {each.location}
                </p>
                <p className="location-para">
                  <span className="location-span">
                    <BsFillBriefcaseFill className="location-icon" />
                  </span>
                  {each.employmentType}
                </p>
              </div>
              <div className="salary-package-container">
                <p>{each.packagePerAnnum}</p>
              </div>
            </div>
          </div>
          <hr className="separator-jobs" />
          <div className="job-description-container">
            <p className="description-title">Description</p>
            <p className="description-para">{each.jobDescription}</p>
          </div>
        </li>
      </Link>
    ))
  }

  render() {
    const {
      profileDetails,
      selectedEmploymentTypes,
      jobsList,
      isJobsLoading,
      isProfileLoading,
      minimumPackage,
    } = this.state

    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="user-input-field">
            <input
              type="search"
              className="jobs-input-field"
              placeholder="Search"
              onChange={this.searchEvent}
            />
            <button
              type="button"
              data-testid="searchButton"
              className="search-button"
              onClick={this.startSearch}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <div className="left-container">
            {isProfileLoading === false && (
              <div className="profile-container">
                <div className="profile-image-container">
                  <img
                    src={profileImageUrl}
                    alt="profile"
                    className="profile"
                  />
                </div>
                <h1 className="user-name">{name}</h1>
                <p className="user-bio">{shortBio}</p>
              </div>
            )}
            {isProfileLoading === true && (
              <div className="loader-container-profile" data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            )}

            <hr className="separator" />
            <ul className="employment-types-lists">
              <p className="employment-type-heading">Type of Employment</p>
              {this.getEmploymentTypes()}
            </ul>
            <hr className="separator" />
            <ul className="salary-range-lists">
              <p className="salary-range-heading">Salary Range</p>
              {this.getSalaryRanges()}
            </ul>
          </div>
          <div className="right-part">
            {isJobsLoading === true && (
              <div className="loader-container" data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            )}
            )
            {isJobsLoading === false && (
              <>
                <div className="user-input-field-large">
                  <input
                    type="search"
                    className="jobs-input-field-large"
                    placeholder="Search"
                    onChange={this.searchEvent}
                  />
                  <button
                    type="button"
                    data-testid="searchButton"
                    className="search-button-large"
                    onClick={this.startSearch}
                  >
                    <BsSearch className="search-icon" />
                  </button>
                </div>
                <ul className="list-of-jobs">{this.getListofJobs()}</ul>{' '}
              </>
            )}
          </div>
        </div>
        )
      </>
    )
  }
}
export default Jobs
