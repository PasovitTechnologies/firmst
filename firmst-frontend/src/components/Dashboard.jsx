import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Dashboard.css";

const Dashboard = () => {
  const { t } = useTranslation();
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

      const userName = user.name ? user.name.toLowerCase() : "";
      const userEmail = user.email ? user.email.toLowerCase() : "";
      const userPhone = user.phone ? user.phone : "";

      const searchTermLower = searchTerm.toLowerCase();

      const matchesSearchTerm =
        userName.includes(searchTermLower) ||
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
    <h3>{user.name || "No Name"}</h3>
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
