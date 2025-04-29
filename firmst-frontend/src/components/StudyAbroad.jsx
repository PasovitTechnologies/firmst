import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

const StudyAbroad = () => {
  const { t } = useTranslation();

  return (
    <div className="mt-10 px-4">
      <div className="bg-[#f3f6fb] flex flex-col md:flex-row shadow-gray-300 shadow-2xl max-w-5xl mx-auto border-3 overflow-hidden border-gray-300 md:border-gray-200 rounded-xl">
        <div className="md:w-1/2 p-4 pb-0 md:p-8 md:pr-0">
          <img
            src="/images/FIRMST_SA_Hor_Logo.png"
            className="w-32 mb-4"
            alt="Firmst Logo"
          />
          <div className="flex flex-col gap-4 md:text-lg leading-5 md:leading-6 tracking-[0.005em] text-[#4464a4]">
            <p>{t("studyAbroad.paragraph1")}</p>

            <Dialog>
              <DialogTrigger asChild>
                <button className="bg-[#4464a4] text-white px-4 py-2 text-base rounded-lg cursor-pointer w-fit mx-auto hover:bg-[#35508a] transition">
                  {t("studyAbroad.heading")}
                </button>
              </DialogTrigger>
              <DialogContent className="px-3 md:px-5 md:max-w-[50vw]">
                <DialogHeader className="mt-4">
                  <DialogTitle className="md:text-2xl">
                    {t("studyAbroad.heading")}
                  </DialogTitle>
                  <DialogDescription className="md:text-lg">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: t("studyAbroad.paragraph2"),
                      }}
                      className="text-left"
                    ></p>
                    <p className="mt-2 text-left">
                      {t("studyAbroad.paragraph3")}
                    </p>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <img
            src="/images/study-abroad-img2.jpg"
            alt="Study abroad illustration"
            className="h-full object-cover  md:object-right"
          />
          <div className="h-full w-full absolute top-0 bg-gradient-to-t md:bg-gradient-to-l from-transparent via-80% via-transparent to-100% to-[#f3f6fb]"></div>
        </div>
      </div>
    </div>
  );
};

export default StudyAbroad;
