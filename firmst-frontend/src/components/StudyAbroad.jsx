import { useTranslation } from "react-i18next";

const StudyAbroad = () => {
  const { t } = useTranslation();

  return (
    <div className="  mt-10   px-4">
      <div className="bg-[#f3f6fb] flex flex-col md:flex-row shadow-gray-300 shadow-2xl max-w-5xl mx-auto border-3 overflow-hidden border-gray-300 md:border-gray-200 rounded-xl">
        <div className="md:w-1/2 p-4 pb-0  md:p-8 md:pr-0  ">
          <img
            src="/images/FIRMST_SA_Hor_Logo.png"
            className="w-32 mb-4"
            alt=""
          />
          <div className=" flex flex-col gap-4 text-[0.86rem] leading-[1.01rem] tracking-[0.005em] text-[#4464a4]">
            <p>{t("studyAbroad.paragraph1")}</p>

            <p>
              {" "}
              <span className="font-bold text-[#072469]">
                {t("studyAbroad.heading")}
              </span>{" "}
              <br />
              {t("studyAbroad.paragraph2")}
            </p>

            <p> {t("studyAbroad.paragraph3")}</p>
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <img
            src="/images/study-abroad-img.jpg"
            alt=""
            className="h-full object-cover"
          />
          <div className="h-full w-full absolute top-0  bg-gradient-to-t  md:bg-gradient-to-l from-transparent via-80% via-transparent to-100% to-[#f3f6fb]"></div>
        </div>
      </div>
    </div>
  );
};

export default StudyAbroad;
