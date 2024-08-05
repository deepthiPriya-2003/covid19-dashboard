import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector,
  Cell,
} from 'recharts'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN Progress',
  failure: 'FAILURE',
  success: 'SUCCESS',
}
class Vaccination extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    vaccinationData: [],
    sitesData: [],
    vaccinationByAgeData: [],
    lastSevenDaysdata: [],
  }

  componentDidMount() {
    this.getVaccinationDetails()
  }

  getVaccinationDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const vaccinesApiUrl = 'https://apis.ccbp.in/covid19-vaccination-data/'
    const options = {
      method: 'GET',
    }
    const response = await fetch(vaccinesApiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const lastSevenDaysdata = data.last7DaysRegistration
      // console.log(data)
      const totalCount = data.topBlock
      const {vaccination} = totalCount
      const {sessionSiteData} = data
      const sites = {
        total: sessionSiteData.total_sites,
        govt: sessionSiteData.govt_sites,
        pvt: sessionSiteData.pvt_sites,
      }

      const {vaccinationByAge} = data
      const below14 = vaccinationByAge.vac_12_14
      const below17 = vaccinationByAge.vac_15_17
      const below45 = vaccinationByAge.vac_18_45
      const below60 = vaccinationByAge.vac_45_60
      const above60 = vaccinationByAge.above_60

      const vaccinationByAgeData = [
        {name: 'below18YearsOld', value: below14 + below17},
        {name: 'aboveEighteenYearsOld', value: below45},
        {name: 'aboveFourtySixYearsOld', value: below60},
        {name: 'aboveSixtyYearsOld', value: above60},
      ]

      // console.log(data)
      // console.log(sessionSiteData)

      // console.log(vaccinationByAgeData)
      this.setState({
        vaccinationData: vaccination,
        sitesData: sites,
        vaccinationByAgeData,
        lastSevenDaysdata,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  vaccinationByAgesCharts = () => {
    const {lastSevenDaysdata} = this.state
    // console.log(lastSevenDaysdata)

    return (
      <div className="area-chart">
        <AreaChart
          width={900}
          height={400}
          data={lastSevenDaysdata}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="reg_date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="male"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="female"
            stackId="2"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Area
            type="monotone"
            dataKey="others"
            stackId="3"
            stroke="#ffc658"
            fill="#ffc658"
          />
        </AreaChart>
      </div>
    )
  }

  renderPieChart = () => {
    const {vaccinationByAgeData} = this.state
    console.log(vaccinationByAgeData)
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
    const RADIAN = Math.PI / 180
    const renderCustomizedLabel = ({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
      index,
    }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5
      const x = cx + radius * Math.cos(-midAngle * RADIAN)
      const y = cy + radius * Math.sin(-midAngle * RADIAN)
    }
    return (
      <div className="pie-chart-1">
        <PieChart width={400} height={400}>
          <Pie
            data={vaccinationByAgeData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {vaccinationByAgeData.map((entry, index) => {
              const cellIndex = `cell-${index}`
              return (
                <Cell key={cellIndex} fill={COLORS[index % COLORS.length]} />
              )
            })}
          </Pie>
        </PieChart>
      </div>
    )
  }

  pieChartByDose = () => {
    const {vaccinationData} = this.state
    const vaccineNamesData = [
      {name: 'covishield', value: vaccinationData.covishield},
      {name: 'covaxin', value: vaccinationData.covaxin},
      {name: 'sputnik', value: vaccinationData.sputnik},
    ]
    console.log(vaccineNamesData)
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
    return (
      <div className="pie-chart-2">
        <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
          <Pie
            data={vaccineNamesData}
            cx={420}
            cy={200}
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {vaccineNamesData.map((entry, index) => {
              const cellIndex = `cell-${index}`
              return (
                <Cell key={cellIndex} fill={COLORS[index % COLORS.length]} />
              )
            })}
          </Pie>
        </PieChart>
      </div>
    )
  }

  renderLoadingView = () => (
    <div data-testid="vaccinationDetailsLoader" className="loading-view">
      <Loader type="TailSpin" color="#007BFF" height="50" width="50" />
    </div>
  )

  onclickRetryBtn = () => {
    this.getVaccinationDetails()
  }

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
      statesListData,
      selectedStateId,
      selectedStateName,
      districtsListData,
      selectedDistrictName,
      selectedDistrictId,
      vaccinationData,
      sitesData,
      vaccinationByAgeData,
    } = this.state

    // console.log(sitesData.total)
    // console.log(vaccinationByAgeData)

    return (
      <div
        className="vaccination-bg-container"
        data-testid="vaccinationDetailsContainer"
      >
        <div className="main-heading">
          <h1>India</h1>
        </div>
        <div className="vaccination-counts-container">
          <div>
            <div className="total-vaccination-container">
              <div className="row-alignment margin">
                <img src="https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720265105/Group_7476_j6wbvp.svg" />
                <div className="margin">
                  <p className="headings">Total Vaccination Doses</p>
                  <p>{vaccinationData.total}</p>
                </div>
              </div>
              <div className="row-alignment">
                <div className="margin">
                  <p className="headings">Dose 1</p>
                  <p>{vaccinationData.tot_dose_1}</p>
                </div>
                <div className="margin">
                  <p className="headings">Dose 2</p>
                  <p>{vaccinationData.tot_dose_2}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="total-vaccination-container">
              <div className="row-alignment margin">
                <img src="https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720265093/Group_7475_hsviva.svg" />
                <div className="margin">
                  <p className="headings">Site Conducting Vaccination</p>
                  <p>{sitesData.total}</p>
                </div>
              </div>
              <div className="row-alignment">
                <div className="margin">
                  <p className="headings">Government</p>
                  <p>{sitesData.govt}</p>
                </div>
                <div className="margin">
                  <p className="headings">Private</p>
                  <p>{sitesData.pvt}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="chart-bg-container">
          <h1 className="heading">Vaccination Trends</h1>
          <p>By gender</p>
          <div>{this.vaccinationByAgesCharts()}</div>
        </div>
        <div className="pie-charts-alignment-container">
          <div className="pie-container">
            <p>Vaccination By Age</p>
            {this.renderPieChart()}
            <div className="row-alignment">
              <div className="label-colors-container">
                <button className="ages-color-1" disabled aria-label="ageBtn1">
                  12-18
                </button>
                <p>12-18</p>
              </div>
              <div className="label-colors-container">
                <button className="ages-color-2" disabled aria-label="ageBtn2">
                  18-14
                </button>
                <p>18-45</p>
              </div>
              <div className="label-colors-container">
                <button className="ages-color-3" disabled aria-label="ageBtn3">
                  45-60
                </button>
                <p>45-60</p>
              </div>
              <div className="label-colors-container">
                <button className="ages-color-4" disabled aria-label="ageBtn4">
                  above 60
                </button>
                <p>above 60</p>
              </div>
            </div>
          </div>
          <div className="pie-container">
            <p>Vaccination By Doses</p>
            {this.pieChartByDose()}
            <div className="row-alignment pie-2">
              <div className="label-colors-container">
                <button className="ages-color-1" disabled aria-label="ageBtn5">
                  covishield
                </button>
                <p>covishield</p>
              </div>
              <div className="label-colors-container">
                <button className="ages-color-2" disabled aria-label="ageBtn6">
                  covaxin
                </button>
                <p>covaxin</p>
              </div>
              <div className="label-colors-container">
                <button className="ages-color-3" disabled aria-label="ageBtn7">
                  sputnik
                </button>
                <p>sputnik</p>
              </div>
            </div>
          </div>
        </div>
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

export default Vaccination
