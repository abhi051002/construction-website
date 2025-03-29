import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const OurProjects = () => {
  const [projects, setProjects] = useState([]);
  const fetchLatestProjects = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/get-latest-projects?limit=4`
      );
      const result = await response.json();
      setProjects(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLatestProjects();
  }, []);
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
          {projects &&
            projects.map((project) => {
              return (
                <div className="col-md-3 col-lg-3" key={project.id}>
                  <div className="item">
                    <div className="service-image">
                      <img
                        src={`${
                          import.meta.env.VITE_FILE_URL
                        }/uploads/projects/small/${project.image}`}
                        alt=""
                        className="w-100"
                      />
                    </div>
                    <div className="service-body">
                      <div className="service-title">
                        <h3>{project.title}</h3>
                      </div>
                      <div className="service-content">
                        <p>{project.short_desc}</p>
                      </div>
                      <Link
                        to={`projects/${project.id}`}
                        className="btn btn-primary small-btn"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default OurProjects;
