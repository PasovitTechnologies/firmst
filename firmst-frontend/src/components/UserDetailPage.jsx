import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UserDetailPage.css";

const UserDetailPage = () => {
  const { t, i18n } = useTranslation();
  const { userEmail } = useParams();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState({});
  const baseURL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetch(`${baseURL}/api/firmst-form/user-detail/${userEmail}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserDetails(data);
        setStatus(data.status || "Active");
        setNotes(data.notes || "");
      })
      .catch((error) => console.error("Error fetching user details:", error));
  }, [userEmail]);

  const handleChange = (e) => {
    setEditedDetails({
      ...editedDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const saveChanges = () => {
    const token = localStorage.getItem("token");

    fetch(`${baseURL}/api/firmst-form/user-detail/${userEmail}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status,
        notes,
        ...editedDetails,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserDetails(data);
        toast.success(t("userDetails.successMessage"), { position: "top-center" });
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error saving changes:", error);
        toast.error(t("userDetails.errorMessage"), { position: "top-center" });
      });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const deleteUser = () => {
    const token = localStorage.getItem("token");

    fetch(`${baseURL}/api/firmst-form/user-detail/${userEmail}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        toast.success(t("userDetails.deleteSuccess"), { position: "top-center" });
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      })
      .catch(() => {
        toast.error(t("userDetails.deleteFail"), { position: "top-center" });
      });
  };

  const renderFullName = () => {
    if (!userDetails) return "";

    const { firstName = "", middleName = "", lastName = "" } = userDetails;

    return i18n.language === "ru"
      ? `${lastName} ${firstName} ${middleName}`.trim()
      : `${firstName} ${middleName} ${lastName}`.trim();
  };

  return (
    <div className="outer-container">
      <ToastContainer />

      <header className="page-header">
        <h1>{t("userDetails.header")}</h1>
      </header>

      <div className="user-detail-container">
        {userDetails ? (
          <>
            <div className="user-detail-header">
              <h2>{t("userDetails.userInformation")}</h2>
              <div>
                {isEditing ? (
                  <>
                    <button className="save-btn" onClick={saveChanges}>
                      {t("userDetails.save")}
                    </button>
                    <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                      {t("userDetails.cancel")}
                    </button>
                  </>
                ) : (
                  <button className="edit-btn" onClick={toggleEdit}>
                    {t("userDetails.edit")}
                  </button>
                )}
              </div>
            </div>

            <div className="user-detail-card">
              {/* First, Middle, Last Name */}
              {["firstName", "middleName", "lastName"].map((field) => (
                <div key={field} className="input-group">
                  <label>{t(`userDetails.${field}`)}</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name={field}
                      value={editedDetails[field] ?? userDetails[field] ?? ""}
                      onChange={handleChange}
                      className="editable-input"
                    />
                  ) : (
                    <p className="readonly-input">{userDetails[field] || "-"}</p>
                  )}
                </div>
              ))}

              {/* Email and Phone */}
              {["email", "phone", "specialization"].map((field) => (
                <div key={field} className="input-group">
                  <label>{t(`userDetails.${field}`)}</label>
                  {isEditing && field !== "email" ? (
                    <input
                      type="text"
                      name={field}
                      value={editedDetails[field] ?? userDetails[field] ?? ""}
                      onChange={handleChange}
                      className="editable-input"
                    />
                  ) : (
                    <p className="readonly-input">{userDetails[field]}</p>
                  )}
                </div>
              ))}

              {/* Status Dropdown */}
              <div className="input-group">
                <label>{t("userDetails.status")}</label>
                <select
                  value={status}
                  onChange={handleStatusChange}
                  className="readonly-input"
                  disabled={!isEditing}
                >
                  <option value="Completed">{t("userDetails.completed")}</option>
                  <option value="Pending">{t("userDetails.pending")}</option>
                  <option value="Uncontacted">{t("userDetails.uncontacted")}</option>
                </select>
              </div>
            </div>

            {/* Notes Section */}
            <div className="notes-section">
              <label>{t("userDetails.notes")}</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className={isEditing ? "editable-input notes-box" : "readonly-input notes-box"}
              />
            </div>

            {/* Delete Button */}
            <div className="delete-container">
              <button className="delete-btn" onClick={deleteUser}>
                {t("userDetails.deleteUser")}
              </button>
            </div>
          </>
        ) : (
          <p>{t("userDetails.loading")}</p>
        )}
      </div>
    </div>
  );
};

export default UserDetailPage;
