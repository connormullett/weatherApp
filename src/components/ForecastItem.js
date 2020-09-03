import React, { Component } from 'react'

export class ForecastItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data
        }
    }

    formatDateTime = (datetime) => {
        var now = new Date(datetime * 1000);
        var date = [ now.getMonth() + 1, now.getDate() ];
        var time = [ now.getHours(), now.getMinutes() ];
        var suffix = ( time[0] < 12 ) ? "AM" : "PM";
        time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
        time[0] = time[0] || 12;

        for ( var i = 1; i < 3; i++ ) {
            if ( time[i] < 10 ) time[i] = "0" + time[i];
        }
  
        return date.join("/") + " " + time.join(":") + " " + suffix;
    }
    
    render() {
        const {temp, feels_like, humidity} = this.state.data.main;
        const datetime = this.state.data.dt;
        const description = this.state.data.weather[0].description;

        return (
            <React.Fragment>
            <td>{this.formatDateTime(datetime)}</td>
            <td>{temp}</td>
            <td>{feels_like}</td>
            <td>{humidity}</td>
            <td>{description}</td>
            </React.Fragment>
        )
    }
}

export default ForecastItem
