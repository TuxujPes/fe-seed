import React from 'react';
import Router from 'react-router';
import routes from './configs/routes';

Router.run(routes, function onRootChange(Root) {
  React.render(<Root />, document.getElementById('app'));
});
