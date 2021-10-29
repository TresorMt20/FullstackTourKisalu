import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
import { Header, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import PlaceListItem from './PlaceListItem';

export default observer( function PlaceList() {

    const {placeStore} = useStore();
    const {groupedPlaces} = placeStore;

    return (

        <>
        {groupedPlaces.map(([group,places]) => (
            <Fragment key={group}>
                <Header sub color='teal'> 
                {group}

                </Header>
                
        {places.map(place =>(
            <PlaceListItem key={place.id} place={place} />
            ))}

            </Fragment>
        ))}
        </>
        
    )
})
