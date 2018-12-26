import React, { Component, PureComponent } from 'react';

export default class Parent extends PureComponent {
  state = {
    message: 'Empty'
  };
  handleChange = val => {
    this.setState({ message: 'This is ' + val });
  };
  render() {
    return (
      <div>
        {this.state.message}
        <Child onChange={this.handleChange} />
      </div>
    );
  }
}

class Child extends Component {
  state = {
    url: ''
  };
  componentWillMount() {}
  handleChange = () => {
    const { onChange } = this.props;
    fetch('https://api.thedogapi.com/v1/images/search')
      .then(response => response.json())
      .then(data => {
        const url = data[0].url;
        this.setState({ url });
        onChange(url);
      });
  };
  render() {
    const { url } = this.state;

    return (
      <div>
        url: {url}
        <br />
        <button onClick={this.handleChange}>Change</button>
      </div>
    );
  }
}
