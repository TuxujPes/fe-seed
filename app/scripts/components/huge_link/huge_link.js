import React from 'react';
import {Link} from 'react-router';

const mainClass = 'huge-link';

class HugeLink extends React.Component {
  render() {
    return (
      <div className={mainClass}>
        <Link to={this.props.to}>{this.props.label}</Link>
      </div>
    );
  }
}
HugeLink.propTypes = {
  to: React.PropTypes.string,
  label: React.PropTypes.string
};

export default HugeLink;
