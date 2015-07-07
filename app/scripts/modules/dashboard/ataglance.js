import React from 'react';
import Tabs from 'react-simpletabs';
import {Link} from 'react-router';
import Table from './../../components/simpletable/simpletable';
import agent from './../../utilities/agent';

export default class AtAGlance extends React.Component {
  constructor() {
    super();

    this.state = {data: []};
    agent.get('/api/reqrev')
      .then(res => this.setState({data: res.data}));
  }

  render() {
    let tabs = this.state.data.map((section, idx) => {
      return (
        <Tabs.Panel key={idx} title={'My ' + section.type}>
          <Table data={section.data} />
          <Link to={section.type}>{'View all ' + section.type}</Link>
        </Tabs.Panel>
      );
    });

    return (
      <Tabs>
        {tabs}
      </Tabs>
    );
  }
}
