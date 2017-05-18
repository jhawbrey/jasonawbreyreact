import React, {Component} from 'react';
import RouteTransitionTemplate from '../../RouteTransitionTemplate';
import { presets } from 'react-router-transition';

import './schedule.css';
import '../../App.css';

class Schedule extends Component {
  constructor(){
    super();
    this.state={
      dates: [],
      pastDates: []
    };
  }


  componentDidMount(){
    fetch('./schedule.json')
    .then((response) => response.json())
    .then((responseData) => {

      let concerts = [];
      let pastConcerts = [];

      for (var i = 0; i < responseData.length; i++) {
        let cDate = new Date(responseData[i].timestamp);
        const today = new Date();
        if (cDate > today) {
          concerts.push(responseData[i]);
        } else {
          pastConcerts.push(responseData[i]);
        }
      }


      pastConcerts.sort(function(a,b){
        return new Date(b.timestamp) - new Date(a.timestamp);
      });

      concerts.sort(function(a,b){
        return new Date(a.timestamp) - new Date(b.timestamp);
      });

      this.setState({dates: concerts, pastDates: pastConcerts});
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
            {this.state.dates.length > 0 &&
              <DateContainer feed={this.state.dates} />
            }
            {this.state.dates.length === 0 &&
              <h3>Check back soon for upcoming events.</h3>
            }
            </div>
            <div className="schedule">
              <h2 className="title">Past Engagements</h2>
              <PastContainer feed={this.state.pastDates} />
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

class PastContainer extends Component {

  render() {
    const performance = this.props.feed.map((perf, i) => {
      return <div className="dateBox group past" key={i}>
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
