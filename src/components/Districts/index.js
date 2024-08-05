import './index.css'

const TopDistricts = props => {
  const {districtsDetails, selectedCount} = props

  const {name, confirmed, recovered, deceased, active} = districtsDetails
  // const active = confirmed - (recovered + deceased)

  let countValue = 0
  if (selectedCount === 'confirmed') {
    countValue = confirmed
  } else if (selectedCount === 'active') {
    countValue = active
  } else if (selectedCount === 'recovered') {
    countValue = recovered
  } else if (selectedCount === 'deceased') {
    countValue = deceased
  }
  // console.log(countValue)

  return (
    <li className="top-districts-list-item">
      <p className="count-value">{countValue}</p>
      <p>{name}</p>
    </li>
  )
}

export default TopDistricts
