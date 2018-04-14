import React, { Component } from 'react';
import RouteTransitionTemplate from '../../RouteTransitionTemplate';
import { presets } from 'react-router-transition';
import { SoundPlayerContainer } from 'react-soundplayer/addons';
import { PlayButton, Progress } from 'react-soundplayer/components';

import './audio.css';
import '../../App.css';

const clientId = 'b66c8aeecc97de91f3ed3fa8b09d8d8c';

class AudioList extends Component {
  constructor(){
    super();
    this.state={
      streams: []
    };
  }

  componentDidMount(){
    fetch('https://cdn.contentful.com/spaces/lfibhjwf8l76/entries?access_token=ac626e994db36e47fed21fc5d5b5c2019df79ac53a77d06ee13b3163ef7af3a0&content_type=audio')
    .then((response) => response.json())
    .then((responseData) => {
      let items = responseData.items;
      this.setState({streams: items});
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
            <h1 className="hero-title">Audio</h1>
          </div>
        </div>
          <div className="container group">
            <div className="schedule">
              <PlayerContainer feed={this.state.streams} className="group" />
            </div>
          </div>
        </div>
      </RouteTransitionTemplate>
    )
  }
}

class PlayerContainer extends Component {
  render() {
    const audioPlayer = this.props.feed.map((audio, i) => {
      return <SoundPlayerContainer streamUrl={audio.fields.url} clientId={clientId} key={i} className="group">
          <Player feed={audio} />
      </SoundPlayerContainer>
    });
    return (
      <div>
        {audioPlayer}
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
        let { currentTime, duration } = this.props;
        let info = this.props.feed;

        return (
            <div className="player__container p2 border mt1 mb3 flex flex-center rounded">
                <PlayButton className="flex-none h4 mr2 button white btn-big button-outline button-grow bg-black circle" {...this.props} />
                <div className="flex-auto">
                    <h2 className="h4 m0 trackTitle">{info ? info.fields.title : ''}</h2>
                    <p className="h5 m0 trackComposer">{info ? info.fields.description : ''}</p>
                    <Progress
                        className="mt1 mb1 rounded"
                        innerClassName="rounded-left"
                        value={(currentTime / duration) * 100 || 0}
                        {...this.props}
                    />
                </div>
            </div>
        );
    }

    componentWillUnmount() {
      this.stopPlay();
    }
}

export default AudioList;
