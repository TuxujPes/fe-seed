import React from 'react';
import classNames from 'classnames';

// css classes
const stepsClass = 'named-steps';
const stepClass = stepsClass + '__item';
const stepClassActive = stepClass + '--active';

// list class
class NamedSteps extends React.Component {
  render() {
    let items = this.props.steps.map((step, idx) => {
      return (
        <NamedStep
          key={idx}
          current={this.props.current}
          index={idx}
          data={step} />
        );
    });

    return <ul className={stepsClass}>{items}</ul>;
  }
}
NamedSteps.propTypes = {
  steps: React.PropTypes.array,
  current: React.PropTypes.number
};

// item class
class NamedStep extends React.Component {
  render() {
    let classes = classNames({
      [stepClass]: true,
      [stepClassActive]: this.props.index === this.props.current
    });

    return (
      <div className={classes}>
        {this.props.index + 1}: {this.props.data.label}
      </div>
    );
  }
}
NamedStep.propTypes = {
  index: React.PropTypes.number,
  current: React.PropTypes.number,
  data: React.PropTypes.object
};

export default NamedSteps;
