import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}

class Family extends Component {
  render() {
    return <div>Family</div>;
  }
}
