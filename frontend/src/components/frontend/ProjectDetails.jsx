import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Testimonials from "./Testimonials";

const ProjectDetails = () => {
  const { id } = useParams();
  const [projects, setProjects] = useState([]);
  const fetchProjects = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/get-project/${id}`
      );
      const result = await response.json();
      setProjects(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [id]);
  return (
    <main>
      <section className="section-11">
        <div className="hero d-flex align-items-center">
          <div className="container">
            <div className="text-left">
              <span>Quality, Integrity, Value.</span>
              <h1>{projects.title}</h1>
            </div>
          </div>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-md-4">
              <div className="card shadow border-0 sidebar">
                <div className="card-body p4">
                  <h3 className="mt-2 mb-3">Insights</h3>
                  <ul>
                    {projects.location && (
                      <li className="mb-2">
                        <span className="text-body-secondary">Location</span>
                        <p>{projects.location}</p>
                      </li>
                    )}
                    {projects.construction_type && (
                      <li className="mb-2">
                        <span className="text-body-secondary">
                          Construction Type
                        </span>
                        <p>{projects.construction_type}</p>
                      </li>
                    )}
                    {projects.sector && (
                      <li className="mb-2">
                        <span className="text-body-secondary">Sector</span>
                        <p>{projects.sector}</p>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div>
                <img
                  className="w-100"
                  src={`${
                    import.meta.env.VITE_FILE_URL
                  }/uploads/projects/large/${projects.image}`}
                  alt=""
                />
              </div>
              <h3 className="py-3">{projects.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: projects.content }}></div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-light py-5">
        <Testimonials />
      </section>
    </main>
  );
};

export default ProjectDetails;
