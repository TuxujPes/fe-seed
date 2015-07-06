import React from 'react';
import {RouteHandler} from 'react-router';

class IndexPage extends React.Component {
  render() {
    return (
      <div className="index-wrapper">
        <p>Main wrapper</p>
        <RouteHandler/>
      </div>
    );
  }
}

export default IndexPage;
