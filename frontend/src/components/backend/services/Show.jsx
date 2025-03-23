import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar";
import useGetToken from "../../../hooks/useGetToken";
import { Briefcase, PlusCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Show = () => {
  const { token } = useGetToken();
  const [services, setServices] = useState([]);
  const fetchServices = async () => {
    try {
      if (token) {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/services`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        if (data.status) {
          setServices(data.data);
        }
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [token]);

  return (
    <main className="dashboard-container bg-light min-vh-100 py-4">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-3">
            {/* Sidebar */}
            <Sidebar activePage="services" />
          </div>
          <div className="col-md-9">
            <div className="card shadow border-0">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between">
                  <h4 className="h-5 d-flex">
                    <Briefcase size={28} className="me-2" />
                    Services
                  </h4>
                  <Link to="create" className="btn btn-primary d-flex gap-2">
                    <PlusCircleIcon />
                    Create
                  </Link>
                </div>
                <hr />
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Slug</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services ? (
                      services.map((service) => {
                        return (
                          <tr key={service.id}>
                            <td>{service.id}</td>
                            <td>{service.title}</td>
                            <td>{service.slug}</td>
                            <td>
                              <span
                                className={`badge ${
                                  service.status ? "bg-success" : "bg-danger"
                                } rounded-pill px-3 py-2`}
                              >
                                {service.status ? "Active" : "Block"}
                              </span>
                            </td>
                            <td>
                              <a href="" className="btn btn-primary btn-sm">
                                Edit
                              </a>
                              <a
                                href=""
                                className="btn btn-sm btn-secondary ms-2"
                              >
                                Delete
                              </a>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-center fw-bold text-danger"
                        >
                          No Service Available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Show;
