import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Dashboard.css";

const Dashboard = () => {
  const { t, i18n } = useTranslation(); // Access current language via i18n
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${baseURL}/api/firmst-form/user-data`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unauthorized access or invalid token");
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Expected JSON, got something else");
        }

        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
          setFilteredUsers(data);
        } else {
          throw new Error("Invalid data format");
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setUsers([]);
        navigate("/login");
      });
  }, [navigate]);

  useEffect(() => {
    const filtered = users.filter((user) => {
      if (!user) return false;

      const fullName = `${user.firstName || ""} ${user.middleName || ""} ${user.lastName || ""}`.toLowerCase();
      const userEmail = user.email ? user.email.toLowerCase() : "";
      const userPhone = user.phone ? user.phone : "";

      const searchTermLower = searchTerm.toLowerCase();

      const matchesSearchTerm =
        fullName.includes(searchTermLower) ||
        userEmail.includes(searchTermLower) ||
        userPhone.includes(searchTerm);

      const matchesStatus =
        statusFilter === "All" || (user.status && user.status === statusFilter);

      return matchesSearchTerm && matchesStatus;
    });

    setFilteredUsers(filtered);
  }, [searchTerm, statusFilter, users]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleUserClick = (userEmail) => {
    navigate(`/user-detail/${userEmail}`);
  };

  // Function to construct the name based on language
  const getFullName = (user) => {
    if (i18n.language === "ru") {
      // Russian format: Last Name, First Name, Middle Name
      return `${user.lastName || ""} ${user.firstName || ""} ${user.middleName || ""}`.trim();
    } else {
      // Default format: First Name, Middle Name, Last Name
      return `${user.firstName || ""} ${user.middleName || ""} ${user.lastName || ""}`.trim();
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-title">{t("dashboard.title")}</h2>

        <div className="filter-section">
          <div className="search-filter-wrapper">
            <input
              type="text"
              placeholder={t("dashboard.searchPlaceholder")}
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            <select value={statusFilter} onChange={handleStatusChange} className="status-select">
              <option value="All">{t("dashboard.allStatus")}</option>
              <option value="Completed">{t("dashboard.completed")}</option>
              <option value="Pending">{t("dashboard.pending")}</option>
              <option value="Uncontacted">{t("dashboard.uncontacted")}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="user-list">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <div
              key={`${user.email}-${index}`}
              className={`user-card ${user.status?.toLowerCase()}`} // Add status class conditionally
              onClick={() => handleUserClick(user.email)}
            >
              <div className="user-card-content">
                <h3>{getFullName(user) || "No Name"}</h3>
                <p>{user.email || "No Email"}</p>
                <p><span>{t("dashboard.status")}</span>: {user.status || "Unknown"}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-users">{t("dashboard.noUsers")}</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
