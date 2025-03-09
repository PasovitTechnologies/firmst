import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const { t } = useTranslation(); // i18n hook
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseURL}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        toast.success(t("LoginPage.loginSuccess"), { autoClose: 2000 });
        setTimeout(() => {
          navigate("/dashboard");
          window.location.reload();
        }, 2000);
      } else {
        toast.error(t("LoginPage.loginError"));
      }
    } catch (err) {
      console.error("Error during login:", err);
      toast.error(t("LoginPage.loginFailed"));
    }
  };

  return (
    <div className="login-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <form onSubmit={handleSubmit} className="login-form">
        <h2>{t("LoginPage.title")}</h2>

        <div className="form-group">
          <label htmlFor="email">{t("LoginPage.emailLabel")}</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("LoginPage.emailPlaceholder")}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">{t("LoginPage.passwordLabel")}</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("LoginPage.passwordPlaceholder")}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          {t("LoginPage.loginButton")}
        </button>
      </form>
    </div>
  );
};

export default Login;
