import React from 'react';
import Tabs from 'react-simpletabs';
import {Link} from 'react-router';
import titlesMap from './../../configs/request_table_titles_map';
import Table from './../../components/simpletable/table';
import agent from './../../utilities/agent';

// TODO: move pane & link titles to configs
// TODO: move ajax to flux

export default class AtAGlance extends React.Component {
  constructor() {
    super();

    this.state = {data: []};
    agent.get('/api/reqrev')
      .then(res => this.setState({data: res.data}));
  }

  render() {
    let tabs = this.state.data.map((section, idx) => {
      let headerData = Object.keys(section.data[0])
        .reduce(((mem, key) => {
          mem[key] = titlesMap[key];
          return mem;
        }), {});

      return (
        <Tabs.Panel key={idx} title={'My ' + section.type}>
          <Table header={headerData} data={section.data} />
          <div className="view-all-link">
            <Link to={section.type}>{'View all ' + section.type}</Link>
          </div>
        </Tabs.Panel>
      );
    });

    return (
      <div className="ataglance-region">
        <Tabs>{tabs}</Tabs>
      </div>
    );
  }
}
