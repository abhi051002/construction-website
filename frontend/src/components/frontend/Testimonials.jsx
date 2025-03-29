import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import AvatarImg from "../../assets/images/author-2.jpg";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { ChevronDownCircle, ChevronLeft, ChevronRight } from "lucide-react";
import FiveStar from "../FiveStar";
import { Container, Row, Col } from "react-bootstrap";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const swiperRef = useRef(null);
  const swiper = useSwiper();

  const fetchLatestTestimonials = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/get-testimonials`
      );
      const result = await response.json();
      setTestimonials(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLatestTestimonials();
  }, []);

  const handlePrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <section className="section-5 py-5 position-relative">
      <Container>
        <div className="section-header text-center mb-5">
          <span>Testimonials</span>
          <h2>What people are saying about us</h2>
          <p>
            We offer a diverse array of construction services, spanning
            residential, commercial, and industrial projects.
          </p>
        </div>

        <div className="position-relative d-flex justify-content-center align-items-center">
          {/* Left Button */}
          <div className="position-absolute start-0 top-50 translate-middle-y z-1">
            <button
              onClick={handlePrevSlide}
              className="bg-white border border-secondary p-3 rounded-circle
              shadow-lg"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 text-secondary" />
            </button>
          </div>

          {/* Swiper Container */}
          <div className="w-100 px-5">
            <Swiper
              ref={swiperRef}
              modules={[Pagination, Autoplay, Navigation]}
              spaceBetween={50}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 30 },
                1024: { slidesPerView: 3, spaceBetween: 50 },
              }}
              className="testimonials-swiper"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="card shadow border-0">
                    <div className="card-body p-4">
                      <div className="rating">
                        <FiveStar />
                      </div>
                      <div className="content pt-4 pb-2">
                        <p>{testimonial.testimonial}</p>
                      </div>
                      <hr />
                      <div className="d-flex">
                        <div>
                          {testimonial?.image ? (
                            <img
                              src={`${
                                import.meta.env.VITE_FILE_URL
                              }/uploads/testimonials/small/${
                                testimonial.image
                              }`}
                              alt="Avatar"
                              width={50}
                              className="rounded-circle"
                            />
                          ) : (
                            <img
                              src={AvatarImg}
                              alt="Avatar"
                              width={50}
                              className="rounded-circle"
                            />
                          )}
                        </div>
                        <div className="ps-3">
                          <div className="fw-semibold">
                            {testimonial.citation}
                          </div>
                          <div className="small text-muted">
                            {testimonial?.designation || "CEO"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Right Button */}
          <div className="position-absolute end-0 top-50 translate-middle-y z-1">
            <button
              onClick={handleNextSlide}
              className="bg-white border border-secondary p-3 rounded-circle shadow-lg"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 text-secondary" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
