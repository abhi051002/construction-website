import React from "react";
import Hero from "./Hero";
import Footer from "./Footer";
import Aboutus from "./Aboutus";
import Header from "./Header";
import OurServices from "./OurServices";
import OurProjects from "./OurProjects";
import WhyChooseUs from "./WhyChooseUs";
import Testimonals from "./Testimonals";
import BlogNews from "./BlogNews";

const Home = () => {
  return (
    <>
      <Hero />
      <Aboutus />
      <OurServices />
      <WhyChooseUs />
      <OurProjects />
      <Testimonals />
      <BlogNews />
    </>
  );
};

export default Home;
