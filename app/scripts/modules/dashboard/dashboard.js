import React from 'react';
import Tabs from 'react-simpletabs';
import Link from './../../components/huge_link/huge_link';

const main = 'dashboard';
const overviewRegion = main + '__overview-region';
const overview = main + '__overview';
const header = main + '__header';
const infoWrapper = main + '__info';
const infoParagraph = infoWrapper + '__paragraph';
const bulletinBoard = 'bulletin-board';
const dashboardNavigationRegion = main + '__navigation-region';

export default class DashboardPage extends React.Component {
  render() {
    return (
      <div className={main}>
        <div className={overviewRegion}>
          <div className={overview}>
            <h2 className={header}>Welcome to the Naming Center</h2>
            <div className={infoWrapper}>
              <p className={infoParagraph}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <p className={infoParagraph}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </div>
          <div className={bulletinBoard}>
            BULLETINBOARD
          </div>
        </div>
        <div className={dashboardNavigationRegion}>
          <Link to={'naming-guidelines'} label={'Naming Guidelines'} />
          <Link to={'approved-names'} label={'Approved Names'} />
          <Link to={'create-request'} label={'Request a Name'} />
          <Link to={'requests'} label={'My Request'} />
          <Link to={'reviews'} label={'My Reviews'} />
          <Link to={'reports'} label={'Reports'} />
        </div>
        <div>
          <Tabs>
            <Tabs.Panel title='first one'>
              <h2>FIRST</h2>
            </Tabs.Panel>
            <Tabs.Panel title='second one'>
              <h2>SECOND</h2>
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    );
  }
}
