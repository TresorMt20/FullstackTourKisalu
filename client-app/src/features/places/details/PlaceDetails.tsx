import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';

export default observer( function PlaceDetails() {

    const {placeStore} = useStore();
    const {selectedPlace: place,loadPlace} = placeStore;
    const {id} = useParams<{id:string}>();

    useEffect(() =>{
      if(id) loadPlace(id);
    }, [id,loadPlace]);

    return (
          <Card fluid>
      
              <Card.Content>
                <Card.Header>{place?.name}</Card.Header>
                <Card.Meta>
                  <span >{place?.date}</span>
                </Card.Meta>
                <Card.Description>
                  {place?.description}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button.Group widths='2'>
                <Button as={Link} to={`/manage/${place?.id}`} basic color='blue' content='Edit'/>
                <Button as={Link} to={'/places'} basic color='grey' content='Cancel'/>

                </Button.Group>
              </Card.Content>
    </Card>
    )
})
