import Link from "next/link";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

function Navigation() {
  return (
    <>
      {/* Creeate a custom mobile menu */}
      <Navbar
        bg="primary"
        variant="dark"
        expand="md"
        className="Navigation container-fluid"
      >
        <Container>
          {/* <Navbar.Brand href="#"></Navbar.Brand> */}
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "80px" }}
              navbarScroll
            >
              <Link href="/" className="nav-link">
                Home
              </Link>
              <NavDropdown title="Move Services" id="navbarScrollingDropdown">
                <Link href="/services/home-moves" passHref>
                  <NavDropdown.Item href="/services/home-moves">
                    Home moves
                  </NavDropdown.Item>
                </Link>

                <Link href="/services/international-moves" passHref>
                  <NavDropdown.Item href="/services/international-moves">
                    International moves
                  </NavDropdown.Item>
                </Link>

                <Link href="/services/office-removals" passHref>
                  <NavDropdown.Item href="/services/office-removals">
                    Office removals
                  </NavDropdown.Item>
                </Link>

                <Link href="/services/storage" passHref>
                  <NavDropdown.Item href="/services/storage">
                    Storage
                  </NavDropdown.Item>
                </Link>

                <Link href="/services/specialized-services" passHref>
                  <NavDropdown.Item href="/services/specialized-services">
                    Specialised services
                  </NavDropdown.Item>
                </Link>
              </NavDropdown>
              <NavDropdown title="Resources" id="navbarScrollingDropdown">
                <Link href="/resources" passHref>
                  <NavDropdown.Item href="/resources">
                    Resources
                  </NavDropdown.Item>
                </Link>
                <Link href="/resources/careers" passHref>
                  <NavDropdown.Item href="/resources/careers">
                    Careers
                  </NavDropdown.Item>
                </Link>
              </NavDropdown>

              <Link href="/about" className="nav-link">
                About Us
              </Link>

              <Link href="/contact-us" className="nav-link">
                Contact us
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
