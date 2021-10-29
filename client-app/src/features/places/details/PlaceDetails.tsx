import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Card, Grid, Image } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import PlaceDetailedChat from './PlaceDetailedChat';
import PlaceDetailedHeader from './PlaceDetailedHeader';
import PlaceDetailedInfo from './PlaceDetailedInfo';
import PlaceDetailedSideBar from './PlaceDetailedSideBar';

export default observer( function PlaceDetails() {

    const {placeStore} = useStore();
    const {selectedPlace: place,loadPlace} = placeStore;
    const {id} = useParams<{id:string}>();

    useEffect(() =>{
      if(id) loadPlace(id);
    }, [id,loadPlace]);

    return (
          <Grid>
            <Grid.Column width={10}>
              <PlaceDetailedHeader place={place!}/>
              <PlaceDetailedInfo place={place!}/>
              <PlaceDetailedChat/>

            </Grid.Column>
            <Grid.Column width={6}>
              <PlaceDetailedSideBar/>
            </Grid.Column>
          </Grid>
    )
})
