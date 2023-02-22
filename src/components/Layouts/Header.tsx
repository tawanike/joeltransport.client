import { useRouter } from 'next/router';
import React from 'react';
import { Button } from 'react-bootstrap';
import Navigation from './Navigation';

const Header = () => {
    const router = useRouter();
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="container">
                    <div className="Header__topNav row">
                        <div className="col-8">
                            <div className="Header__logo">
                                <img src="/img/logo.png" alt="Logo" />
                            </div>
                        </div>
                        <div className="Header__account col-4 d-flex justify-content-end align-items-center">
                            <span className='agent'>Are you an agent?</span>
                            <span className="Header__divider mx-3">|</span>
                            <Button variant="outline-primary">Login</Button>
                            <Button variant="primary ms-3">Sign up</Button>
                        </div>
                    </div>
                </div>
                {
                    !router.pathname.split('/').includes('checkout') && <Navigation />
                }
            </div>
        </div>
    )
}

export default Header
