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
        "http://localhost:4004/api/firmst-form/submit-form",
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
         {/* Name Section */}
<div className="col-span-1 md:col-span-2">
  <label className="block mb-2 text-gray-700 font-semibold uppercase text-sm">
    {t("requestForm.fullNameHeading") || "Name"}
  </label>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
    {isRussian ? (
      <>
        {["lastName", "firstName", "middleName"].map((field, i) => (
          <div key={i}>
            <label className="block mb-1 text-gray-500">
              {t(`requestForm.${field}`)}
              {(field === "lastName" || field === "firstName") && (
                <span className="text-red-500">*</span>
              )}
            </label>
            <input
              type="text"
              name={field}
              required={field !== "middleName"}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#cf6239]"
            />
          </div>
        ))}
      </>
    ) : (
      <>
        {["firstName", "middleName", "lastName"].map((field, i) => (
          <div key={i}>
            <label className="block mb-1 text-gray-500">
              {t(`requestForm.${field}`)}
              {(field === "firstName" || field === "lastName") && (
                <span className="text-red-500">*</span>
              )}
            </label>
            <input
              type="text"
              name={field}
              required={field !== "middleName"}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#cf6239]"
            />
          </div>
        ))}
      </>
    )}
  </div>
</div>

{/* Contact Info Row */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-6">
  <div>
    <label className="block mb-1 text-gray-500">
      {t("requestForm.contact")} <span className="text-red-500">*</span>
    </label>
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
    <label className="block mb-1 text-gray-500">
      {t("requestForm.email")} <span className="text-red-500">*</span>
    </label>
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      required
      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#cf6239]"
    />
  </div>
</div>
<div>
  <label className="block mb-1 text-gray-500 mt-8">
    {t("requestForm.specialization")} <span className="text-red-500">*</span>
  </label>
  <input
    value={formData.specialization}
    onChange={handleChange}
    required
    type="text"
    name="specialization"
    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#cf6239]"
  />
</div>




          <div className="mx-auto mt-5">

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
              <label className="text-[0.8rem] text-gray-500 mt-2">{t("requestForm.accept_terms")}</label>
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
