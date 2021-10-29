//import { NavLink } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import { Button, Container, Menu } from 'semantic-ui-react'

export default function NavBar() {

    return (
        <Menu inverted  fixed='top'>
            <Container>
            <Menu.Item as={NavLink} to='/' exact header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight:'10'}}/>
                    Show place
                </Menu.Item>
                <Menu.Item as={NavLink} to='/places' name='Places' />
                <Menu.Item as={NavLink} to='/errors' name='Errors' />
                <Menu.Item>
                    <Button as={NavLink} to='/createPlace' positive content='Create Place'/>

                </Menu.Item>
            </Container>
        </Menu>
    )
}
