import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
    const { t, i18n } = useTranslation();
    const isHomePage = location.pathname === '/';
    const navbarClass = isHomePage ? 'fixed-top bg-transparent' : 'fixed-top bg-light-orange navbar-margin';
    const { currentUser } = useAuth();

    const logOut = async () => {
        await signOut(auth);
    };

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'et' : 'en');
    };

    return (
        <div>
            <Navbar expand='lg' className={navbarClass} style={{ paddingTop: '0.1rem', paddingBottom: '0.1rem' }}>
                <Container>
                    <div className='d-flex justify-content-between w-100 align-items-center'>
                        <Navbar.Brand>
                            <Link to='/' className='navbar-brand fw-semibold text-white' style={{ fontSize: '1.2rem' }}>
                                Glamping.ee
                            </Link>
                        </Navbar.Brand>

                        <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                        <Navbar.Collapse id='basic-navbar-nav'>
                            <div className='d-flex justify-content-between w-100 align-items-center'>

                                <Nav className='mx-auto d-flex justify-content-center me-5'>
                                    <NavLink to='/' className='nav-link active text-uppercase fw-semibold text-white'>
                                        {t('home')}
                                    </NavLink>
                                    <NavLink to='/explore'
                                             className='nav-link active text-uppercase fw-semibold text-white'>
                                        {t('explore')}
                                    </NavLink>
                                </Nav>

                                <Nav className='ms-auto d-flex align-items-center'>
                                    {currentUser ? (
                                        <>
                                            <p id="welcome_current_user" className="text-white mb-0">
                                                {t('welcome')}, {currentUser.email}
                                            </p>
                                            <Button
                                                onClick={logOut}
                                                as={Link}
                                                to='/'
                                                className='btn text-uppercase fw-semibold ms-2'
                                                style={{ backgroundColor: '#ff9f00', border: 'none' }}>
                                                {t('log_out')}
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <NavLink to='/login' className='nav-link active text-uppercase text-white'>
                                                {t('login')}
                                            </NavLink>
                                            <Button
                                                as={Link}
                                                to='/register'
                                                className='btn text-uppercase fw-semibold ms-2'
                                                style={{ backgroundColor: '#ff9f00', border: 'none' }}>
                                                {t('register')}
                                            </Button>
                                        </>
                                    )}
                                    <Button
                                        onClick={toggleLanguage}
                                        className='btn text-uppercase fw-semibold ms-2'
                                        style={{ backgroundColor: '#ff9f00', border: 'none' }}>
                                        {i18n.language === 'en' ? 'ET' : 'EN'}
                                    </Button>
                                </Nav>
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
                }/>
                <Route path="/add" element={
                    <PrivateRoute requiredRole="admin">
                        <GlampingAddView />
                    </PrivateRoute>
                }/>
            </Routes>
        </div>
    );
}

export default Header;

