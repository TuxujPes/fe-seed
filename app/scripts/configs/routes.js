import React from 'react';
import {Route, DefaultRoute} from 'react-router';
import IndexPage from './../modules/index';
import AboutPage from './../modules/about';
import WizardSteps from './../modules/wizard_steps/wizard_steps';

export default (
  <Route path="/" handler={IndexPage} >
    <Route path="/" handler={WizardSteps}/>
    <DefaultRoute handler={AboutPage}/>
  </Route>
);
