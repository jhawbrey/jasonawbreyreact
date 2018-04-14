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
    fetch('https://cdn.contentful.com/spaces/lfibhjwf8l76/entries?access_token=ac626e994db36e47fed21fc5d5b5c2019df79ac53a77d06ee13b3163ef7af3a0&content_type=organization')
    .then((response) => response.json())
    .then((responseData) => {
      let items = responseData.items;
      let date_sort_asc = (date1, date2) => {
        let dt1 = new Date(date1);
        let dt2 = new Date(date2);
        if (dt1 > dt2) return 1;
        if (dt1 < dt2) return -1;
        return 0;
      };

      items.sort(date_sort_asc);

      let concert = null;

      for (var i = 0; i < items.length; i++) {
        let cDate = new Date(items[i].fields.timestamp);
        const today = new Date();
        if (cDate > today) {
          concert = items[i].fields;
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
          <blockquote className="blockquote__recent">Elegantly <br />comanding</blockquote>
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
        <SoundPlayerContainer streamUrl='https://api.soundcloud.com/tracks/378472529/stream' clientId={clientId} className='group'>
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
                <p className="audio__title">Fantasia Christmas Carols<br />
                  <span className="audio__composer"><i>Ralph Vaughan Williams</i></span>
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
