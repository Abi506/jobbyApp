import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import JobDetails from '../JobDetails'
import SimilarJobs from '../SimiliarJobsItem'
import './index.css'

class JobItem extends Component {
  state = {
    similarJobs: [],
    jobDetails: [],
    skills: [],
    isLoading: true,
    redirectNeeded: false,
  }

  componentDidMount() {
    this.getDetails()
  }

  renderFailedStatus = () => {
    console.log('here')
    return <Redirect to="/not-found" />
  }

  getDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookie.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    const fetchedData = {
      companyLogoUrl: data.job_details.company_logo_url,
      companyWebsiteUrl: data.job_details.company_website_url,
      employmentType: data.job_details.employment_type,
      id: data.job_details.id,
      jobDescription: data.job_details.job_description,
      description: data.job_details.life_at_company?.description,
      imageUrl: data.job_details.life_at_company?.image_url,
      location: data.job_details.location,
      packagePerAnnum: data.job_details.package_per_annum,
      rating: data.job_details.rating,
      title: data.job_details.title,
    }
    const skillsData = data.job_details.skills.map(each => ({
      imageUrl: each.image_url,
      name: each.name,
    }))

    const similarJobs = data.similar_jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      jobDescription: each.job_description,
      id: each.id,
      location: each.location,
      rating: each.rating,
      title: each.title,
    }))

    this.setState({
      jobDetails: fetchedData,
      skills: skillsData,
      similarJobs,
      isLoading: false,
      redirectNeeded: false,
    })

    if (response.status_code === 400) {
      this.setState({redirectNeeded: true, isLoading: false})
    }
  }

  render() {
    const {
      jobDetails,
      skills,
      similarJobs,
      isLoading,
      redirectNeeded,
    } = this.state
    if (redirectNeeded === true) {
      return <Redirect to="/not-found" />
    }

    return (
      <>
        <Header />
        {isLoading === true && (
          <div className="loader-container-jobItem" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )}
        {isLoading === false && (
          <div className="job-item-container">
            <JobDetails jobDetails={jobDetails} skillsData={skills} />
            <SimilarJobs details={similarJobs} />
          </div>
        )}
      </>
    )
  }
}
export default JobItem
