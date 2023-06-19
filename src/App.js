import {Component} from 'react'
// import Loader from 'react-loader-spinner'
import Category from './components/Category'

import './App.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

class App extends Component {
  state = {status: 'initail', projectData: [], category: categoriesList[0].id}

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {
    const {category} = this.state
    this.setState({status: 'inProgress'})
    const response = await fetch(
      `https://apis.ccbp.in/ps/projects?category=${category}`,
    )
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()

      const formattedData = data.projects.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
      }))
      this.setState({status: 'success', projectData: formattedData})
    } else {
      this.setState({status: 'failure'})
    }
  }

  restartApi = () => {
    this.getData()
  }

  successView = () => {
    const {projectData} = this.state
    return (
      <ul className="project-list-container">
        {projectData.map(each => (
          <Category each={each} key={each.id} />
        ))}
      </ul>
    )
  }

  failureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
        className="failure"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" className="custom-btn" onClick={this.restartApi}>
        Retry
      </button>
    </div>
  )

  loadingView = () => (
    <div data-testid=" loader">
      {/* <Loader type="dots" color="#00BFFF" height={50} width={50} /> */}
      <p>Loading...</p>
    </div>
  )

  onChangeHandler = e => {
    this.setState({category: e.target.value}, this.getData)
  }

  renderedData = () => {
    const {status} = this.state

    switch (status) {
      case 'success':
        return this.successView()
      case 'failure':
        return this.failureView()
      case 'inProgress':
        return this.loadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <nav className="navbar">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png "
            alt="website logo"
          />
        </nav>

        <div className="project-container">
          <select className="select-container" onChange={this.onChangeHandler}>
            {categoriesList.map(each => (
              <option value={each.id} key={each.id}>
                {each.displayText}
              </option>
            ))}
          </select>
          {this.renderedData()}
        </div>
      </div>
    )
  }
}

export default App
