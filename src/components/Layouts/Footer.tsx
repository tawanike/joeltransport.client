import React from 'react';
import Link from 'next/link';

function Footer() {
    return (
        <div className="Footer container-fluid mt-5">

            <div className="container">
                <div className="row">
                    <div className="col">
                        <h5>Services</h5>
                        <ul className="Footer__links">
                            <li><Link href="">Home movers</Link></li>
                            <li><Link href="">International Moves</Link></li>
                            <li><Link href="">Office removals</Link></li>
                            <li><Link href="">Storage</Link></li>
                            <li><Link href="">Specialised services</Link></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h5>Resources</h5>
                        <ul className="Footer__links">
                            <li><Link href="">FAQs</Link></li>
                            <li><Link href="">Resources & tips</Link></li>
                            <li><Link href="">Documentation</Link></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h5>Company</h5>
                        <ul className="Footer__links">
                            <li><Link href="">Removal Policy</Link></li>
                            <li><Link href="">Privacy Policy</Link></li>
                            <li><Link href="">Terms and Conditions</Link></li>
                            <li><Link href="">Careers</Link></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h5>Support</h5>
                        <ul className="Footer__links">
                            <li><Link href="">Chat to us</Link></li>
                            <li><Link href="">sales@joeltransport.co.za</Link></li>
                            <li><Link href="">Phone +27 12 666 9055</Link></li>
                            <li><Link href="">Fax +27 12 666 9186</Link></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h5>Office</h5>
                        <ul className="Footer__links">
                            <li>Monday - Friday</li>
                            <li>8am - 4.30pm</li>
                            <li>10 Von Tonder Street</li>
                            <li>Sunderland Ridge</li>
                            <li>Centurion, 0157</li>
                            <li>South Africa</li>
                        </ul>
                    </div>
                </div>
                <div className="Footer__copyright row">
                    <div className="col">
                        Copyright &copy; 2022 Joel Transport. All rights reserved.
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        </div>
    )
}

export default Footer;
