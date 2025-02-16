import React from "react";

const Hero = () => {
  return (
    <main>
      <section className="section-1">
        <div className="hero d-flex align-items-center">
          <div className="container-fluid">
            <div className="text-center">
              <span>Welcome Amazing Constructions</span>
              <h1>
                Crafting dreams with
                <br className="d-none d-md-block" /> precision and excellence.
              </h1>
              <p>
                We excel transforming visions into reality through outstanding
                craftsmanship and precise <br className="d-none d-md-block" />
                attention to detail. With years of experience and a dedication
                to quality.
              </p>
              <div className="mt-4 d-md-block">
                <a className="btn btn-primary large-btn d-block d-md-inline-block mb-3 mb-md-0">Contact Now</a>
                <a className="btn btn-secondary large-btn d-block d-md-inline-block ms-md-2">View Projects</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Hero;