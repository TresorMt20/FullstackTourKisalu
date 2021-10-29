import { format } from 'date-fns';
import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react'
import { Place } from '../../../app/models/place'
import { useStore } from '../../../app/stores/store';
interface Props {
    place: Place
}
export default function PlaceListItem({place}: Props) {

    const {placeStore} = useStore();
    const {deletePlace} = placeStore;
    const [target, setTarget] = useState('');

    function handlePlaceDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);    
       /* deletePlace(id); */
    }   

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png'/>
                        <Item.Content>
                            <Item.Header as={Link} to={`/places/${place.id}`}>
                                {place.name}
                            </Item.Header>
                            <Item.Description>Hosted by Bob</Item.Description>

                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock'/> 
                    <Icon name='marker'/>{place.city}   
                </span>
            </Segment>
            <Segment secondary>
                Visitor go here

            </Segment>
            <Segment clearing>
                <span>{place.description}</span>
                <Button
                as={Link}
                to={`/places/${place.id}`}
                color='teal'
                floated='right'
                content='View'
                />
            </Segment>

        </Segment.Group>
    )
}
