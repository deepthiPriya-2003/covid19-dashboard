import {Switch, Route} from 'react-router-dom'

import './App.css'
import Home from './components/Home'
import Header from './components/Header'
import About from './components/About'
import Vaccination from './components/Vaccination'
import StateCovidDetails from './components/StateSpecificDetails'
import NotFound from './components/NotFound'

const App = () => (
  <div className="app-bg-container">
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/vaccination" component={Vaccination} />
      <Route path="/state/:stateCode" component={StateCovidDetails} />

      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App
