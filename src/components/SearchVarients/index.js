import {BiChevronRightSquare} from 'react-icons/bi'

import './index.css'

const SearchVarients = props => {
  const {stateDetails, selectedStateId} = props
  const {stateCode, name} = stateDetails

  const onClickStateBtn = () => {
    selectedStateId(stateCode, name)
  }

  return (
    <li className="searchResults-list-item" onClick={onClickStateBtn}>
      <p>{name}</p>
      <button className="arrow-btn" onClick={onClickStateBtn}>
        <p>{stateCode}</p>
        <BiChevronRightSquare />
      </button>
    </li>
  )
}

export default SearchVarients
