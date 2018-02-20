import * as React from 'react'
import { Route, Switch } from 'react-router'
import { NavLink } from 'react-router-dom'
import About from './About'
import Main from './Main'
import BookDetails from './BookDetails'

export default class App extends React.Component {

  render () {
    return <div className="page">
      <nav>
        <ul>
          <li><NavLink exact={true} to="/" activeClassName="active">Home</NavLink></li>
          <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
        </ul>
      </nav>
      <div className="content">
        <Switch>
          <Route exact path="/" component={Main}/>
          <Route path="/about" component={About}/>
          <Route path="/book/:id" component={BookDetails}/>
        </Switch>
      </div>
    </div>
  }

}
