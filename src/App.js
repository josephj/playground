import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PureComponent from './pure-component';
import FunctionalComponentFocus from './functional-component-focus';
import List from './react-simple-list';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route
              exact
              path="/pure-component"
              render={props => <PureComponent {...props} />}
            />
            <Route
              exact
              path="/functional-component-focus"
              render={props => <FunctionalComponentFocus {...props} />}
            />
            <Route exact path="/list" render={props => <List {...props} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
