import React from 'react';
import Radium from 'radium';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

var styles = {
    navBar:{
        backgroundColor:'#344167',
        padding:'0 5.5vw 0 10vw'
    },
    navItem: {
        textTransform:'uppercase',
        backgroundColor:'#F6BF49',
        padding:'0.5vh 1vw',
        borderRadius:'0.25vh',
        margin:'1vh 2vh',
        color:'#FFFFFF',
        cursor:'pointer'
    },
    navBrand:{
        color:'#F6BF49',
        fontFamily:"'Monoton', sans-serif",
        fontSize:'2em'
    }
}

class Sitebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen:false
        }
    }

    toggle = () => {
        this.setState({
            isOpen:!this.state.isOpen
        })
    }

    render() {
        return (
            <Navbar style={styles.navBar} expand="md">
                <NavbarBrand href="/" style={styles.navBrand}>MovieLog</NavbarBrand>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink onClick={() => this.props.clickLogout()} style={styles.navItem}>Logout</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}

export default Radium(Sitebar);