import './index.css'

const NotFound = props => {
  const onClickHomeBtn = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <div className="notFound-page-bg-container">
      <img
        src="https://res.cloudinary.com/dpj5lzzyz/image/upload/v1720013374/Group_7484_vugize.svg"
        alt="not-found-pic"
      />
      <h1>PAGE NOT FOUND</h1>
      <p>
        we are sorry, the page you requested could not be found <br />
        Please go back to the homepage
      </p>
      <button
        type="button"
        onClick={onClickHomeBtn}
        className="home-page-button"
      >
        Home
      </button>
    </div>
  )
}

export default NotFound
