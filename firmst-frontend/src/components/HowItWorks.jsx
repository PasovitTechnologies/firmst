import React from "react";
import { useTranslation } from "react-i18next";
import { FaArrowRight, FaCheck } from "react-icons/fa";

const HowItWorks = () => {
  const { t } = useTranslation();

  const steps = [
    {
      title: t("process.steps.0.title"),
      description: t("process.steps.0.description"),
      icon: (
        <FaArrowRight className="bg-purple-900 p-2 text-white w-8 h-8 rounded-full" />
      ),
    },
    {
      title: t("process.steps.1.title"),
      description: t("process.steps.1.description"),
      icon: (
        <FaArrowRight className="bg-purple-900 p-2 text-white w-8 h-8 rounded-full" />
      ),
    },
    {
      title: t("process.steps.2.title"),
      description: t("process.steps.2.description"),
      icon: (
        <FaArrowRight className="bg-purple-900 p-2 text-white w-8 h-8 rounded-full" />
      ),
    },
    {
      title: t("process.steps.3.title"),
      description: t("process.steps.3.description"),
      icon: (
        <FaArrowRight className="bg-purple-900 p-2 text-white w-8 h-8 rounded-full" />
      ),
    },
    {
      title: t("process.steps.4.title"),
      description: t("process.steps.4.description"),
      icon: (
        <FaCheck className="bg-green-500 p-2 text-white w-8 h-8 rounded-full" />
      ),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-3 md:px-0 mt-10">
      <h2 className="text-center text-2xl font-bold text-blue-900 mb-8">
        {t("process.heading")}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white border-dashed border-2 border-gray-400 relative p-6 rounded-2xl"
          >
            <h3 className="text-[#cf6239] font-bold md:text-lg mb-3">
              {step.title}
            </h3>
            <p className="text-blue-900 font-medium text-sm md:text-base leading-tight mb-6 md:mb-12">
              {step.description}
            </p>
            <div className="absolute bottom-2 right-2 w-8 h-8 flex items-center justify-center rounded-full">
              {step.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
