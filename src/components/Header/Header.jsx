import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import Home from '../../views/Home';
import Explore from '../../views/Explore';
import GlampingDetail from '../../views/GlampingDetail';
import Register from '../../views/Register';
import Login from '../../views/Login';
import './header.css';
import { useAuth } from "../../routes/AuthProvider";
import { auth } from "../../firebase";
import { signOut } from "@firebase/auth";
import GlampingEditView from "../../views/GlampingEditView";
import PrivateRoute from "../../routes/PrivateRoutes";
import GlampingAddView from "../../views/GlampingAddView";

function Header() {
    const location = useLocation();

    // Determine the navbar background class based on the current path
    const isHomePage = location.pathname === '/';
    const navbarClass = isHomePage ? 'fixed-top bg-transparent' : 'fixed-top bg-light-orange navbar-margin';
    const {currentUser } = useAuth();

    // Log out function
    const logOut = async () => {
        await signOut(auth);
    };

    return (
        <div>
            <Navbar expand='lg' className={navbarClass}>
                <Container>
                    <div className='d-flex justify-content-between w-100 align-items-center'>

                        <Navbar.Brand>
                            <Link to='/' className='navbar-brand fw-semibold text-white'>
                                Glamping.ee
                            </Link>
                        </Navbar.Brand>

                        <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                        <Navbar.Collapse id='basic-navbar-nav'>
                            <div className='d-flex justify-content-between w-100 align-items-center'>

                                <Nav className='mx-auto d-flex justify-content-center me-5'>
                                    <NavLink to='/' className='nav-link active text-uppercase fw-semibold text-white'>
                                        Home
                                    </NavLink>
                                    <NavLink to='/explore'
                                             className='nav-link active text-uppercase fw-semibold text-white'>
                                        Explore
                                    </NavLink>
                                </Nav>


                                {currentUser ? (
                                    <>
                                        <Nav className='ms-auto d-flex align-items-center'>
                                            <p className="text-white mb-0" >
                                                Welcome, {currentUser.email}
                                            </p>
                                            <Button onClick={logOut}
                                                    as={Link}
                                                    to='/'
                                                    className='btn text-uppercase fw-semibold ms-2'
                                                    style={{backgroundColor: '#ff9f00', border: 'none'}}>
                                                Log Out
                                            </Button>
                                        </Nav>
                                    </>
                                ) : (
                                    <>
                                        <Nav className='ms-auto d-flex align-items-center'>
                                            <NavLink to='/login' className='nav-link active text-uppercase text-white'>
                                                Log In
                                            </NavLink>
                                            <Button
                                                as={Link}
                                                to='/register'
                                                className='btn text-uppercase fw-semibold ms-2'
                                                style={{backgroundColor: '#ff9f00', border: 'none'}}>
                                                Register
                                            </Button>
                                        </Nav>
                                    </>
                                )}
                            </div>
                        </Navbar.Collapse>
                    </div>
                </Container>
            </Navbar>

            <Routes>
            <Route path='/' element={<Home />} />
                <Route path='/explore' element={<Explore />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/glamping/:id' element={<GlampingDetail />} />
                <Route path="/update/:id" element={
                        <PrivateRoute requiredRole="admin">
                            <GlampingEditView />
                        </PrivateRoute>
                    }
                />
                <Route path="/add" element={
                    <PrivateRoute requiredRole="admin">
                        <GlampingAddView />
                    </PrivateRoute>
                }
                />
            </Routes>
        </div>
    );
}

export default Header;
