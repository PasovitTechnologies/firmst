import { useTranslation } from "react-i18next";
import { IoStar } from "react-icons/io5";

const InfoCards = () => {
  const { t } = useTranslation();

  const features = [
    {
      desc: t("success_stories.story1"),
    },
    {
      desc: t("success_stories.story2"),
    },
    {
      desc: t("success_stories.story3"),
    },
    {
      desc: t("success_stories.story4"),
    },
  ];

  return (
    <div className="max-w-5xl  mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 px-4 md:px-1  my-12">
      {features.map((feature, index) => (
        <div
          key={index}
          className="relative bg-gradient-to-br from-[#021e6b] to-[#7b4348] text-white px-2 pt-5 pb-2 rounded-2xl shadow-lg flex flex-col justify-between min-h-[150px] md:min-h-[200px]"
        >
          <p
            className="font-[330] text-[0.8rem] md:text-base leading-[1.25] px-1 md:pl-3 md:pr-6"
            dangerouslySetInnerHTML={{ __html: feature.desc }}
          ></p>
          <div className=" relative h-10 md:h-10 ">
            <div className="absolute bottom-0 right-0 bg-[#cf6239] w-8 h-8 flex items-center justify-center rounded-full shadow-md">
              <IoStar />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoCards;
