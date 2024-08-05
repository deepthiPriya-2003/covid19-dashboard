import './index.css'

const StateWiseCovidDetails = props => {
  const {stateData} = props
  // console.log(stateData)
  const {
    active,
    tested,
    stateCode,
    recovered,
    deceased,
    population,
    name,
    confirmed,
  } = stateData

  return (
    <li className="state-wise-details-bg-container">
      <p className="state-name">{name}</p>
      <p className="confirmed-cases-count margin">{confirmed}</p>
      <p className="active-cases-count margin">{active}</p>
      <p className="recovered-cases-count margin">{recovered}</p>
      <p className="deceased-cases-count margin">{deceased}</p>
      <p className="population-cases-count margin">{population}</p>
    </li>
  )
}

export default StateWiseCovidDetails
