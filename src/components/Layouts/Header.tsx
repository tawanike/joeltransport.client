import React from 'react';
import Image from 'next/image';
import Navigation from './Navigation';

function Header() {
  return (
    <div className="container-fluid p-0">
      <div className='container'>
        <div className="Header__topNav row">
          <div className="Header__logo w-50">
            <Image src="/img/logo.png" alt="Logo" width={96} height={52} />
          </div>
          <div className="Header__account w-50 d-flex justify-content-end">
            <span className="pt-3">Are you an agent?</span>
            <span className="Header__divider pt-3">|</span>
            <button className="btn btn-secondary">Login</button>
            <button className="btn btn-primary">Sign up</button>
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  )
}

export default Header
