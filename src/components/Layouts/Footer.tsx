import Link from "next/link";
import { BsInstagram } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { MdOutlineFacebook } from "react-icons/md";

function Footer() {
  return (
    <div className="Footer container-fluid mt-5">
      <div className="container">
        <div className="row">
          <div className="col">
            <h5>Services</h5>
            <ul className="Footer__links">
              <li>
                <Link href="/services/home-moves">Domestic move</Link>
              </li>
              <li>
                <Link href="/services/long-distance-move">
                  Long distance move
                </Link>
              </li>
              <li>
                <Link href="/services/international-move">
                  International move
                </Link>
              </li>
              <li>
                <Link href="/services/office-relocation">
                  Office relocation
                </Link>
              </li>
              <li>
                <Link href="/services/storage">Storage</Link>
              </li>
              <li>
                <Link href="/services/specialized-services">
                  Specialised services
                </Link>
              </li>
            </ul>
          </div>
          <div className="col">
            <h5>Resources</h5>
            <ul className="Footer__links">
              <li>
                <Link href="/#faqs">FAQs</Link>
              </li>
              <li>
                <Link href="/resources">Resources & tips</Link>
              </li>
              <li>
                <Link href="/resources">Documentation</Link>
              </li>
            </ul>
          </div>
          <div className="col">
            <h5>Company</h5>
            <ul className="Footer__links">
              <li>
                <Link href="/legal/removal-policy">Removal Policy</Link>
              </li>
              <li>
                <Link href="/legal/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/legal/terms-conditions">Terms and Conditions</Link>
              </li>
              <li>
                <Link href="/resources/careers">Careers</Link>
              </li>
            </ul>
          </div>
          <div className="col">
            <h5>Support</h5>
            <ul className="Footer__links">
              <li>
                <Link href="#">Chat to us</Link>
              </li>
              <li>
                <Link href="mailto:sales@joeltransport.co.za">
                  sales@joeltransport.co.za
                </Link>
              </li>
              <li>
                <Link href="tel:27 12 666 9055">Phone +27 12 666 9055</Link>
              </li>
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
            Copyright&copy; {new Date().getFullYear()} Joel Transport. All
            rights reserved.
          </div>
          <div
            className="col"
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div
              className="Footer__social d-flex align-items-center justify-content-center"
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: "white",
                marginRight: 12,
              }}
            >
              <Link href="https://www.facebook.com/joeltransport">
                <MdOutlineFacebook color="black" size={24} />
              </Link>
            </div>

            <div
              className="Footer__social d-flex align-items-center justify-content-center"
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: "white",
                marginRight: 12,
              }}
            >
              <Link href="https://www.instagram.com/joeltransport">
                <BsInstagram color="black" size={20} />
              </Link>
            </div>

            <div
              className="Footer__social d-flex align-items-center justify-content-center"
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: "white",
                marginRight: 12,
              }}
            >
              <Link href="https://www.linkedin.com/in/joeltransport">
                <FaLinkedinIn color="black" size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
