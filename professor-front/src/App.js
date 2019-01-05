import React, { Component } from 'react';
import './App.css';
import Router from "./Router";


class App extends Component {
    constructor(props) {
        super(props);
        this.state={
            course:{},
            session: {},
            students: []
        }
    }

    changeTargetCourse = (course) => {
        this.setState({course})
    };

    changeSessionData = (session,students) => {
        this.setState({session,students})
    };

    render() {
    return (
      <Router state={this.state} change={this.changeTargetCourse} changeSession={this.changeSessionData}/>
    );
  }
}

export default App;
