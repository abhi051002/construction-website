import React, { useEffect, useState } from "react";
import Testimonials from "./Testimonials";
import { Link, useParams } from "react-router-dom";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState([]);
  const [services, setServices] = useState([]);
  const fetchServices = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/get-services`
      );
      const result = await response.json();
      setServices(result);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchServiceDetails = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/get-service/${id}`
      );
      const result = await response.json();
      setService(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchServiceDetails();
    fetchServices();
  }, [id]);
  return (
    <main>
      <section className="section-11">
        <div className="hero d-flex align-items-center">
          <div className="container">
            <div className="text-left">
              <span>Quality, Integrity, Value.</span>
              <h1>{service.title}</h1>
            </div>
          </div>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-md-3">
              <div className="card shadow border-0 sidebar">
                <div className="card-body p4">
                  <h3 className="mt-2 mb-3">Our Services</h3>
                  <ul>
                    {services &&
                      services.map((service) => {
                        return (
                          service.id != id && (
                            <li
                              key={service.id}
                              className="border-bottom border-1 py-2"
                            >
                              <Link
                                to={`/services/${service.id}`}
                                className="text-secondary"
                                style={{
                                  transition: "color 0.3s",
                                }}
                                onMouseOver={(e) =>
                                  e.target.classList.replace(
                                    "text-secondary",
                                    "text-dark"
                                  )
                                }
                                onMouseOut={(e) =>
                                  e.target.classList.replace(
                                    "text-dark",
                                    "text-secondary"
                                  )
                                }
                              >
                                {service.title}
                              </Link>
                            </li>
                          )
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div>
                <img
                  className="w-100"
                  src={`${
                    import.meta.env.VITE_FILE_URL
                  }/uploads/services/large/${service.image}`}
                  alt=""
                />
              </div>
              <h3 className="py-3">{service.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: service.content }}></div>
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

export default ServiceDetails;
