import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const HeroSection = ({ contactFormRef }) => {
  const { t } = useTranslation();

  const scrollToForm = () => {
    contactFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative lg:min-h-[55vh] flex items-center justify-center text-white bg-[#cf6239] mt-20">
      <div className="relative w-full  md:py-0 h-full z-10 flex flex-col-reverse md:flex-row md:items-center items-end md:justify-between max-w-6xl mx-auto  md:px-0">
        <div className="absolute md:static w-[60%] md:w-[40%] left-6 top-6 text-left md:my-0  md:pl-4 lg:pl-20 z-30">
          <h2 className="text-3xl md:text-[2.5rem] font-[900] leading-tight drop-shadow-xl">
            {t("homepage.title")}
          </h2>

          <button
            onClick={scrollToForm}
            className="mt-4 md:mt-6 bg-[#002379] hover:bg-[#001379] cursor-pointer px-4 py-2 rounded text-base md:text-lg text-white shadow-black/60 shadow-md md:shadow-2xl"
          >
            {t("homepage.button")}
          </button>
        </div>

        <div
          className="w-[70vw]   md:mt-0
         md:w-[60%] flex  md:justify-center    h-full relative"
        >
          <img
            src="/images/heroImage.jpg"
            alt="Doctor"
            className="h-96 md:h-fit w-full object-cover object-left md:object-contain relative z-10"
          />
          <div
            className="h-full md:hidden absolute inset-0 z-20 bg-gradient-to-l from-transparent via-transparent to-[#cf6239] "
            // style={{
            //   background:
            //     "linear-gradient(to bottom, transparent 0%, transparent 20%, transparent 80%, #cf6239 100%)",
            // }}
          ></div>
          <div
            className="hidden md:block absolute inset-0 z-20"
            style={{
              background:
                "linear-gradient(to right, #cf6239 0%, transparent 20%, transparent 80%, #cf6239 100%)",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

HeroSection.propTypes = {
  contactFormRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }),
};

export default HeroSection;
