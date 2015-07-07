import React from 'react';
import Link from './../../components/huge_link/huge_link';

const main = 'dashboard__navigation-region';

class NavigationRegion extends React.Component {
  render() {
    return (
      <div className={main}>
        <Link to={'naming-guidelines'} label={'Naming Guidelines'} />
        <Link to={'approved-names'} label={'Approved Names'} />
        <Link to={'create-request'} label={'Request a Name'} />
        <Link to={'requests'} label={'My Request'} />
        <Link to={'reviews'} label={'My Reviews'} />
        <Link to={'reports'} label={'Reports'} />
      </div>
    );
  }
}

export default NavigationRegion;
