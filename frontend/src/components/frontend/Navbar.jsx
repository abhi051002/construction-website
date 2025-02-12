import React from "react";
import Nav from "react-bootstrap/Nav";
import NavComponent from "react-bootstrap/Navbar";

const Navbar = () => {
  return (
    <header>
      <div className="container py-3">
        <NavComponent expand="lg">
          <NavComponent.Brand href="/" className="logo">
            <span>UrbanEdge</span> Constructions
          </NavComponent.Brand>
          <NavComponent.Toggle aria-controls="basic-NavComponent-nav" />
          <NavComponent.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/" className="nav-link">
                Home
              </Nav.Link>
              <Nav.Link href="/about" className="nav-link">
                About Us
              </Nav.Link>
              <Nav.Link href="#link" className="nav-link">
                Services
              </Nav.Link>
              <Nav.Link href="#link" className="nav-link">
                Projects
              </Nav.Link>
              <Nav.Link href="#link" className="nav-link">
                Blogs
              </Nav.Link>
              <Nav.Link href="#link" className="nav-link">
                Contact Us
              </Nav.Link>
            </Nav>
          </NavComponent.Collapse>
        </NavComponent>
      </div>
    </header>
  );
};

export default Navbar;
