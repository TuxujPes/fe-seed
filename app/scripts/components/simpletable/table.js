import React from 'react';

class Table extends React.Component {
  render() {
    let props = this.props;

    return (
      <div className="table">
        <ul className="table__header">
          <Row data={props.header} />
        </ul>
        <ul className="table__body">
          {props.data.map((row, idx) => <Row key={idx} data={row} />)}
        </ul>
      </div>
    );
  }
}
Table.propTypes = {
  header: React.PropTypes.object.isRequired,
  data: React.PropTypes.array.isRequired
};

class Row extends React.Component {
  render() {
    let cells = [];
    let data = this.props.data;

    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        cells.push(<Cell key={key} data={data[key]} />);
      }
    }

    return (
      <li className="table__row">
        <ul className="table__row-inner">
          {cells}
        </ul>
      </li>
    );
  }
}
Row.propTypes = {data: React.PropTypes.object.isRequired};

class Cell extends React.Component {
  render() {
    return (
      <li className="table__cell">
        <span className="table__cell__text">{this.props.data}</span>
      </li>
    );
  }
}
Cell.propTypes = {
  data: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array
  ])
};

export default Table;
