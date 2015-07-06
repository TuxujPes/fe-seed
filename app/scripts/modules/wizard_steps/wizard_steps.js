import React from 'react';
import NamedSteps from '../../components/named_steps/named_steps';
import store from './wizard_store';
import actions from './wizard_actions';

class WizardSteps extends React.Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  componentDidMount() {
    store.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    store.unlisten(this.onChange.bind(this));
  }

  onChange(state) {
    this.setState(state);
  }

  getData() {
    actions.fetchSteps();
  }

  render() {
    return (
      <div>
        <button onClick={this.stepBack.bind(this)}>prev</button>
        <button onClick={this.getData.bind(this)}>fetch</button>
        <button onClick={this.stepForward.bind(this)}>fwd</button>
        <NamedSteps steps={this.state.steps} current={this.state.current}/>
      </div>
    );
  }

  stepBack() {
    actions.stepBack();
  }

  stepForward() {
    actions.stepForward();
  }
}

export default WizardSteps;
