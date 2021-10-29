import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { useStore } from '../../../app/stores/store'
import PlaceFilters from './PlaceFilters'
import PlaceList from './PlaceList'

export default observer( function PlaceDashboard() {

    const {placeStore} = useStore(); 
    const {loadPlaces, placeRegistry} = placeStore;

    useEffect(() => {
      if(placeRegistry.size === 0) loadPlaces();
    }, [placeRegistry.size, loadPlaces])

    if(placeStore.loadingInitial) return <LoadingComponent content='Loading app'/>


    return (
        <Grid>
            <Grid.Column width='10'>
                    <PlaceList
                    />
            </Grid.Column>
            <Grid.Column width='6'>
                <PlaceFilters/>

            </Grid.Column>
        </Grid>
    )
})
