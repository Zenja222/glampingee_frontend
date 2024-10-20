import React from 'react'
import {Nav, Navbar} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Link, Route, Routes} from "react-router-dom";
import Home from "../../views/Home";
import Contact from "../../views/Contact";
import Explore from "../../views/Explore";
import Menu from "../../views/Menu";
import About from "../../views/About";
import GlampingDetail from "../../views/GlampingDetail";
import Register from "../../views/Register";

function Header() {
    return (
        <div>
            <Navbar expand='lg' className='fixed-top bg-body-tertiary bg-transparent'>
                <Container>
                    <Navbar.Brand>
                        <Link to='/' className='navbar-brand text-success fw-semibold'>
                            Glamping Estonia
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='me-auto justify-content-end w-100'>
                            <Nav.Link href='/' className='active text-uppercase'>Home</Nav.Link>
                            <Nav.Link href='/explore' className='active text-uppercase'>Explore</Nav.Link>
                            <Nav.Link href='/logIn' className='active text-uppercase'>Log In</Nav.Link>
                            <Nav.Link href='/register' className='active text-uppercase'>Register</Nav.Link>
                            <Nav.Link href='/contact' className='active text-uppercase'>Contact</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/explore' element={<Explore />} />
                <Route path='/register' element={<Register />} />
                <Route path='/about' element={<About />} />
                <Route path='/glamping/:id' element={<GlampingDetail />} />
            </Routes>
        </div>
    )
}

export default Header
