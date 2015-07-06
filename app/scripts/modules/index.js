import React from 'react';
import {RouteHandler} from 'react-router';

class IndexPage extends React.Component {
  render() {
    return (
      <div>
        <p>index.js file</p>
        <RouteHandler/>
      </div>
    );
  }
}

export default IndexPage;
