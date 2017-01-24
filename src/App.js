/* DEPENDENCIES */
import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-319662-4');

import './normalize.css';
import './App.css';


/* COMPONENTS */
import Home from './components/home/index';
import About from './components/about/index';
import Audio from './components/audio/index';
import Schedule from './components/schedule/index';
import Header from './components/header/index';
import Nav from './components/nav/index';
import Footer from './components/footer/index';

const NotFound = () => <h1>404.. This page is not found!</h1>

const Container = (props) => (
  <div id="outer-container" style={{height: '100%'}}>
    <Nav />
    <div className="App" id="page-wrap">
      <Header />
      {props.children}
      <Footer />
    </div>
  </div>
)

class App extends Component {
  render() {
    function fireTracking() {
      ReactGA.set({ page: window.location.pathname });
      ReactGA.pageview(window.location.pathname);
      console.log('pathname: '+ window.location.pathname);
    }

    return (
      <Router onUpdate={fireTracking} history={browserHistory}>
        <Route path='/' component={Container}>
          <IndexRoute component={Home} />
          <Route path='about' component={About} />
          <Route path='audio' component={Audio} />
          <Route path='Schedule' component={Schedule} />
          <Route path='*' component={NotFound} />
        </Route>
      </Router>
    );
  }
}

export default App;
