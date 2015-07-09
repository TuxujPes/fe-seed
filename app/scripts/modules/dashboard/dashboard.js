import React from 'react';
import NavigationRegion from './navigation_region';
import AtAGlance from './ataglance';
import MainMenu from './main_menu';

export default class DashboardPage extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <MainMenu />
        <div>asdfasdf</div>
        <div className="dashboard__overview">
          <div className="dashboard__overview__text">
            <h1 className="dashboard__overview__text__header">Welcome to the Naming Center</h1>
            <div className="dashboard__overview__text__content">
              <p className="dashboard__overview__text__content__item">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <p className="dashboard__overview__text__content__item">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </div>
          <div className="dashboard__bulletins">
            BULLETINBOARDDD
            BULLETINBOARDDDDaasdasdfasdf
          </div>
        </div>
        <NavigationRegion />
        <AtAGlance />
      </div>
    );
  }
}
