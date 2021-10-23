import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer( function PlaceList() {

    const {placeStore} = useStore();
    const {deletePlace,placesByDate} = placeStore;
    const [target, setTarget] = useState('');

    function handlePlaceDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);    
        deletePlace(id); 
    }   

    return (
        <Segment>
        <Item.Group divided>
        {placesByDate.map(place =>(
            <Item key={place.id}>
                <Item.Content>
                    <Item.Header as='a'>{place.name}</Item.Header>
                    <Item.Meta>{place.date}</Item.Meta>
                    <Item.Description>
                        <div>{place.description}</div>
                        <div>{place.country}, {place.city}, {place.continent}</div>
                    </Item.Description>
                    <Item.Extra>
                        <Button as={Link} to={`/places/${place.id}`} floated='right' content='View' color='blue'/>
                        
                        <Button 
                            name={place.id} 
                            
                            onClick={(e)=> handlePlaceDelete(e, place.id)} floated='right' content='delete' color='red'/>
                            <Label basic content={place.category}/>
                       
                        <Label basic content={place.category}/>
                    </Item.Extra>

                </Item.Content>
                </Item>
            ))}

        </Item.Group>
    </Segment>
    )
})
