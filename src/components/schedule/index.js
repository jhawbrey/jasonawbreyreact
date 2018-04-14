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
    fetch('https://cdn.contentful.com/spaces/lfibhjwf8l76/entries?access_token=ac626e994db36e47fed21fc5d5b5c2019df79ac53a77d06ee13b3163ef7af3a0&content_type=organization')
    .then((response) => response.json())
    .then((responseData) => {

      let concerts = [];
      let pastConcerts = [];
      let items = responseData.items;
      console.log(items);

      for (var i = 0; i < items.length; i++) {
        let cDate = new Date(items[i].fields.timestamp);
        const today = new Date();
        if (cDate > today) {
          concerts.push(items[i]);
        } else {
          pastConcerts.push(items[i]);
        }
      }


      pastConcerts.sort(function(a,b){
        return new Date(b.fields.timestamp) - new Date(a.fields.timestamp);
      });

      concerts.sort(function(a,b){
        return new Date(a.fields.timestamp) - new Date(b.fields.timestamp);
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
        <div className="dateBox_date">{perf.fields.date}<br /><i>{perf.fields.time}</i></div>
        <div className="dateBox_perfDetails">
        <span className="perfDetail perfOrg">{perf.fields.organization}</span>
          <span className="perfDetail perfOrg">{perf.fields.title}</span>
          <span className="perfDetail perfVenue">{perf.fields.venue}</span>
          <span className="perfDetail perfCitySt"><i>{perf.fields.city}, {perf.fields.state}</i></span>
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
        <div className="dateBox_date">{perf.fields.date}<br /><i>{perf.fields.time}</i></div>
        <div className="dateBox_perfDetails">
        <span className="perfDetail perfOrg">{perf.fields.organization}</span>
          <span className="perfDetail perfOrg">{perf.fields.title}</span>
          <span className="perfDetail perfVenue">{perf.fields.venue}</span>
          <span className="perfDetail perfCitySt"><i>{perf.fields.city}, {perf.fields.state}</i></span>
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
