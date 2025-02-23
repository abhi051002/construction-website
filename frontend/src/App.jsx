import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/frontend/Home";
import About from "./components/frontend/About";
import "./assets/css/style.scss";
import Header from "./components/frontend/Header";
import Footer from "./components/frontend/Footer";
import Projects from "./components/frontend/Projects";
import Services from "./components/frontend/Services";
import Blogs from "./components/frontend/Blogs";
import ContactUs from "./components/frontend/ContactUs";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
