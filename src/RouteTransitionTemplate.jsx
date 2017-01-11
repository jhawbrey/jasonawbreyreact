import React from 'react';
import { RouteTransition } from 'react-router-transition';

const RouteTransitionTemplate = (props) => (
    <RouteTransition
      component={false}
      className="transition-wrapper"
      pathname={props.location.pathname}
      {...props.preset}
    >
      {props.children}
    </RouteTransition>
);

export default RouteTransitionTemplate;
