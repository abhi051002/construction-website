import React from "react";
import Hero from "./Hero";
import Footer from "./Footer";
import Aboutus from "./Aboutus";
import Header from "./Header";
import OurServices from "./OurServices";
import OurProjects from "./OurProjects";
import WhyChooseUs from "./WhyChooseUs";
import BlogNews from "./BlogNews";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <>
      <Hero />
      <Aboutus />
      <OurServices />
      <WhyChooseUs />
      <OurProjects />
      <Testimonials />
      <BlogNews />
    </>
  );
};

export default Home;
