/*Route component of the application */
import React, { Component } from 'react';
  //import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import saComponent from './saComponent.js';
import logo from './logo.svg';
import './App.css';

//Routing component of the app - route.js
function AppRouter(){  
    return(
      <Router>
          <div>
          <Switch>
          < Route exact path='/' component={saComponent} />
          < Route exact path='/assessment' component={saComponent} />
          </Switch>
          </div>
      </Router>
        )
    
}

//Main component of the app including header,footer and body
export default class App extends Component {
  render() {
    var marginTop = {"marginTop":50};
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Student Assessment Tool</h1>
        </header>
        <p className="App-intro">
          {/* <strong><u>Assessment</u></strong> */}
        </p>
        <AppRouter/>
        {/*<footer className="footer">
        <div className="row" style={marginTop}>
        <div className="col-lg-12 text-left">
        
        </div>
        </div>
    </footer>*/}
      </div>
    );
  }
}