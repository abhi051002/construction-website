import React from "react";
import Hero from "./Hero";
import Footer from "./Footer";
import Aboutus from "./Aboutus";
import Header from "./Header";
import OurServices from "./OurServices";
import OurProjects from "./OurProjects";
import WhyChooseUs from "./WhyChooseUs";

const Home = () => {
  return (
    <>
      <Hero />
      <Aboutus />
      <OurServices />
      <WhyChooseUs />
      <OurProjects />
    </>
  );
};

export default Home;
