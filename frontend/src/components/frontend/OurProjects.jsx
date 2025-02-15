import React from "react";
import ProjectsImg from "../../assets/images/construction2.jpg";

const OurProjects = () => {
  return (
    <section className="section-3 bg-light py-5">
      <div className="container-fluid py-5">
        <div className="section-header text-center">
          <span>Our Projects</span>
          <h2>Discover our diverse range of projects</h2>
          <p>
            We offer a diverse array of construction services, spanning
            residential, commercial, and industrial projects.
          </p>
        </div>
        <div className="row pt-4">
          <div className="col-md-3 col-lg-3">
            <div className="item">
              <div className="service-image">
                <img src={ProjectsImg} alt="" className="w-100" />
              </div>
              <div className="service-body">
                <div className="service-title">
                  <h3>Odisha Projects</h3>
                </div>
                <div className="service-content">
                  <p>
                    Specialty construction is a niche sector within the
                    construction industry that focuses on projects requiring
                    specialized skills, materials, and techniques. Unlike
                    general construction
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
                <img src={ProjectsImg} alt="" className="w-100" />
              </div>
              <div className="service-body">
                <div className="service-title">
                  <h3>Odisha Projects</h3>
                </div>
                <div className="service-content">
                  <p>
                    Specialty construction is a niche sector within the
                    construction industry that focuses on projects requiring
                    specialized skills, materials, and techniques. Unlike
                    general construction
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
                <img src={ProjectsImg} alt="" className="w-100" />
              </div>
              <div className="service-body">
                <div className="service-title">
                  <h3>Odisha Projects</h3>
                </div>
                <div className="service-content">
                  <p>
                    Specialty construction is a niche sector within the
                    construction industry that focuses on projects requiring
                    specialized skills, materials, and techniques. Unlike
                    general construction
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
                <img src={ProjectsImg} alt="" className="w-100" />
              </div>
              <div className="service-body">
                <div className="service-title">
                  <h3>Odisha Projects</h3>
                </div>
                <div className="service-content">
                  <p>
                    Specialty construction is a niche sector within the
                    construction industry that focuses on projects requiring
                    specialized skills, materials, and techniques. Unlike
                    general construction
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

export default OurProjects;
