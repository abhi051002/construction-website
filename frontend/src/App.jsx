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
import Login from "./components/backend/Login";
import NotFound from "./components/frontend/NotFound";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/backend/Dashboard";
import RequireAuth from "./components/RequireAuth";
import { default as ShowServices } from "./components/backend/services/Show";
import { default as CreateServices } from "./components/backend/services/Create";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <ToastContainer position="bottom-right" />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact-us" element={<ContactUs />} />

          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route path="/admin/services" element={<ShowServices />} />
          <Route path="/admin/services/create" element={<CreateServices />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
