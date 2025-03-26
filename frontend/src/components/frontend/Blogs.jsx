import React from "react";
import BlogNews from "./BlogNews";

const Blogs = () => {
  return (
    <main>
      <section className="section-7">
        <div className="hero d-flex align-items-center">
          <div className="container">
            <div className="text-left">
              <span>Quality, Integrity, Value.</span>
              <h1>Blogs</h1>
              <p>
                We excel at transforming visions into reality <br /> through
                outstanding craftsmanship and precise .
              </p>
            </div>
          </div>
        </div>
      </section>
      <BlogNews limit="all" />
    </main>
  );
};

export default Blogs;
