import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import StateWiseCovidDetails from '../AllStatesCovidDetails'
import SearchVarients from '../SearchVarients'
import Footer from '../Footer'
import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN Progress',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    countryWideCovidData: [],
    stateWiseData: [],
    searchInput: '',
    searchResultStatesData: [],
  }

  componentDidMount() {
    this.getNationalWideData()
  }

  getNationalWideData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const stateWiseApiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(stateWiseApiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      // console.log(data)
      // const statesListItems = object.keys(data)

      const resultList = []
      let totalConfirmedCases = 0
      let totalRecoveredCases = 0
      let totalDeceasedCases = 0
      statesList.forEach(stateCode => {
        // console.log(stateCode)

        if (data[stateCode.state_code]) {
          // console.log(data[stateCode.state_code])
          const {total} = data[stateCode.state_code]
          // console.log(total)
          // if the state's covid data is available we will store it or we will store 0
          totalConfirmedCases += total.confirmed ? total.confirmed : 0
          totalRecoveredCases += total.recovered ? total.recovered : 0
          totalDeceasedCases += total.deceased ? total.deceased : 0
          const confirmed = total.confirmed ? total.confirmed : 0
          const deceased = total.deceased ? total.deceased : 0
          const recovered = total.recovered ? total.recovered : 0
          const tested = total.tested ? total.tested : 0
          const population = data[stateCode.state_code].meta.population
            ? data[stateCode.state_code].meta.population
            : 0

          resultList.push({
            stateCode: stateCode.state_code,
            name: statesList.find(
              state => state.state_code === stateCode.state_code,
            ).state_name,

            confirmed,
            deceased,
            recovered,
            tested,
            population,
            active: confirmed - (deceased + recovered),
          })
        }
      })
      const countryWideData = {
        totalConfirmedCases,
        totalRecoveredCases,
        totalActiveCases:
          totalConfirmedCases - (totalDeceasedCases + totalRecoveredCases),
        totalDeceasedCases,
      }
      this.setState({
        countryWideCovidData: countryWideData,
        stateWiseData: resultList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  setStateNamesInAsc = () => {
    const {stateWiseData} = this.state
    const updatedDataInAscOrder = stateWiseData.sort((sortA, sortB) => {
      const a = sortA.name.toUpperCase()
      const b = sortB.name.toUpperCase()
      return a > b ? 1 : -1
    })
    this.setState({stateWiseData: updatedDataInAscOrder})
  }

  setStateNamesInDesc = () => {
    const {stateWiseData} = this.state
    const updatedDataInDescOrder = stateWiseData.sort((sortA, sortB) => {
      const a = sortA.name.toUpperCase()
      const b = sortB.name.toUpperCase()
      return a < b ? 1 : -1
    })
    this.setState({stateWiseData: updatedDataInDescOrder})
  }

  renderStateWiseCounts = () => {
    const {countryWideCovidData, stateWiseData} = this.state
    const {
      totalConfirmedCases,
      totalRecoveredCases,
      totalActiveCases,
      totalDeceasedCases,
    } = countryWideCovidData
    return (
      <>
        <div className="country-wide-details-bg-container">
          <div
            data-testid="countryWideConfirmedCases"
            className="country-wide-cases-count confirmed-cases"
          >
            <p>Confirmed</p>
            <img
              src="https://res.cloudinary.com/dpj5lzzyz/image/upload/v1718784195/check-mark_1_m4ywmj.svg"
              alt="country wide confirmed cases pic"
              className="covid19-images"
            />
            <p>{totalConfirmedCases}</p>
          </div>

          <div
            data-testid="countryWideActiveCases"
            className="country-wide-cases-count active-cases"
          >
            <p>Active</p>
            <img
              src="https://res.cloudinary.com/dpj5lzzyz/image/upload/v1718784251/protection_1_lraevc.svg"
              alt="country wide active cases pic"
              className="covid19-images"
            />
            <p>{totalActiveCases}</p>
          </div>

          <div
            data-testid="countryWideRecoveredCases"
            className="country-wide-cases-count recovered-cases"
          >
            <p>Recovered</p>
            <img
              src="https://res.cloudinary.com/dpj5lzzyz/image/upload/v1718784174/recovered_1_cypes8.svg"
              alt="country wide recovered cases pic"
              className="covid19-images"
            />
            <p>{totalRecoveredCases}</p>
          </div>

          <div
            data-testid="countryWideDeceasedCases"
            className="country-wide-cases-count deceased-cases"
          >
            <p>Deceased</p>
            <img
              src="https://res.cloudinary.com/dpj5lzzyz/image/upload/v1718784023/breathing_1_esgnd8.svg"
              alt="country wide deceased cases pic"
              className="covid19-images"
            />
            <p>{totalDeceasedCases}</p>
          </div>
        </div>
        <div
          data-testid="stateWiseCovidDataTable"
          className="allStates-details"
        >
          <div className="counts-headings">
            <div className=" state-heading list-item ">
              <p>States/UT</p>
              <button
                type="button"
                data-testid="ascendingSort"
                className="asc-desc-icons-btn"
                onClick={this.setStateNamesInAsc}
              >
                <FcGenericSortingAsc aria-label="asc" />
              </button>
              <button
                type="button"
                data-testid="descendingSort"
                className="asc-desc-icons-btn margin-right"
                onClick={this.setStateNamesInDesc}
              >
                <FcGenericSortingDesc aria-label="desc" />
              </button>
            </div>
            <p className="list-item margin-right confirmed-margin">Confirmed</p>
            <p className="list-item margin-right">Active</p>
            <p className="list-item margin-left">Recovered</p>
            <p className="list-item margin-left">Deceased</p>
            <p className="list-item margin-left">Population</p>
          </div>
          <ul>
            {stateWiseData.map(eachState => (
              <StateWiseCovidDetails
                stateData={eachState}
                key={eachState.stateCode}
              />
            ))}
          </ul>
        </div>
        <div className="footer-section">
          <Footer />
        </div>
      </>
    )
  }

  renderLoadingView = () => (
    <div data-testid="homeRouteLoader" className="loading-view">
      <Loader type="Audio" color="#007BFF" height="50" width="50" />
    </div>
  )

  onclickRetryBtn = () => {
    this.getNationalWideData()
  }

  renderFailureView = () => (
    <div className="failureView-bg-container">
      <h1>Oops</h1>
      <p>Something went wrong Please try again</p>
      <button onClick={this.onclickRetryBtn}>Retry</button>
    </div>
  )

  onChangeSearchInput = event => {
    const {stateWiseData, searchInput} = this.state

    const updatedSearchList = stateWiseData.filter(eachState =>
      eachState.name.toLowerCase().includes(searchInput.toLowerCase()),
    )
    this.setState({
      searchInput: event.target.value,
      searchResultStatesData: updatedSearchList,
    })
  }

  selectedStateId = (stateCode, name) => {
    const {history} = this.props
    history.replace(`/state/${stateCode}`)
  }

  renderSuccessView = () => {
    const {
      countryWideCovidData,
      stateWiseData,
      searchInput,
      searchResultStatesData,
    } = this.state
    const isSearching = searchInput.length > 0
    console.log(isSearching)
    console.log(searchInput)
    return (
      <div className="home-route-container">
        <div className="home-page-bg-container">
          <div className="search-input-container">
            <BsSearch className="search-icon" data-testid="searchIcon" />
            <input
              type="search"
              className="search-input"
              placeholder="Enter the State"
              onChange={this.onChangeSearchInput}
            />
          </div>

          {isSearching && (
            <ul
              className="searchResults-bg-container"
              data-testid="searchResultsUnorderedList"
            >
              {searchResultStatesData.map(eachstate => (
                <Link
                  to={`/state/${eachstate.stateCode}`}
                  className="search-link-items"
                  key={`/state/${eachstate.stateCode}`}
                >
                  <SearchVarients
                    stateDetails={eachstate}
                    key={eachstate.stateCode}
                    selectedStateId={this.selectedStateId}
                  />
                </Link>
              ))}
            </ul>
          )}

          {this.renderStateWiseCounts()}
        </div>
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

export default Home
