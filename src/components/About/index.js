import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN Progress',
  failure: 'FAILURE',
  success: 'SUCCESS',
}
class About extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    faqsDataList: [],
    updateFactoidsDataList: [],
  }

  componentDidMount() {
    this.getFaqsData()
  }

  getFaqsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/covid19-faqs'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updateFactoidsData = await data.factoids
      const faqsData = await data.faq
      this.setState({
        updateFactoidsDataList: updateFactoidsData,
        faqsDataList: faqsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="aboutRouteLoader" className="loading-view">
      <Loader type="ThreeDots" color="#007BFF" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failureView-bg-container">
      <h1>Oops</h1>
      <p>Something went wrong Please try again</p>
      <button type="button" onClick={this.onclickRetryBtn}>
        Retry
      </button>
    </div>
  )

  onclickRetryBtn = () => {
    this.getFaqsData()
  }

  renderFactoidsDataList = () => {
    const {updateFactoidsDataList} = this.state

    updateFactoidsDataList.map(eachFactoid => (
      <div key={eachFactoid.id}>
        <li>{eachFactoid.banner}</li>
      </div>
    ))
  }

  renderSuccessView = () => {
    const {faqsDataList, updateFactoidsDataList} = this.state
    console.log(updateFactoidsDataList)

    return (
      <div className="about-page-bg-container">
        <h1 className="heading">About</h1>
        <p className="sub-heading">
          COVID-19 vaccines be ready for distribution
        </p>
        <ul data-testid="faqsUnorderedList" className="faqs-unordered-list">
          {faqsDataList.map(eachFaq => (
            <div className="faq-list-items" key={eachFaq.qno}>
              <li className="question">{eachFaq.question}</li>
              <li className="answer">{eachFaq.answer}</li>
            </div>
          ))}

          {updateFactoidsDataList.map(eachFactoid => (
            <li key={eachFactoid.id} className="faq-list-items">
              {eachFactoid.banner}
            </li>
          ))}
        </ul>
        <Footer />
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return ''
    }
  }
}

export default About
