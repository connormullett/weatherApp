import React from 'react';
import './App.css';
import { geolocated } from 'react-geolocated';
import { Home } from './components/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Forecast from './components/Forecast';


class App extends React.Component {

  render() {
    return !this.props.isGeolocationAvailable ? (
      <div>
        <h1>Your browser does not support Geolocation, upgrade your browser</h1>
      </div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>
        <h1>Geolocation is not enabled, enable it to continue</h1>
      </div>
    ) : this.props.coords ? (
      <div>
        <Router>
          <Switch>
            <Route path="/forecast">
              <Forecast latitude={this.props.coords.latitude} longitude={this.props.coords.longitude}/>
            </Route>
            <Route>
              <Home latitude={this.props.coords.latitude} longitude={this.props.coords.longitude}/>
            </Route>
          </Switch>
        </Router>
      </div>
    ) : (
      <div>Getting location data&hellip; </div>
    )
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App);
