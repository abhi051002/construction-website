import React from "react";
import AboutIMG from "../../assets/images/about-us.jpg";
const Aboutus = () => {
  return (
    <section className="section-2 py-5">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-6">
            <img src={AboutIMG} alt="About US" className="w-100" />
          </div>
          <div className="col-md-6">
            <span>about us</span>
            <h2>Crafting structures that last a lifetime</h2>
            <p>
              Building enduring structures requires a comprehensive approach
              that combines advanced materials, resilient design, routine
              maintenance, and sustainable practices. By drawing on historical
              insights and utilizing modern technology.
            </p>
            <p>
              Designing structures that stand the test of time involves a
              seamless blend of cutting-edge materials, durable design, ongoing
              upkeep, and eco-friendly practices. By combining lessons from the
              past with the power of modern technology.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aboutus;
