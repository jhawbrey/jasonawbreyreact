import React, { Component } from 'react';
import RouteTransitionTemplate from '../../RouteTransitionTemplate';
import { presets } from 'react-router-transition';
import { SoundPlayerContainer } from 'react-soundplayer/addons';
import { PlayButton } from 'react-soundplayer/components';

import './home.css';
import '../../App.css';

const clientId = 'b66c8aeecc97de91f3ed3fa8b09d8d8c';

class Home extends Component {
  constructor(){
    super();
    this.state={
      date: []
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

      let concert = null;

      for (var i = 0; i < responseData.length; i++) {
        let cDate = new Date(responseData[i].timestamp);
        const today = new Date();
        console.log(cDate);
        if (cDate > today) {
          concert = responseData[i];
          break;
        }
      }
      this.setState({date: concert});
    })
    .catch((error) => {
      console.log('Error fetching and parsing data', error);
    });
  }

  render() {
    return (
      <RouteTransitionTemplate preset={presets.pop} {...this.props}>
        <div className="page">
          <section className="hero group">
            <div className="container">
              <img className="hero_img" src="./images/ja-bg.jpg" alt="Jason Awbrey" />
            </div>
          </section>

          <section className="callouts group">
            <div className="container">
              <NextConcert feed={this.state.date} />
              <FeaturedAudio/>
              <RecentMentions/>
            </div>
          </section>
        </div>
      </RouteTransitionTemplate>
    );
  }
}

class NextConcert extends Component {
  
  render() {
    const perf = this.props.feed;
    return (<div className="gridBox gridBox__meyerson-full">
      <div className="gridBox-overlay">
        <h2 className="title">Next<br />Concert</h2>
      {perf.date &&
        <div>
          <p className="gridBox__p">
          <i>{perf.date} @ {perf.time}</i><br />
          {perf.title} <br />
          {perf.organization}
          </p>
          <div className="cta__container">
            <a href={perf.map} target="_blank" className="cta-button button__light">View Map</a>
          </div>
        </div>
      }
      {this.props.feed.length === 0 &&
        <div>
          <p>
            <i>Check back soon for upcoming events.</i>
          </p>
          <div className="cta__container">
            <a href="/schedule" target="_blank" className="cta-button button__light">Past Events</a>
          </div>
        </div>
      }
      </div>
    </div>);
  }
}

class RecentMentions extends Component {
  render() {
    return (
      <div className="gridBox gridBox__messiah">
        <div className="gridBox-overlay">
          <h2 className="title">Recent<br />Mentions</h2>
          <blockquote className="blockquote__recent">Jason sang with heart rending beauty and sensitivity.</blockquote>
          <div className="cta__container">
            <a href="/about" className="cta-button button__light">See More</a>
          </div>
        </div>
      </div>
    )
  }
}

class FeaturedAudio extends Component {
  render() {
    return (
      <div className="gridBox gridBox__neruda recent__audio">
        <div className="gridBox-overlay">
          <h2 className="title">Featured<br />Audio</h2>
          <PlayerContainer />
        </div>
      </div>
    )
  }
}

class PlayerContainer extends Component {
  render() {
    return (
      <div>
        <SoundPlayerContainer streamUrl='https://api.soundcloud.com/tracks/320439670/stream' clientId={clientId} className='group'>
          <Player />
        </SoundPlayerContainer>
      </div>
    )

  }
}

class Player extends Component {
  stopPlay() {
      let { playing, soundCloudAudio } = this.props;
      if (playing) {
          soundCloudAudio.stop();
      }
  }
    render() {
        return (
            <div className="">
              <div className="flex-auto">
                <p className="audio__title">Chanson Romanesque<br />
                  <span className="audio__composer"><i>Maurice Ravel</i></span>
                </p>
              </div>
              <PlayButton className="button black btn-big button-outline button-grow bg-white circle" {...this.props} />
            </div>
        );
    }

    componentWillUnmount() {
      this.stopPlay();
    }
}

export default Home;
