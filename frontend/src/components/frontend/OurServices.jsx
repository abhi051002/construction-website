import React, { useEffect, useState } from "react";
import ServiceImg from "../../assets/images/construction1.jpg";

const OurServices = () => {
  const [services, setSevices] = useState([]);
  const fetchLatestServices = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/get-latest-services?limit=4`
      );
      const result = await response.json();
      setSevices(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLatestServices();
  }, []);
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
          {services &&
            services.map((service) => {
              return (
                <div className="col-md-3 col-lg-3" key={service.id}>
                  <div className="item">
                    <div className="service-image">
                      <img
                        src={`${
                          import.meta.env.VITE_FILE_URL
                        }/uploads/services/small/${service.image}`}
                        alt=""
                        className="w-100"
                      />
                    </div>
                    <div className="service-body">
                      <div className="service-title">
                        <h3>{service.title}</h3>
                      </div>
                      <div className="service-content">
                        <p>{service.short_desc}</p>
                      </div>
                      <a
                        href={`/services/${service.id}`}
                        className="btn btn-primary small-btn"
                      >
                        Read More
                      </a>
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

export default OurServices;
