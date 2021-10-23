import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'
import PlaceList from './PlaceList'

export default observer( function PlaceDashboard() {

    const {placeStore} = useStore(); 
    const {loadPlaces, placeRegistry} = placeStore;

    useEffect(() => {
      if(placeRegistry.size === 0) loadPlaces();
    }, [placeRegistry.size, loadPlaces])


    return (
        <Grid>
            <Grid.Column width='10'>
                    <PlaceList
                    />
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Activity filters</h2>

            </Grid.Column>
        </Grid>
    )
})
