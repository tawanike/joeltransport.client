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
                            <li><Link href="/services/home-moves">Home movers</Link></li>
                            <li><Link href="/services/home-moves">International Moves</Link></li>
                            <li><Link href="/services/office-removals">Office removals</Link></li>
                            <li><Link href="/services/storage">Storage</Link></li>
                            <li><Link href="/services/specialized-services">Specialised services</Link></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h5>Resources</h5>
                        <ul className="Footer__links">
                            <li><Link href="/#faqs">FAQs</Link></li>
                            <li><Link href="/resources">Resources & tips</Link></li>
                            <li><Link href="/resources">Documentation</Link></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h5>Company</h5>
                        <ul className="Footer__links">
                            <li><Link href="/legal/removal-policy">Removal Policy</Link></li>
                            <li><Link href="/legal/privacy-policy">Privacy Policy</Link></li>
                            <li><Link href="/legal/terms-conditions">Terms and Conditions</Link></li>
                            <li><Link href="/careers">Careers</Link></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h5>Support</h5>
                        <ul className="Footer__links">
                            <li><Link href="#">Chat to us</Link></li>
                            <li><Link href="mailto:sales@joeltransport.co.za">sales@joeltransport.co.za</Link></li>
                            <li><Link href="tel:27 12 666 9055">Phone +27 12 666 9055</Link></li>
                            <li>Fax +27 12 666 9186</li>
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
