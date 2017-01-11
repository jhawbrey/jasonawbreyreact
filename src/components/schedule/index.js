 import React, {Component} from 'react';
import RouteTransitionTemplate from '../../RouteTransitionTemplate';
import { presets } from 'react-router-transition';

import './schedule.css';
import '../../App.css';

class Schedule extends Component {
  constructor(){
    super();
    this.state={
      dates: []
    };
  }

  componentDidMount(){
    fetch('./schedule.json')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({dates: responseData});
    })
    .catch((error) => {
      console.log('Error fetching and parsing data', error);
    });
  }

  render() {
    return (
      <RouteTransitionTemplate preset={presets.slideLeft} {...this.props}>
        <div className="page">
          <div className="hero__small">
            <div className="container">
              <h1 className="hero-title">Schedule</h1>
            </div>
          </div>
          <div className="container">
            <div className="schedule">

              <DateContainer feed={this.state.dates} />
            </div>
          </div>
        </div>
      </RouteTransitionTemplate>
    )
  }
}

class DateContainer extends Component {
  render() {
    const performance = this.props.feed.map((perf, i) => {
      return <div className="dateBox group" key={i}>
        <div className="dateBox_date">{perf.date}<br /><i>{perf.time}</i></div>
        <div className="dateBox_perfDetails">
          <span className="perfDetail perfOrg">{perf.organization}</span>
          <span className="perfDetail perfVenue">{perf.venue}</span>
          <span className="perfDetail perfCitySt"><i>{perf.city}, {perf.state}</i></span>
        </div>
      </div>
    });
    return (
      <div>
        {performance}
      </div>
    )

  }
}

export default Schedule;
