import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ComposedChart,
  Scatter,
} from 'recharts'

import TopDistricts from '../Districts'
import initialStatesList from '../ListOfStates'
import Footer from '../Footer'
import './index.css'

const indiaMap = {
  'Andaman and Nicobar Islands':
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720260562/Group_7362_qzhbjl.svg',
  'Dadra and Nagar Haveli and Daman and Diu':
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720260339/Group_7357_l41io9.svg',
  Chandigarh:
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720260639/Group_7361_jfabi7.svg',
  Lakshadweep:
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720260273/Group_7359_sbqohs.svg',
  Puducherry:
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720260161/Group_7360_bnnxfp.svg',
  Delhi:
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720260105/Group_7358_mz5jbr.svg',
  'Tamil Nadu':
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720013423/Group_7356_adgkms.svg',
  Telangana:
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720013445/Group_7351_qrkpbd.svg',
  Karnataka:
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720013538/Group_7339_vsbyw5.svg',
  Maharashtra:
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720013563/Group_7350_ctf8wv.svg',
  Odisha:
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720013585/Group_7348_qmqlo0.svg',
  Chhattisgarh:
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720013631/Group_7353_zqisl4.svg',
  Kerala:
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720013522/Group_7355_qjbivp.svg',
  Tripura:
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720013659/Group_7352_r5izbx.svg',
  Mizoram:
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720013691/Group_7347_moqdxe.svg',
  Manipur:
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720013714/Group_7346_spxw0d.svg',
  Nagaland:
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720013740/Group_7345_cbmnd0.svg',
  Meghalaya:
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720013784/Group_7344_bvechr.svg',
  Goa:
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720013808/Group_7349_mdc0yc.svg',
  'Arunachal Pradesh':
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720013873/Group_7340_gjoqmj.svg',
  Sikkim:
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720013973/Group_7338_nugugr.svg',
  'West Bengal':
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720013998/Group_7343_hexztw.svg',
  Jharkhand:
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720014033/Group_7342_ystgbx.svg',
  Gujarat:
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720014163/Group_7337_a4lbrz.svg',
  'Madhya Pradesh':
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720014196/Group_7336_rwc5rj.svg',
  Bihar:
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720014279/Group_7335_g0uxvm.svg',
  'Uttar Pradesh':
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720014308/Group_7334_nca6bs.svg',
  Rajasthan:
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720014325/Group_7333_zpdyud.svg',
  Haryana:
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720014347/Group_7332_bln0za.svg',
  Uttarakhand:
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720014376/Group_7331_zrigne.svg',
  Punjab:
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720014402/Group_7330_ugfoi1.svg',
  'Himachal Pradesh':
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720014429/Group_7364_aatnwr.svg',
  'Jammu and Kashmir':
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720014454/Group_7328_gqddpn.png',
  'Andhra Pradesh':
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720016896/Group_7354_kze9ao.svg',
  Assam:
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720017222/Group_7341_1_lte3d7.svg',

  Ladakh:
    'https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720016960/Group_7363_fxboph.svg',
}

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN Progress',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class StateCovidDetails extends Component {
  state = {
    stateName: '',
    stateInfo: [],
    apiStatus: apiStatusConstants.initial,
    selectedCount: 'confirmed',
    isDistrictDataLoaded: false,
    topDistrictsData: [],
    stateStatsList: [],
    statsDetailsData: [],
    countColor: '#ff073a',
    statesListData: [],
    stateCode: '',
    updatedLastDate: '',
  }

  componentDidMount() {
    this.getstateDetails()
    this.getDateWiseCount()
  }

  getTopDistrictsData = dist => {
    // console.log(dist)
    const {selectedCount} = this.state
    // console.log(selectedCount)

    const districtNamesList = Object.keys(dist)
    // console.log(districtNamesList)
    const distData = districtNamesList.map(item => {
      // console.log(dist[item].total)
      if (dist[item].total !== undefined) {
        return {
          name: item,
          confirmed:
            dist[item].total.confirmed !== undefined
              ? dist[item].total.confirmed
              : 0,
          recovered:
            dist[item].total.recovered !== undefined
              ? dist[item].total.recovered
              : 0,
          deceased:
            dist[item].total.deceased !== undefined
              ? dist[item].total.deceased
              : 0,
          active:
            (dist[item].total.confirmed !== undefined
              ? dist[item].total.confirmed
              : 0) -
            ((dist[item].total.recovered !== undefined
              ? dist[item].total.recovered
              : 0) +
              (dist[item].total.deceased !== undefined
                ? dist[item].total.deceased
                : 0)),
        }
      }
      return {
        name: item,
        confirmed: 0,
        recovered: 0,
        deceased: 0,
        active: 0,
      }
    })

    const updatedDataInDescOrder = distData.sort((sortA, sortB) => {
      const a = sortA[selectedCount]
      const b = sortB[selectedCount]

      return b - a
    })

    return updatedDataInDescOrder
  }

  getPropDetails = () => {
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const statecode = stateCode
    return statecode
  }

  getstateDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {stateCode, stateName, selectedCount} = this.state
    // console.log(selectedCount)
    this.setState({apiStatus: apiStatusConstants.inProgress})
    let specificStateCode = ''
    let specificStateName = ''

    if (stateCode === '') {
      const stateCodeData = this.getPropDetails()
      console.log(stateCodeData)
      specificStateCode = stateCodeData
      const stateNameDetailsList = initialStatesList()
      const getDetails = stateNameDetailsList.filter(
        eachstate => eachstate.state_code === stateCodeData,
      )
      // console.log(getDetails)
      specificStateName = getDetails[0].state_name
    } else {
      specificStateCode = stateCode
      specificStateName = stateName
    }
    // console.log(specificStateCode)

    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()

      const state = await data[specificStateCode]

      const getTotal = await state.total
      // console.log(state.districts )
      const districts = await state.districts
      const topDistrictsData = this.getTopDistrictsData(districts)
      // console.log(topDistrictsData)
      const statsDetails = {
        lastUpdated: state.meta.last_updated,
        population: state.meta.population,
        tested: state.total.tested,
      }
      const lastUpdatedDate = new Date(statsDetails.lastUpdated)
      const month = lastUpdatedDate.getMonth()
      const monthsData = [
        'jan',
        'feb',
        'mar',
        'apr',
        'may',
        'june',
        'july',
        'aug',
        'sep',
        'oct',
        'nov',
        'dec',
      ]
      const updatedMonth = monthsData[month]
      const date = lastUpdatedDate.getDate()
      const year = lastUpdatedDate.getFullYear()
      const updatedLastDate = `${date}st ${updatedMonth} ${year}`

      const stateWiseApiUrl = 'https://apis.ccbp.in/covid19-state-ids'
      const option = {
        method: 'GET',
      }
      const statesResponse = await fetch(stateWiseApiUrl, option)
      const statesData = await statesResponse.json()
      const {states} = await statesData

      // this.setState({statesListData: states, stateName: specificStateName})
      // console.log(stateName)

      this.setState(
        {
          stateCode,
          stateInfo: getTotal,
          apiStatus: apiStatusConstants.success,
          topDistrictsData,
          statsDetailsData: statsDetails,
          stateName: specificStateName,
          updatedLastDate,
          statesListData: states,
        },
        this.getDateWiseCount,
      )
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  getDateWiseCount = async () => {
    this.setState({isDistrictDataLoaded: false})
    const {stateCode, stateName} = this.state
    let specificStateCode = ''
    let specificStateName = ''
    if (stateCode === '') {
      const stateCodeData = this.getPropDetails()
      specificStateCode = stateCodeData
      const stateNameDetailsList = initialStatesList()
      const getDetails = stateNameDetailsList.filter(
        eachstate => eachstate.state_code === stateCodeData,
      )
      // console.log(getDetails)
      specificStateName = getDetails[0].state_name
    } else {
      specificStateCode = stateCode
      specificStateName = stateName
    }
    const url = 'https://apis.ccbp.in/covid19-timelines-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const state = await data[specificStateCode]
      const stateDates = state.dates
      // console.log(data)
      const datesList = Object.keys(stateDates)
      // console.log(datesList)
      const stateStatsList = datesList.map(item => ({
        date: item,
        confirmed:
          stateDates[item].total.confirmed !== undefined
            ? stateDates[item].total.confirmed
            : 0,
        recovered:
          stateDates[item].total.recovered !== undefined
            ? stateDates[item].total.recovered
            : 0,
        deceased:
          stateDates[item].total.deceased !== undefined
            ? stateDates[item].total.deceased
            : 0,
        tested:
          stateDates[item].total.tested !== undefined
            ? stateDates[item].total.tested
            : 0,
        active:
          (stateDates[item].total.confirmed !== undefined
            ? stateDates[item].total.confirmed
            : 0) -
          (stateDates[item].total.recovered !== undefined
            ? stateDates[item].total.recovered
            : 0) +
          (stateDates[item].total.deceased !== undefined
            ? stateDates[item].total.deceased
            : 0),
      }))
      // console.log(stateStatsList)

      this.setState({
        stateStatsList,
        isDistrictDataLoaded: true,
        stateCode: specificStateCode,
        stateName: specificStateName,
      })
    }
  }

  onClickCount = selectedCount => {
    this.setState({selectedCount}, this.getstateDetails)
    if (selectedCount === 'confirmed') {
      this.setState({countColor: '#ff073a'})
    } else if (selectedCount === 'active') {
      this.setState({countColor: '#007bff'})
    } else if (selectedCount === 'recovered') {
      this.setState({countColor: '#28a745'})
    } else if (selectedCount === 'deceased') {
      this.setState({countColor: '#6c757d'})
    }
  }

  stateLoactionInMap = () => {
    const {stateName, statsDetailsData, updatedLastDate} = this.state

    const stateMap = indiaMap[stateName]
    return (
      <div className="map-container">
        <img src={stateMap} alt={stateName} className="map-element" />
        <div>
          <p className="report-details">NCP report</p>
          <div>
            <p>population</p>
            <p className="report-details">{statsDetailsData.population}</p>
          </div>
          <div>
            <p>tested</p>
            <p className="report-details">{statsDetailsData.tested}</p>
          </div>
          <p className="last-date">{`as of ${updatedLastDate} per source`}</p>
        </div>
      </div>
    )
  }

  renderLineChart = () => {
    const {stateStatsList, selectedCount, countColor} = this.state
    // console.log(stateStatsList)
    const allCounts = ['confirmed', 'active', 'recovered', 'deceased', 'tested']

    return (
      <div data-testid="lineChartsContainer" className="charts-layout">
        <h1>Daily Spread Trends</h1>

        {allCounts.map(eachCount => {
          let strokeColor = ''
          if (eachCount === 'confirmed') {
            strokeColor = '#ff073a'
          } else if (eachCount === 'active') {
            strokeColor = '#007bff'
          } else if (eachCount === 'recovered') {
            strokeColor = '#28a745'
          } else if (eachCount === 'deceased') {
            strokeColor = '#6c757d'
          } else if (eachCount === 'tested') {
            strokeColor = '#9673B9'
          }
          return (
            <div
              className={`line-chart ${eachCount}-bg-color `}
              key={eachCount}
            >
              <LineChart
                width={900}
                height={250}
                data={stateStatsList}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}
              >
                <XAxis
                  dataKey="date"
                  stroke={strokeColor}
                  className={`${eachCount}-cases`}
                />
                <YAxis stroke={strokeColor} />
                <Tooltip />

                <Legend
                  width={100}
                  wrapperStyle={{
                    top: 40,
                    right: 20,
                    backgroundColor: 'transparent',
                    border: '0px solid #d5d5d5',
                    borderRadius: 3,
                    lineHeight: '40px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey={eachCount}
                  stroke={strokeColor}
                />
              </LineChart>
            </div>
          )
        })}
      </div>
    )
  }

  renderBarChart = () => {
    const {stateStatsList, selectedCount, countColor} = this.state
    // console.log(stateStatsList)
    const slicedList = stateStatsList.slice(-10)

    // console.log(slicedList)
    return (
      <div className="bar">
        <BarChart
          width={900}
          height={500}
          data={slicedList}
          stroke={countColor}
        >
          <XAxis dataKey="date" stroke={countColor} />

          <Legend />
          <Bar
            dataKey={selectedCount}
            fill={countColor}
            label={{position: 'top', color: 'white'}}
            barSize={50}
            radius={5}
          />
        </BarChart>
      </div>
    )
  }

  onclickRetryBtn = () => {
    this.getstateDetails()
  }

  renderDistrictsLoadingView = () => (
    <div data-testid="timelinesDataLoader" className="districts-container">
      <Loader type="TailSpin" color="#007BFF" height="50" width="50" />
    </div>
  )

  onChangeSelectState = event => {
    const {statesListData, selectedState} = this.state
    const stateNameValue = event.target.value
    // console.log(stateNameValue)
    // console.log(stateName)

    // const getState = statesListData[stateId]
    const codeDetailsList = initialStatesList()
    const getDetails = codeDetailsList.filter(eachstate =>
      eachstate.state_name.includes(stateNameValue),
    )
    const name = getDetails[0].state_name
    const code = getDetails[0].state_code

    this.setState(
      {
        stateName: name,
        stateCode: code,
      },
      this.getstateDetails,
      this.getDateWiseCount,
    )
    const {history} = this.props
    history.replace(`/state/${code}`)
  }

  renderLoadingView = () => (
    <div data-testid="stateDetailsLoader" className="loading-view">
      <Loader type="TailSpin" color="#007BFF" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failureView-bg-container">
      <h1>Oops</h1>
      <p>Something went wrong Please try again</p>
      <button
        type="button"
        onClick={this.onclickRetryBtn}
        className="retry-btn"
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {
      stateName,
      stateInfo,
      selectedCount,
      topDistrictsData,
      stateStatsList,
      isDistrictDataLoaded,
      statsDetailsData,
      statesListData,
      stateCode,
      updatedLastDate,
    } = this.state

    const stateMap = indiaMap[stateName]
    // console.log(stateName)
    // console.log(districtsData)
    const {confirmed, tested, deceased, recovered} = stateInfo
    const active = confirmed - (recovered + deceased)
    // console.log(topDistrictNames)
    const confirmedCountClassName =
      selectedCount === 'confirmed' ? 'confirmed-bg-color' : ''
    const activeCountClassName =
      selectedCount === 'active' ? 'active-bg-color' : ''
    const recoveredCountClassName =
      selectedCount === 'recovered' ? 'recovered-bg-color' : ''
    const deceasedCountClassName =
      selectedCount === 'deceased' ? 'deceased-bg-color' : ''

    return (
      <div className="state-bg-container">
        <div className="state-top-section">
          <div className="alignment-of-name-container">
            <h1 className="name-container">{stateName}</h1>
            <p className="last-date lastdate-alignment">{`Last update on ${updatedLastDate}`}</p>
          </div>
          <div className="tested-count">
            <p className="tested-value">Tested</p>
            <p className="tested-value">{tested}</p>
          </div>
          <div>
            <select
              className="select-bg-container state-option"
              onChange={this.onChangeSelectState}
              id="selectState"
            >
              {statesListData.map(eachState => {
                const selectedStateName = stateName
                const isSelected = eachState.state_name === selectedStateName
                return (
                  <option
                    value={eachState.state_name}
                    className="state-options"
                    key={eachState.state_id}
                    selected={isSelected}
                  >
                    {eachState.state_name}
                  </option>
                )
              })}
            </select>
          </div>
        </div>

        <div className="state-wide-details-bg-container " role="presentation">
          <div className={confirmedCountClassName} role="presentation">
            <div
              data-testid="stateSpecificConfirmedCasesContainer"
              className="state-wide-cases-count confirmed-cases "
              onClick={() => this.onClickCount('confirmed')}
              role="presentation"
            >
              <p>Confirmed</p>
              <img
                src="https://res.cloudinary.com/dpj5lzzyz/image/upload/v1718784195/check-mark_1_m4ywmj.svg"
                alt="state specific confirmed cases pic"
                className="covid19-images"
              />
              <p>{confirmed}</p>
            </div>
          </div>

          <div className={activeCountClassName} role="presentation">
            <div
              data-testid="stateSpecificActiveCasesContainer"
              className="state-wide-cases-count active-cases"
              onClick={() => this.onClickCount('active')}
              role="presentation"
            >
              <p>Active</p>
              <img
                src="https://res.cloudinary.com/dpj5lzzyz/image/upload/v1718784251/protection_1_lraevc.svg"
                alt="state specific active cases pic"
                className="covid19-images"
              />
              <p>{active}</p>
            </div>
          </div>

          <div className={recoveredCountClassName} role="presentation">
            <div
              role="presentation"
              data-testid="stateSpecificRecoveredCasesContainer"
              className="state-wide-cases-count recovered-cases"
              onClick={() => this.onClickCount('recovered')}
            >
              <p>Recovered</p>
              <img
                src="https://res.cloudinary.com/dpj5lzzyz/image/upload/v1718784174/recovered_1_cypes8.svg"
                alt="state specific recovered cases pic"
                className="covid19-images"
              />
              <p>{recovered}</p>
            </div>
          </div>

          <div className={deceasedCountClassName} role="presentation">
            <div
              data-testid="stateSpecificDeceasedCasesContainer"
              className="state-wide-cases-count deceased-cases"
              onClick={() => this.onClickCount('deceased')}
              role="presentation"
            >
              <p>Deceased</p>
              <img
                src="https://res.cloudinary.com/dpj5lzzyz/image/upload/v1718784023/breathing_1_esgnd8.svg"
                alt="state specific deceased cases pic"
                className="covid19-images"
              />
              <p>{deceased}</p>
            </div>
          </div>
        </div>
        <div>{this.stateLoactionInMap()}</div>

        <ul data-testid="topDistrictsUnorderedList">
          <h1 className={`${selectedCount}-cases districts-heading`}>
            Top Districts
          </h1>
          {isDistrictDataLoaded ? (
            <div className="districts-container">
              {topDistrictsData.map(eachDist => (
                <TopDistricts
                  districtsDetails={eachDist}
                  selectedCount={selectedCount}
                  key={eachDist.name}
                />
              ))}
            </div>
          ) : (
            this.renderDistrictsLoadingView()
          )}
        </ul>

        <div className="charts-bg-container">
          <div className="bar-chart-bg-container">{this.renderBarChart()}</div>
          {this.renderLineChart()}
        </div>

        {Footer()}
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

export default StateCovidDetails
