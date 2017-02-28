import React, { Component } from 'react';
import RouteTransitionTemplate from '../../RouteTransitionTemplate';
import { presets } from 'react-router-transition';
import { SoundPlayerContainer } from 'react-soundplayer/addons';
import { PlayButton } from 'react-soundplayer/components';

import './home.css';
import '../../App.css';

const clientId = 'b66c8aeecc97de91f3ed3fa8b09d8d8c';

class Home extends Component {
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
              <NextConcert />
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
    return (
      <div className="gridBox gridBox__meyerson-full">
        <div className="gridBox-overlay">
          <h2 className="title">Next<br />Concert</h2>

          <p className="gridBox__p">
          <i>Apr 2 @ 3:00pm</i><br />
          Roomful of Teeth <br />
          University of Chicago
          </p>
          <div className="cta__container">
            <a href="https://goo.gl/maps/JobD8wES3rD2" target="_blank" className="cta-button button__light">View Map</a>
          </div>
        </div>
      </div>
    )
  }
}

class RecentMentions extends Component {
  render() {
    return (
      <div className="gridBox gridBox__messiah">
        <div className="gridBox-overlay">
          <h2 className="title">Recent<br />Mentions</h2>
          <p className="gridBox__p">
          <blockquote className="blockquote__recent">Jason sang with heart rending beauty and sensitivity.</blockquote>
          </p>
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
        <SoundPlayerContainer resolveUrl='https://soundcloud.com/jason-awbrey/beethoven-an-die-ferne' clientId={clientId} className="group">
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
        let { track } = this.props;

        return (
            <div className="">
              <div className="flex-auto">
                <p className="audio__title">{track ? track.title : ''}<br />
                  <span className="audio__composer">{track ? track.description : ''}</span>
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
