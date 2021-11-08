import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Header, Image, Segment } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store'
import LoginForm from '../users/LoginForm';

export default function HomePage() {

    const {userStore,modalStore} = useStore();
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}}/>
                    Show Tour

                </Header>
                {userStore.isLoggedIn ? (
                    <>
                    <Header as='h2' inverted content='welcome to show tour'/>
                    <Button as={Link} to='/places' size='huge' inverted>
                    Go to Places !

                    </Button>
                    </>
                    

                ) : (
                    <>
                            <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted>
                                Login!
                            </Button>
                            <Button onClick={() => modalStore.openModal(<h1>Register</h1>)} size='huge' inverted>
                            Register
                            </Button>
                           
                        </>
                )}
                
               
            </Container>
            
        </Segment>
    )
}
