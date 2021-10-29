import React from 'react';
import NavBar from './NavBar';
import { Container } from 'semantic-ui-react';
import { Route } from 'react-router';
import PlaceDashboard from '../../features/places/dashboard/PlaceDashboard';
import { observer } from 'mobx-react-lite';
import PlaceDetails from '../../features/places/details/PlaceDetails';
import PlaceForm from '../../features/places/form/PlaceForm';

import 'react-calendar/dist/Calendar.css';
import TestErrors from '../../features/errors/TestError';

function App() {
  return (
    <>
      <NavBar />
      <Container style={{marginTop:'7em'}}>
      <Route exact path='/places' component={PlaceDashboard}/>
      <Route  path='/places/:id' component={PlaceDetails}/>
      <Route  path={['/createPlace','/manage/:id']} component={PlaceForm}/>
      <Route  path='/errors' component={TestErrors}/>


      </Container>
     
    </>
  );
}

export default observer(App);
