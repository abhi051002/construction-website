import React, { useContext } from "react";
import { AuthContext } from "./backend/context/Auth";
import {
  Home,
  Briefcase,
  FolderOpen,
  FileText,
  Settings,
  LogOut,
  Users,
} from "lucide-react";

const Sidebar = ({ activePage = "dashboard" }) => {
  const { logout } = useContext(AuthContext);

  const menuItems = [
    {
      icon: <Home size={18} />,
      title: "Dashboard",
      link: "/admin/dashboard",
      id: "dashboard",
    },
    {
      icon: <Briefcase size={18} />,
      title: "Services",
      link: "/admin/services",
      id: "services",
    },
    {
      icon: <FolderOpen size={18} />,
      title: "Projects",
      link: "#",
      id: "projects",
    },
    {
      icon: <FileText size={18} />,
      title: "Articles",
      link: "#",
      id: "articles",
    },
    { icon: <Users size={18} />, title: "Clients", link: "#", id: "clients" },
    {
      icon: <Settings size={18} />,
      title: "Settings",
      link: "#",
      id: "settings",
    },
  ];

  return (
    <div className="sidebar card border-0 shadow-sm sticky-top">
      <div className="card-body p-0">
        {/* Brand Header */}
        <div className="brand-header p-4 border-bottom">
          <h4 className="mb-0 fw-bold text-primary">UrbanEdge</h4>
          <p className="text-muted small mb-0">Admin Panel</p>
        </div>

        {/* Menu Links */}
        <div className="p-3">
          <p className="text-uppercase text-muted small fw-bold ms-3 mt-2 mb-3">
            Main Menu
          </p>
          <ul className="nav flex-column">
            {menuItems.map((item) => (
              <li className="nav-item mb-1" key={item.id}>
                <a
                  href={item.link}
                  className={`nav-link d-flex align-items-center rounded py-2 px-3 ${
                    activePage === item.id
                      ? "active bg-primary text-white"
                      : "text-body"
                  }`}
                >
                  <span className="me-3">{item.icon}</span>
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Logout Section */}
        <div className="p-3 mt-auto border-top">
          <button
            className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center"
            onClick={() => logout()}
          >
            <LogOut size={18} className="me-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
