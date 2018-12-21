import React, { Component } from 'react';
import './App.css';
import Router from "./Router";


class App extends Component {
    constructor(props) {
        super(props);
        this.state={
            course:{}
        }
    }

    changeTargetCourse = (course) => {
        this.setState({course})
    };

    render() {
    return (
      <Router state={this.state} change={this.changeTargetCourse}/>
    );
  }
}

export default App;
