import React from "react";

const ContactUs = () => {
  return (
    <main>
      <section className="section-7">
        <div className="hero d-flex align-items-center">
          <div className="container">
            <div className="text-left">
              <span>Quality, Integrity, Value.</span>
              <h1>Contact Us</h1>
              <p>
                We excel at transforming visions into reality <br /> through
                outstanding craftsmanship and precise .
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section-10 py-5">
        <div className="container">
          <div className="section-header text-center">
            <span></span>
            <h2>Contact Us</h2>
            <p>
              Our dedicated experts are here to help you with any of your
              questions, contact us by
              <br />
              filling out the form below and we will be in touch shortly.
            </p>
          </div>
          <div className="row mt-5">
            <div className="col-md-3">
              <div className="card shadow border-0 mb-3">
                <div className="card-body p-4">
                  <h3>Call Us</h3>
                  <div>
                    <a href="#">(123) 456-7890</a>
                  </div>
                  <div>
                    <a href="#">(987) 654-3210</a>
                  </div>
                  <h3 className="mt-4">You can write us</h3>
                  <div>
                    <a href="#">info@example.com</a>
                  </div>
                  <div>
                    <a href="#">example@example.com</a>
                  </div>
                  <h3 className="mt-4">Address</h3>
                  <div>
                    B-18X, Rajaji Puram
                    <br />
                    Lucknow, Uttar Pradesh, 226017
                    <br />
                    0522400XXXX
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="card shadow border-0">
                <div className="card-body p-5">
                  <form action="">
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <label htmlFor="" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Enter Name"
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <label htmlFor="" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control form-control-lg"
                          placeholder="Enter Email"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <label htmlFor="" className="form-label">
                          Phone
                        </label>
                        <input
                          type="tel"
                          className="form-control form-control-lg"
                          placeholder="Phone Number"
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <label htmlFor="" className="form-label">
                          Subject
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Subject"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="" className="form-label">
                        Message
                      </label>
                      <textarea
                        name=""
                        id=""
                        rows={5}
                        placeholder="Message"
                        className="form-control form-control-lg"
                      ></textarea>
                    </div>
                    <button className="btn btn-primary large-btn mt-3">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUs;
