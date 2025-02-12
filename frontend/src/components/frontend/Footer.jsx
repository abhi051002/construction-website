import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-3">
            <h3 className="mb-3">UrbanEdge Constructions</h3>
            <div className="pe-5">
              <p>
                Our post-construction services gives you peace of mind knowing
                that we are still here for you even after.
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <h3 className="mb-3">Our Sevices</h3>
            <ul>
              <li>
                <a href="">Speciality Construction</a>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h3 className="mb-3">Quick Links</h3>
            <ul>
              <li>
                <a href="">About Us</a>
              </li>
              <li>
                <a href="">Services</a>
              </li>
              <li>
                <a href="">Projects</a>
              </li>
              <li>
                <a href="">Blog</a>
              </li>
              <li>
                <a href="">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h3 className="mb-3">Contact Us</h3>
            <ul>
              <li>(888-000-0000)</li>
              <li>info@example.com</li>
              <li>B-18X, Rajaji Puram</li>
              <li>Lucknow, Uttar Pradesh, 226017</li>
              <li>0522400XXXX</li>
            </ul>
          </div>
          <hr />
          <div className="text-center pt-4">
            Copyright &copy; {year} All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
