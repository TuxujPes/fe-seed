import React from 'react';
import {Route, Redirect} from 'react-router';
import IndexPage from './../modules/index';
import Dashboard from './../modules/dashboard/dashboard';
import NamingGuidelines from './../modules/naming_guidelines/naming_guidelines';
import ApprovedNames from './../modules/approved_names/approved_names';
import CreateRequest from './../modules/create_request/create_request';
import Requests from './../modules/requests/requests';
import Reviews from './../modules/reviews/reviews';
import Reports from './../modules/reports/reports';

export default (
  <Route path="/" handler={IndexPage} >
    <Route name="dashboard" path="/dashboard" handler={Dashboard} />
    <Route name="naming-guidelines" path="/naming-guidelines" handler={NamingGuidelines} />
    <Route name="approved-names" path="/approved-names" handler={ApprovedNames} />
    <Route name="create-request" path="/create-request" handler={CreateRequest} />
    <Route name="requests" path="/requests" handler={Requests} />
    <Route name="reviews" path="/reviews" handler={Reviews} />
    <Route name="reports" path="/reports" handler={Reports} />
    <Redirect from="*" to="dashboard" />
  </Route>
);
