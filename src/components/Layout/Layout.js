import React, { Fragment } from'react';
import NavBar from '../UI/NavBar/NavBar';

const Layout = props => (
  <Fragment>
    <NavBar/>
    <main className='content'>
      {props.children}
    </main>
  </Fragment>
);

export default Layout;