import React from 'react';

class Table extends React.Component {
  render() {
    let data = this.props.data;
    let headers = Object.keys(data[0]).map((header, idx) => <span key={idx}>{header}</span>);
    let rows = data.map((row, idx) => <li><Row key={idx} data={row} /></li>);

    return (
      <div>
        <h3>TABLE</h3>
        <div>{headers}</div>
        <ul>
          {rows}
        </ul>
      </div>
    );
  }
}
Table.propTypes = {data: React.PropTypes.array.isRequired};

class Row extends React.Component {
  render() {
    let cells = [];
    let data = this.props.data;

    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        cells.push(<li><Cell key={key} data={data[key]} /></li>);
      }
    }

    return (
      <ul>
        {cells}
      </ul>
    );
  }
}
Row.propTypes = {data: React.PropTypes.object.isRequired};

class Cell extends React.Component {
  render() {
    return <span>{this.props.data}</span>;
  }
}
Cell.propTypes = {
  data: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array
  ])
};

export default Table;
