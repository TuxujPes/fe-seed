import flux from '../../utilities/flux';
import actions from './wizard_actions';

class WizardStore {
  constructor() {
    this.steps = [];
    this.current = 0;
    this.bindActions(actions);
    this.dispatcher.register(payload => console.log(payload));
  }

  onFetchSteps(steps) {
    this.setState({steps: steps});
  }

  onStepForward() {
    this.setState({current: ++this.current});
  }

  onStepBack() {
    this.setState({current: --this.current});
  }
}

export default flux.createStore(WizardStore, 'WizardStore');
