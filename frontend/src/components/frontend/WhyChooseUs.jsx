import React from "react";
import Icon1 from "../../assets/images/icon-1.svg";
import Icon2 from "../../assets/images/icon-2.svg";
import Icon3 from "../../assets/images/icon-3.svg";

const WhyChooseUs = () => {
  return (
    <section className="section-4">
      <div className="container py-5">
        <div className="section-header text-center">
          <span>Why Choose Us</span>
          <h2>Discover our wide variety of projects.</h2>
          <p>
            Created in close partnership with our clients and collaborators,
            this approach merges industry expertise,
            <br /> decades of experience, innovation, and flexibility to
            consistently deliver excellence.
          </p>
        </div>
        <div className="row pt-4">
          <div className="col-md-4">
            <div className="card shadow border-0 p-4">
              <div className="card-icon">
                <img src={Icon1} alt="" />
              </div>
              <div className="card-title mt-3">
                <h3>Cutting-Edge Solutions</h3>
                <p>
                  Small actions create big impacts. It all begins and ends with
                  each employee committing to safer work practices daily,
                  ensuring they return home safely.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow border-0 p-4">
              <div className="card-icon">
                <img src={Icon2} alt="" />
              </div>
              <div className="card-title mt-3">
                <h3>Cutting-Edge Solutions</h3>
                <p>
                  Small actions create big impacts. It all begins and ends with
                  each employee committing to safer work practices daily,
                  ensuring they return home safely.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow border-0 p-4">
              <div className="card-icon">
                <img src={Icon3} alt="" />
              </div>
              <div className="card-title mt-3">
                <h3>Cutting-Edge Solutions</h3>
                <p>
                  Small actions create big impacts. It all begins and ends with
                  each employee committing to safer work practices daily,
                  ensuring they return home safely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
