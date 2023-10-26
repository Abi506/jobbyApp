import {BsSearch, BsFillBriefcaseFill, BsBoxArrowUpRight} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import './index.css'

const JobDetails = props => {
  const {jobDetails, skillsData} = props
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,
    id,
    jobDescription,
    description,
    imageUrl,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  const renderSkills = () =>
    skillsData.map(each => (
      <li className="each-skills" key={each.name}>
        <div>
          <img src={each.imageUrl} alt={each.name} className="skill-image" />
        </div>
        <p className="skill-name">{each.name}</p>
      </li>
    ))

  return (
    <div className="job-detail-container">
      <div className="whole-jobDetails-container">
        <div className="about-job-detail-container">
          <div className="upper-part">
            <div>
              <img
                src={companyLogoUrl}
                alt="company name"
                className="company-logo"
              />
            </div>
            <div>
              <h1 className="job-title">{title}</h1>
              <p className="rating-para">
                <span>
                  <AiFillStar className="star-icon" />
                  {rating}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="location-and-salary-container">
          <div className="location">
            <p className="location-para">
              <span className="location-span">
                <IoLocationSharp className="location-icon" />
              </span>
              {location}
            </p>
            <p className="location-para">
              <span className="location-span">
                <BsFillBriefcaseFill className="location-icon" />
              </span>
              {employmentType}
            </p>
          </div>
          <div className="salary-package-container">
            <p>{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="separator-jobs" />
        <div className="job-description-container">
          <div className="description-container">
            <p className="description-title">Description</p>
            <a
              className="href-icons"
              rel="noopener noreferrer"
              target="_blank"
              href={companyWebsiteUrl}
            >
              Visit <BsBoxArrowUpRight />
            </a>
          </div>
          <p className="description-para">{jobDescription}</p>
        </div>
        <h1 className="skill-heading">Skills</h1>
        <ul className="skill-container">{renderSkills()}</ul>
        <div className="life-at-company">
          <div className="life-at-company-content">
            <h1 className="life-at-company-heading">Life at Company</h1>

            <p className="description-para">{description}</p>
          </div>
          <div>
            <img
              src={imageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default JobDetails
