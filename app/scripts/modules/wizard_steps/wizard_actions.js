import flux from '../../utilities/flux';
import agent from '../../utilities/agent';

class WizardActions {
  fetchSteps() {
    setTimeout(function waitabit() {
      agent.get('/api/wizard_steps')
        .then(function updateSteps(res) {
          this.dispatch(res.data);
        }.bind(this));
    }.bind(this), 1000);
  }

  stepForward() {
    this.dispatch();
  }

  stepBack() {
    this.dispatch();
  }
}

export default flux.createActions(WizardActions);
