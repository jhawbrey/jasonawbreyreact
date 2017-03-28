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
      let date_sort_asc = (date1, date2) => {
        let dt1 = new Date(date1);
        let dt2 = new Date(date2);
        if (dt1 > dt2) return 1;
        if (dt1 < dt2) return -1;
        return 0;
      };

      responseData.sort(date_sort_asc);

      let concerts = [];

      for (var i = 0; i < responseData.length; i++) {
        let cDate = new Date(responseData[i].timestamp);
        const today = new Date();
        if (cDate > today) {
          concerts.push(responseData[i]);
        }
      }
      this.setState({dates: concerts});
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
