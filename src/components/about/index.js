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
    fetch('./quotes.json')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({quotes: responseData});
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
                <p>Heralded as having “one of the most gorgeous baritones on earth” by The Dallas Morning News, baritone Jason Awbrey is a highly sought after professional soloist and choral artist. His lyric voice has garnered critical acclaim for his performances of literature ranging from the early Renaissance period through the 21th century. In a recent recital of German lieder with Voces Intimae, Scott Cantrell of The Dallas Morning News states “everything sounded so easy, so natural” and “[it] was sheer magic.” He has performed with professional ensembles throughout the United States, Mexico, and Europe, including Ars Lyrica of Houston, the Grammy<sup>&reg;</sup> award-winning ensemble Conspirare, Dallas Bach Society, Dallas Symphony, Northeast Symphony, The Orchestra of New Spain, Orpheus Chamber Singers, Rapides Symphony Orchestra, San Antonio Symphony, Santa Fe Desert Chorale, Texas Camerata and Vox Humana. Jason has recorded with Vox Humana on the Naxos label, Orpheus Chamber Singers, and Conspirare on the Harmonia Mundi label.</p>
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
      return <blockquote className="container--quote"><span>{stream.quote}<br /><cite>{stream.cite}</cite></span></blockquote>
    });
    return (
      <div>
        {quote}
      </div>
    )
  }
}


export default About;
