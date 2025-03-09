import React from "react";
import { useTranslation } from "react-i18next";

const HospitalsList = () => {
  const { t } = useTranslation();

  const locations = t("programs.locations", { returnObjects: true });

  // console.log(locations);

  return (
    <div className="relative rounded-2xl overflow-hidden px-4 mt-12 max-w-5xl mx-auto">
      <div className=" rounded-2xl">
        <div className="md:w-1/2 h-72 md:h-full md:absolute inset-0">
          <img
            src="/images/image2.jpg"
            alt="Two female medical professionals reviewing information on a tablet"
            className="w-full md:h-full object-cover md:opacity-50"
          />
          <div className=" mx-4 md:m-0 absolute rounded-2xl inset-0 bg-[#cf6239] opacity-50"></div>
        </div>

        <div className="relative ml-auto  w-full md:w-[63%] rounded-t-none bg-[#002379] p-4 md:p-6 rounded-2xl md:rounded-t-2xl">
          <h2
            className="text-white text-lg leading-6 font-semibold mb-4 "
            dangerouslySetInnerHTML={{ __html: t("programs.heading") }}
          ></h2>

          <div className="flex flex-col gap-5">
            {locations.map((location, index) => (
              <div key={index} className="bg-[#cf6239] rounded-2xl p-4 ">
                <h3 className="text-white text-xl tracking-wide font-[450] mb-2">
                  {location.title}
                </h3>
                <ul className="text-white -space-y-1 font-[350]">
                  {location.points.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalsList;
