import {BsSearch, BsFillBriefcaseFill, BsBoxArrowUpRight} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import './index.css'

const SimilarJobs = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    id,
    location,
    rating,
    title,
  } = details

  const renderSimilarJobs = () =>
    details.map(each => (
      <li className="about-similar-jobs-detail-container" key={each.id}>
        <div className="upper-part-similar-jobs">
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
        <div className="job-description-container">
          <div className="description-container">
            <p className="description-title">Description</p>
          </div>
          <p className="description-para">{each.jobDescription}</p>
        </div>
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
      </li>
    ))

  return (
    <div className="similar-jobs-container">
      <h1 className="similar-jobs-heading">Similar Jobs</h1>
      <ul className="similar-jobs-list">{renderSimilarJobs()}</ul>
    </div>
  )
}
export default SimilarJobs
