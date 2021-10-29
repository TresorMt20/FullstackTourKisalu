import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Segment } from 'semantic-ui-react'
import { useHistory, useParams } from 'react-router';
import { useStore } from '../../../app/stores/store';
import {  Form, Formik } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Place } from '../../../app/models/place';
import { v4 as uuid } from 'uuid';

export default function PlaceForm() {
    const history = useHistory();
    const {placeStore} = useStore();
    const {createPlace,loadPlace,updatePlace} = placeStore;

    const {id} = useParams<{id: string}>();

    const [place,setPlace]= useState<Place>({
        id: '',
        name:'',
        category:'',
        description:'',
        date: null,
        city:'',
        country:'',
        continent:''
    });

    const validationSchema = Yup.object({
        name: Yup.string().required('The name is required'),
        description: Yup.string().required('The description is required'),
        category: Yup.string().required(),
        date: Yup.string().required(),
        city: Yup.string().required(),
        country: Yup.string().required(),
        continent: Yup.string().required(),
    })

    useEffect(() => {
        if(id) loadPlace(id).then(place => setPlace(place!))
    }, [id, loadPlace]);

    function handleFormSumit(place: Place){
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
  
     
    return (
        <Segment clearing>
            <Header content='Place Details' sub color='teal'/>
            <Formik 
            validationSchema={validationSchema}
            enableReinitialize 
            initialValues={place} 
            onSubmit={values =>handleFormSumit(values)}>
                {({handleSubmit,isValid,isSubmitting,dirty}) => (
                     <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                     <MyTextInput name='name' placeholder="Name"/>
                     <MyTextArea rows={3} placeholder='Description'  name='description' />
                     <MySelectInput options={categoryOptions} placeholder='Category'  name='category' />
                     <MyDateInput
                       placeholderText='Date'  
                       name='date'
                       showTimeSelect
                       timeCaption='time'
                       dateFormat='MMMM d, yyyy h:m aa'
                       />
                       <Header content='Location Details' sub color='teal'/>
                     <MyTextInput placeholder='City'  name='city' />
                     <MyTextInput placeholder='Country' name='country' />
                     <MyTextInput placeholder='Continent' name='continent'/>
                     <Button 
                     disabled={isSubmitting || !dirty || !isValid}
                     floated='right' positive type='submit' content='Submit'/>
                     <Button as={Link} to='/places'  floated='right' positive type='button' content='Cancel'/>
                     </Form>
                )}

            </Formik>
    </Segment>
    )
}
