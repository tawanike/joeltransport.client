import Link from 'next/link';
import React from 'react'
import { Navbar, Container, Nav, NavDropdown, Form, Button } from 'react-bootstrap'

function Navigation() {
  return (<div className='Navigation'>
    <div className="container">
      <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/services">Move services</Link></li>
          <li><Link href="/resources">Resources</Link></li>
          <li><Link href="/about">About us</Link></li>
          <li><Link href="/contacts">Contact us</Link></li>
      </ul>
    </div>
  </div>
  )
}

export default Navigation;
