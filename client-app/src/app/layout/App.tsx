import React, { useEffect } from 'react';
import NavBar from './NavBar';
import { Container, ModalContent } from 'semantic-ui-react';
import { Route } from 'react-router';
import PlaceDashboard from '../../features/places/dashboard/PlaceDashboard';
import { observer } from 'mobx-react-lite';
import PlaceDetails from '../../features/places/details/PlaceDetails';
import PlaceForm from '../../features/places/form/PlaceForm';

import 'react-calendar/dist/Calendar.css';
import TestErrors from '../../features/errors/TestError';
import HomePage from '../../features/home/HomePage';
import LoginForm from '../../features/users/LoginForm';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import ModalContainer from '../common/modals/ModalContainer';

function App() {

  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
     // userStore.getFacebookLoginStatus().then(() => commonStore.setAppLoaded());
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />

  return (
  
      <>
      <ModalContainer />
      <Route exact path='/' component={HomePage}/>
      <Route
      path={'/(.+)'}
      render={() =>(
        <>
        <NavBar />
        <Container style={{marginTop:'7em'}}>
          <Route exact path='/places' component={PlaceDashboard}/>

          <Route  path='/places/:id' component={PlaceDetails}/>
          <Route   path={['/createPlace','/manage/:id']} component={PlaceForm}/>
          <Route  path='/errors' component={TestErrors}/>
        </Container>
        </> 
      )}

      />
      </>
  );
}

export default observer(App);
