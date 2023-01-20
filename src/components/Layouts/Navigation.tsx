import Link from 'next/link';
import React from 'react'
import { Navbar, Container, Nav, NavDropdown, Form, Button } from 'react-bootstrap'

function Navigation() {
    return <>
        {/* Creeate a custom mobile menu */}
        <Navbar bg="primary" variant="dark" expand="md" className='Navigation container-fluid'>
            <Container >
                {/* <Navbar.Brand href="#"></Navbar.Brand> */}
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '80px' }}
                        navbarScroll
                    >
                        <Link href="/" passHref>
                            <Nav.Link href="/">Home</Nav.Link>
                        </Link>
                        <NavDropdown title="Move Services" id="navbarScrollingDropdown">
                            <Link href="/services" passHref>
                                <NavDropdown.Item href="/services">Services</NavDropdown.Item>
                            </Link>
                        </NavDropdown>
                        <NavDropdown title="Resources" id="navbarScrollingDropdown">
                            <Link href="/resources" passHref>
                                <NavDropdown.Item href="/resources">Resources</NavDropdown.Item>
                            </Link>
                        </NavDropdown>
                        <NavDropdown title="About us" id="navbarScrollingDropdown">
                            <Link href="/about" passHref>
                                <NavDropdown.Item href="/about">About Us</NavDropdown.Item>
                            </Link>
                        </NavDropdown>
                        <Link href="/contactus" passHref>
                            <Nav.Link href="/contactus">Contact us</Nav.Link>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
}

export default Navigation;
