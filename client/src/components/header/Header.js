import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./Header.css";
import { Button, Container, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
// import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/user';
import notas from '../images/notas.svg';

const Header = ({ setSearch }) => {

    const history = useHistory();

    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin;

    const logoutHandler= () => {
        dispatch(logout());
        history.push('/');
    };

    const profile = () => {
        history.push("/profile");
    }

    useEffect(() => {
        
    }, [userInfo])

    return (
        <div>
            <Navbar bg="link" expand="lg" fixed="top" style={{backgroundColor:'#FFFFFF'}}>
            <Container>
                <Navbar.Brand> <img src={notas} alt="notas" style={{height:'25px', width:'auto'}} /> </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {userInfo && (
                        <>
                            <Nav.Link > <Link className="link" to="/mynotes" > My Notes </Link></Nav.Link>
                            <Nav.Link > <Link className="link" to="/createnote"> Create Note </Link> </Nav.Link>
                        </>
                    )}
                </Nav>
                
                {userInfo ? (
                    <>
                        <Form className="d-flex" style={{marginRight:'1rem'}}>
                            <FormControl className="form-control me-sm-2" type="text" placeholder="Search" style={{borderRadius:'50px'}} onChange={(e) => setSearch(e.target.value)} />
                        </Form>
                        
                        {/* <Dropdown>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                            <AccountCircleRoundedIcon/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{minWidth:'fit-content'}} >
                            <Dropdown.Item href="/profile">Profile <AccountCircleRoundedIcon/> </Dropdown.Item>
                            <Dropdown.Item onClick={logoutHandler}>Logout <ExitToAppIcon/> </Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown> */}
                        {/* <button type="button" class="btn btn-primary"><AccountCircleRoundedIcon/></button> */}
                        <img src={userInfo.pic} alt={userInfo.name} className="avatar" style={{ }} onClick={profile} />
                        {/* <Button href="/profile" className="btn btn-dark my-2 my-sm-0 searchBtn" type="submit"><AccountCircleRoundedIcon/></Button> */}
                        <Button  type="submit" onClick={logoutHandler} style={{boxShadow:'none', backgroundColor:'transparent'}} ><ExitToAppIcon/></Button>
                    </>
                ):(
                    <>
                        <Nav.Link > <Link className="link" to="/authenticate/login" > Login </Link></Nav.Link>
                    </>
                )}
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </div>
    )
}

export default Header
