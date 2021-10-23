import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Segment } from 'semantic-ui-react'
import { useHistory, useParams } from 'react-router';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';

export default function PlaceForm() {
    const history = useHistory();
    const {placeStore} = useStore();
    const {createPlace,loadPlace,updatePlace} = placeStore;

    const {id} = useParams<{id: string}>();

    const [place,setPlace]= useState({
        id: '',
        name:'',
        category:'',
        description:'',
        date:'',
        city:'',
        country:'',
        continent:''
    });

    useEffect(() => {
        if(id) loadPlace(id).then(place => setPlace(place!))
    }, [id, loadPlace]);

    function handleSumit(){
        if( place.id.length <= 1 ){
            let newPlace ={
                ...place,
                id: uuid()
            };
            createPlace(newPlace).then(() => history.push(`/places/${newPlace.id}`))
        } else{
            updatePlace(place).then(() => history.push(`/places/${place.id}`))
        }
     }
  
     function handleInputChnage(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
         const {name,value} =event.target;
         setPlace({...place, [name]: value})
  
     }
    return (
        <Segment clearing>
        <Form onSubmit={handleSumit} autocompete='off'>
        <Form.Input placeholder='Name' value={place.name} name='name' onChange={handleInputChnage}/>
        <Form.TextArea placeholder='Description' value={place.description} name='description' onChange={handleInputChnage}/>
        <Form.Input placeholder='Category' value={place.category} name='category' onChange={handleInputChnage}/>
        <Form.Input type='date' placeholder='Date' value={place.date} name='date' onChange={handleInputChnage}/>
        <Form.Input placeholder='City' value={place.city} name='city' onChange={handleInputChnage}/>
        <Form.Input placeholder='Country' value={place.country} name='country' onChange={handleInputChnage}/>
        <Form.Input placeholder='Continent' value={place.continent} name='continent' onChange={handleInputChnage}/>
        <Button floated='right' positive type='submit' content='Submit'/>
        <Button as={Link} to='/places'  floated='right' positive type='button' content='Cancel'/>
        </Form>
        
    </Segment>
    )
}
