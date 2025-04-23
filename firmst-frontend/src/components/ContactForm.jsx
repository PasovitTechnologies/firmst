import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // or use your own custom style
import "react-toastify/dist/ReactToastify.css";

const ContactForm = ({ contactFormRef }) => {
  const { t, i18n } = useTranslation();
  const isRussian = i18n.language === "ru";

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    specialization: "",
    email: "",
    acceptTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handlePhoneChange = (phone) => {
    setFormData({ ...formData, phone });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/firmst-form/submit-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success(t("requestForm.success_message"), {
          position: "top-center",
        });
        console.log(data.message);

        setFormData({
          firstName: "",
          middleName: "",
          lastName: "",
          phone: "",
          specialization: "",
          email: "",
          acceptTerms: false,
        });
      } else {
        const errorData = await response.json();
        console.error("Error from server:", errorData.message);
        toast.error(t("requestForm.error_message"), { position: "top-center" });
      }
    } catch (err) {
      console.error("Error submitting the form:", err);
      toast.error(t("requestForm.network_error_message"), {
        position: "top-center",
      });
    }
  };

  return (
    <div id="contact-form" ref={contactFormRef} className="max-w-5xl px-4 md:px-0 mx-auto">
      <ToastContainer />
      <div className="bg-white p-6 mt-10 md:p-8 rounded-xl shadow-gray-300 shadow-2xl border-3 border-gray-300 md:border-gray-200">
        <h3
          className="text-xl mt-2 md:text-[1.35rem] font-extrabold text-center text-[#cf6239] uppercase leading-6 tracking-wide"
          dangerouslySetInnerHTML={{ __html: t("requestForm.heading") }}
        ></h3>

        <form onSubmit={handleSubmit} className="md:max-w-[70%] mx-auto mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {/* Name Fields - Language-dependent order */}
            {isRussian ? (
              <>
                <div>
                  <label className="block mb-1 text-gray-500">{t("requestForm.lastName")}</label>
                  <input
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    type="text"
                    name="lastName"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#cf6239]"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-500">{t("requestForm.firstName")}</label>
                  <input
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    type="text"
                    name="firstName"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#cf6239]"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-500">{t("requestForm.middleName")}</label>
                  <input
                    value={formData.middleName}
                    onChange={handleChange}
                    type="text"
                    name="middleName"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#cf6239]"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block mb-1 text-gray-500">{t("requestForm.firstName")}</label>
                  <input
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    type="text"
                    name="firstName"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#cf6239]"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-500">{t("requestForm.middleName")}</label>
                  <input
                    value={formData.middleName}
                    onChange={handleChange}
                    type="text"
                    name="middleName"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#cf6239]"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-500">{t("requestForm.lastName")}</label>
                  <input
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    type="text"
                    name="lastName"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#cf6239]"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block mb-1 text-gray-500">{t("requestForm.contact")}</label>
              <PhoneInput
                country={"ru"}
                value={formData.phone}
                onChange={handlePhoneChange}
                inputProps={{
                  name: "phone",
                  required: true,
                  className: "w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#cf6239] pl-10",
                }}
                containerClass="w-full"
                inputClass="w-full pl-12 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#cf6239]"
                buttonClass="border-none bg-transparent"
                dropdownStyle={{ zIndex: 1000 }}
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-500">{t("requestForm.specialization")}</label>
              <input
                value={formData.specialization}
                onChange={handleChange}
                required
                type="text"
                name="specialization"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#cf6239]"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-500">{t("requestForm.email")}</label>
              <input
                value={formData.email}
                onChange={handleChange}
                required
                type="email"
                name="email"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#cf6239]"
              />
            </div>
          </div>

          <div className="mx-auto mt-5">
            <p className="text-xs text-gray-500 mt-4 tracking-wide leading-tight">{t("requestForm.content")}</p>

            <div className="flex items-center gap-2 mt-3">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                required
                id="acceptTerms"
                className="w-4 h-4"
              />
              <label className="text-[0.8rem] text-gray-500">{t("requestForm.accept_terms")}</label>
            </div>

            <button
              type="submit"
              disabled={!formData.acceptTerms}
              className="disabled:opacity-70 disabled:cursor-not-allowed bg-[#cf6239] hover:bg-[#b24e2a] transition text-white tracking-wider py-3 w-[50%] text-sm cursor-pointer block mx-auto rounded mt-4 font-bold"
            >
              {t("requestForm.button")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
