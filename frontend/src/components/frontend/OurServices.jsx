import React from "react";
import ServiceImg from "../../assets/images/construction1.jpg";

const OurServices = () => {
  return (
    <section className="section-3 bg-light py-5">
      <div className="container-fluid py-5">
        <div className="section-header text-center">
          <span>Our Services</span>
          <h2>Our construction services</h2>
          <p>
            We offer a diverse array of construction services, spanning
            residential, commercial, and industrial projects.
          </p>
        </div>
        <div className="row pt-4">
          <div className="col-md-3 col-lg-3">
            <div className="item">
              <div className="service-image">
                <img src={ServiceImg} alt="" className="w-100" />
              </div>
              <div className="service-body">
                <div className="service-title">
                  <h3>Civil Construction</h3>
                </div>
                <div className="service-content">
                  <p>
                    Civil construction is a core sector within the construction
                    industry that focuses on the design, development, and
                    maintenance of infrastructure that supports modern society.
                  </p>
                </div>
                <a href="#" className="btn btn-primary small-btn">
                  Read More
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-lg-3">
            <div className="item">
              <div className="service-image">
                <img src={ServiceImg} alt="" className="w-100" />
              </div>
              <div className="service-body">
                <div className="service-title">
                  <h3>Civil Construction</h3>
                </div>
                <div className="service-content">
                  <p>
                    Civil construction is a core sector within the construction
                    industry that focuses on the design, development, and
                    maintenance of infrastructure that supports modern society.
                  </p>
                </div>
                <a href="#" className="btn btn-primary small-btn">
                  Read More
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-lg-3">
            <div className="item">
              <div className="service-image">
                <img src={ServiceImg} alt="" className="w-100" />
              </div>
              <div className="service-body">
                <div className="service-title">
                  <h3>Civil Construction</h3>
                </div>
                <div className="service-content">
                  <p>
                    Civil construction is a core sector within the construction
                    industry that focuses on the design, development, and
                    maintenance of infrastructure that supports modern society.
                  </p>
                </div>
                <a href="#" className="btn btn-primary">
                  Read More
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-lg-3">
            <div className="item">
              <div className="service-image">
                <img src={ServiceImg} alt="" className="w-100" />
              </div>
              <div className="service-body">
                <div className="service-title">
                  <h3>Civil Construction</h3>
                </div>
                <div className="service-content">
                  <p>
                    Civil construction is a core sector within the construction
                    industry that focuses on the design, development, and
                    maintenance of infrastructure that supports modern society.
                  </p>
                </div>
                <a href="#" className="btn btn-primary small-btn">
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
