import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import { default as EditService } from "./components/backend/services/Edit";
import { default as ShowProjects } from "./components/backend/projects/Show";
import { default as CreateProjects } from "./components/backend/projects/Create";
import { default as EditProjects } from "./components/backend/projects/Edit";
import { default as ShowArticles } from "./components/backend/articles/Show";
import { default as CreateArticles } from "./components/backend/articles/Create";
import { default as EditArticles } from "./components/backend/articles/Edit";
import { default as ShowTestimonials } from "./components/backend/testimonials/Show";
import { default as CreateTestimonials } from "./components/backend/testimonials/Create";
import { default as EditTestimonials } from "./components/backend/testimonials/Edit";
import { default as ShowMembers } from "./components/backend/members/Show";
import { default as CreateMembers } from "./components/backend/members/Create";
import { default as EditMembers } from "./components/backend/members/Edit";

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

          <Route
            path="/admin"
            element={<Navigate to="/admin/dashboard" replace />}
          />
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
          <Route path="/admin/services/edit/:id" element={<EditService />} />

          <Route path="/admin/projects" element={<ShowProjects />} />
          <Route path="/admin/projects/create" element={<CreateProjects />} />
          <Route path="/admin/projects/edit/:id" element={<EditProjects />} />
          <Route path="/admin/articles" element={<ShowArticles />} />
          <Route path="/admin/articles/create" element={<CreateArticles />} />
          <Route path="/admin/articles/edit/:id" element={<EditArticles />} />

          <Route path="/admin/testimonials" element={<ShowTestimonials />} />
          <Route
            path="/admin/testimonials/create"
            element={<CreateTestimonials />}
          />
          <Route
            path="/admin/testimonials/edit/:id"
            element={<EditTestimonials />}
          />

          <Route path="/admin/members" element={<ShowMembers />} />
          <Route path="/admin/members/create" element={<CreateMembers />} />
          <Route path="/admin/members/edit/:id" element={<EditMembers />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
