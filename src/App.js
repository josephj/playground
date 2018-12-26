import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PureComponent from './pure-component';
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
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
