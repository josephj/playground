import React from 'react';
import Input from './Input';

export default class FunctionalComponentFocus extends React.Component {
    state = {
        values: {
            foo: 1, 
            bar: 2,
            zoo: 3
        }
    }
    handleChange =(id, val) => {
        const values = Object.assign({}, this.state.values);
        values[id] = val;
        this.setState({values});
    }
    render() {
        return (
            <div>
                <Input id="foo" value={this.state.values.foo} onChange={this.handleChange}/>
                <Input id="bar" value={this.state.values.bar} onChange={this.handleChange}/>
                <Input id="zoo" value={this.state.values.zoo} onChange={this.handleChange}/>
            </div>
        );
    }
}