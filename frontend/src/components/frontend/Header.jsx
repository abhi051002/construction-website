import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useLocation } from "react-router-dom";

const Header = () => {
  const path = useLocation();
  const getNavClass = (currentPath) => {
    if (path.pathname.includes(currentPath) && currentPath !== "/") {
      return "active";
    }
    return currentPath === path.pathname ? "active" : "";
  };
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
              <Nav.Link href="/" className={getNavClass("/")}>
                Home
              </Nav.Link>
              <Nav.Link href="/about" className={getNavClass("/about")}>
                About Us
              </Nav.Link>
              <Nav.Link href="/services" className={getNavClass("/services")}>
                Services
              </Nav.Link>
              <Nav.Link href="/projects" className={getNavClass("/projects")}>
                Projects
              </Nav.Link>
              <Nav.Link href="/blogs" className={getNavClass("/blogs")}>
                Blogs
              </Nav.Link>
              <Nav.Link
                href="/contact-us"
                className={getNavClass("/contact-us")}
              >
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
