import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  return (
    <header>
      <div className="container py-3">
        <Navbar expand="lg">
          <Navbar.Brand href="/" className="logo">
            <span>UrbanEdge</span> Constructions
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/" className="nav-link">
                Home
              </Nav.Link>
              <Nav.Link href="/about" className="nav-link">
                About Us
              </Nav.Link>
              <Nav.Link href="/services" className="nav-link">
                Services
              </Nav.Link>
              <Nav.Link href="/projects" className="nav-link">
                Projects
              </Nav.Link>
              <Nav.Link href="/blogs" className="nav-link">
                Blogs
              </Nav.Link>
              <Nav.Link href="/contact-us" className="nav-link">
                Contact Us
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
};

export default Header;
