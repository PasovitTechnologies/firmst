import React from "react";
import { useTranslation } from "react-i18next";

const FeedbackBanner = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-r from-[#10256a] to-[#cd5c35] py-7 mx-3  px-4 rounded-2xl max-w-5xl md:mx-auto mt-12">
      <div className="text-white text-center text-xl md:text-2xl font-bold leading-tight tracking-wide">
        <p className="text-2xl md:text-3xl font-[900] mb-4">
          {t("feedback.heading")}
        </p>{" "}
        <p dangerouslySetInnerHTML={{ __html: t("feedback.subheading") }}></p>
      </div>
    </div>
  );
};

export default FeedbackBanner;
