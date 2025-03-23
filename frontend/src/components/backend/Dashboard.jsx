import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import {
  PieChart,
  BarChart,
  Activity,
  Users,
  Package,
  FileText,
} from "lucide-react";
import useGetToken from "../../hooks/useGetToken";

const Dashboard = () => {
  const [services, setServices] = useState(0);
  const { token } = useGetToken();
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
        setServices(data.data.length);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [token]);
  const stats = [
    {
      title: "Total Visitors",
      value: "3,458",
      change: "+12.5%",
      icon: <Users size={24} />,
      color: "primary",
    },
    {
      title: "New Projects",
      value: "28",
      change: "+3.2%",
      icon: <Package size={24} />,
      color: "success",
    },
    {
      title: "Completed Tasks",
      value: "156",
      change: "+8.7%",
      icon: <FileText size={24} />,
      color: "info",
    },
    {
      title: "Active Services",
      value: services,
      change: "+5.1%",
      icon: <Activity size={24} />,
      color: "warning",
    },
  ];

  return (
    <main className="dashboard-container bg-light py-4">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-3">
            {/* Sidebar */}
            <Sidebar activePage="dashboard" />
          </div>

          <div className="col-lg-9 dashboard">
            {/* Welcome Header */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="text-muted fw-normal mb-1">Welcome back</h5>
                    <h3 className="fw-bold">Admin Console</h3>
                  </div>
                  <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="row g-4 mb-4">
              {stats.map((stat, index) => (
                <div className="col-md-6 col-xl-3" key={index}>
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body p-3">
                      <div
                        className={`d-inline-flex align-items-center justify-content-center bg-${stat.color} bg-opacity-10 p-3 rounded mb-3`}
                      >
                        {React.cloneElement(stat.icon, {
                          className: `text-${stat.color}`,
                        })}
                      </div>
                      <h3 className="fw-bold mb-1">{stat.value}</h3>
                      <p className="text-muted mb-0">{stat.title}</p>
                      <span
                        className={`badge bg-${stat.color} bg-opacity-10 text-${stat.color} mt-2 px-2 py-1 rounded-pill`}
                      >
                        {stat.change}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="row g-4">
              <div className="col-md-8">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-header bg-transparent border-0 pt-4 pb-0">
                    <h5 className="mb-0">Monthly Overview</h5>
                  </div>
                  <div className="card-body p-4">
                    <div className="text-center" style={{ height: "240px" }}>
                      <BarChart
                        size={280}
                        className="text-secondary opacity-50"
                      />
                      <p className="text-muted mt-2">
                        Sample chart visualization
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-header bg-transparent border-0 pt-4 pb-0">
                    <h5 className="mb-0">Project Status</h5>
                  </div>
                  <div className="card-body p-3 text-center">
                    <div
                      style={{ height: "240px" }}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <PieChart
                        size={180}
                        className="text-primary opacity-50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
