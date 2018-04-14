import React, {Component} from 'react';
import RouteTransitionTemplate from '../../RouteTransitionTemplate';
import { presets } from 'react-router-transition';

import './about.css';
import '../../App.css';

class About extends Component {
  constructor(){
    super();
    this.state={
      quotes: []
    };
  }
  componentDidMount(){
    fetch('https://cdn.contentful.com/spaces/lfibhjwf8l76/entries?access_token=ac626e994db36e47fed21fc5d5b5c2019df79ac53a77d06ee13b3163ef7af3a0&content_type=reviews')
    .then((response) => response.json())
    .then((responseData) => {
      let items = responseData.items;
      this.setState({quotes: items});
    })
    .catch((error) => {
      console.log('Error fetching and parsing data', error);
    });
    
    fetch('https://cdn.contentful.com/spaces/lfibhjwf8l76/entries?access_token=ac626e994db36e47fed21fc5d5b5c2019df79ac53a77d06ee13b3163ef7af3a0&content_type=bio')
    .then((response) => response.json())
    .then((responseData) => {
      let bio = responseData.items;
      this.setState({bio: bio[0].fields.bio});
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
            <h1 className="hero-title">About</h1>
          </div>
        </div>
          <div className="container">
            <div className="about group">
            <img className="head_img" src="./images/jason-sq.jpg" alt="Jason Awbrey" />
              <div className="copy">
                <span dangerouslySetInnerHTML={{__html: this.state.bio}} />

                <div className="quotes">
                  <h2 className="title">Press</h2>
                  <QuoteList feed={this.state.quotes} />
                </div>
              </div>

            </div>
          </div>
        </div>
      </RouteTransitionTemplate>
    )
  }
}

class QuoteList extends Component {
  render() {
    const quote = this.props.feed.map((stream, i) => {
      return <blockquote className="container--quote"><span>{stream.fields.quote}<br /><cite>{stream.fields.cite}</cite></span></blockquote>
    });
    return (
      <div>
        {quote}
      </div>
    )
  }
}


export default About;
