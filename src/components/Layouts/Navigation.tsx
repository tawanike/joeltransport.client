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
        collapseOnSelect
        className="Navigation container-fluid"
      >
        <Container style={{ backgroundColor: "#1D3A7A" }}>
          {/* <Navbar.Brand href="#"></Navbar.Brand> */}
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "300px", backgroundColor: "#1D3A7A" }}
              navbarScroll
            >
              <Link href="/" className="nav-link">
                Home
              </Link>
              <NavDropdown title="Services" id="navbarScrollingDropdown">
                <Link href="/services/home-moves" passHref>
                  <NavDropdown.Item href="/services/home-moves">
                    Domestic move
                  </NavDropdown.Item>
                </Link>

                <Link href="/services/long-distance-move" passHref>
                  <NavDropdown.Item href="/services/long-distance-move">
                    Long distance move
                  </NavDropdown.Item>
                </Link>

                <Link href="/services/international-move" passHref>
                  <NavDropdown.Item href="/services/international-move">
                    International move
                  </NavDropdown.Item>
                </Link>

                <Link href="/services/office-relocation" passHref>
                  <NavDropdown.Item href="/services/office-relocation">
                    Office relocation
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
                <NavDropdown.Item href="/about">About us</NavDropdown.Item>
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
