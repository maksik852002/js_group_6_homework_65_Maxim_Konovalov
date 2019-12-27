import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import MainPage from './containers/MainPage/MainPage';
import EditingForm from './containers/EditingForm/EditingForm';
import './bootstrap.min.css';

const App = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route path='/' exact component={MainPage}/>
        <Route path='/pages/admin' component={EditingForm}/>
        <Route path='/pages/main' component={MainPage}/>
        <Route path='/pages/projects' component={MainPage}/>
        <Route path='/pages/services' component={MainPage}/>
        <Route path='/pages/about' component={MainPage}/>
        <Route path='/pages/contacts' component={MainPage}/>
        <Route render={() => <h1>Not found</h1>}/>
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default App;