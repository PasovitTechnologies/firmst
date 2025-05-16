import React, { useState } from "react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
//
const FeedbackSection = () => {
  const { t } = useTranslation();

  const feedbacks = t("feedbacks.content", { returnObjects: true });

  const [selectedFeedback, setSelectedFeedback] = useState(null);

  return (
    <div className="px-3 md:px-0 mt-12 flex flex-col items-center">
      <div className="bg-white rounded-2xl shadow-lg px-4 py-10 max-w-5xl w-full mx-auto relative">
      {/* Navigation Buttons */}
      <button className="swiper-button-prev absolute top-1/2 -translate-y-1/2 left-2 z-10  text-white p-2 rounded-full ">
      <HiOutlineChevronLeft className="w-4 h-4" size={10}/>      </button>
      <button className="swiper-button-next absolute top-1/2 -translate-y-1/2 right-2 z-10  text-white p-2 rounded-full ">
      <HiOutlineChevronRight className="w-4 h-4" />      </button>

      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={20}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {feedbacks.map((feedback, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center gap-4 p-4 text-center bg-white rounded-2xl shadow border border-gray-200">
              <img
                src={feedback.userImage}
                className="w-48 h-48 rounded-full object-cover bg-gray-300"
                alt="study abroad"
              />
              <div>
                <h3 className="font-bold text-[#cf6239]">
                  {feedback.name.toUpperCase()}
                </h3>
                <p className="text-purple-900 text-sm mt-2">
                  {feedback.designation}
                </p>
              </div>

              <button
                className="mt-2 text-sm border border-black px-4 py-2 rounded-md hover:bg-black hover:text-white transition"
                onClick={() => setSelectedFeedback(feedback)}
              >
                {t("feedbacks.button")}
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

      <Dialog
        open={!!selectedFeedback}
        onOpenChange={() => setSelectedFeedback(null)}
      >
        <DialogOverlay className="bg-black bg-opacity-25 backdrop-blur-md" />
        <DialogContent className="lg:max-w-[80vw] max-h-[80vh] mx-auto bg-white rounded-lg shadow-lg p-2 lg:p-6 overflow-y-auto">
          {selectedFeedback && (
            <>
              <img
                src={selectedFeedback.userImage}
                alt={selectedFeedback.name}
                className="w-20 h-20 rounded-full object-cover mx-auto"
              />
              <div className="text-center">
                <h3 className="font-bold text-[#cf6239] ">
                  {selectedFeedback.name.toUpperCase()}
                </h3>
                <p className="text-purple-900 mb-4">
                  {selectedFeedback.designation}
                </p>
              </div>
              <div className="text-gray-700 space-y-4">
                {selectedFeedback.location && (
                  <p>
                    <strong>{selectedFeedback.where}</strong> <br />{" "}
                    {selectedFeedback.location}
                  </p>
                )}
                {selectedFeedback.field && (
                  <p>
                    <strong> {selectedFeedback.fieldHead}</strong>
                    <br />
                    {selectedFeedback.field}
                  </p>
                )}
                {selectedFeedback.duration && (
                  <p>
                    <strong> {selectedFeedback.durationHead}</strong>
                    <br />
                    {selectedFeedback.duration}
                  </p>
                )}
                {selectedFeedback.role && (
                  <p>
                    <strong>{selectedFeedback.roleHead}</strong>
                    <br />
                    {selectedFeedback.role}
                  </p>
                )}
                {selectedFeedback.impact && (
                  <p>
                    <strong>{selectedFeedback.impactHead}</strong>
                    <br />
                    {selectedFeedback.impact}
                  </p>
                )}
                {selectedFeedback.experience && (
                  <p>
                    <strong>{selectedFeedback.experienceHead}</strong>
                    <br />
                    {selectedFeedback.experience}
                  </p>
                )}
                {selectedFeedback.finding && (
                  <p>
                    <strong>{selectedFeedback.findingHead}</strong>
                    <br />
                    {selectedFeedback.finding}
                  </p>
                )}
                {selectedFeedback.projects && (
                  <p>
                    <strong>{selectedFeedback.projectsHead}</strong>
                    <br />
                    {selectedFeedback.projects}
                  </p>
                )}
                {selectedFeedback.advice && (
                  <p>
                    <strong>{selectedFeedback.adviceHead}</strong>
                    <br />
                    {selectedFeedback.advice}
                  </p>
                )}
                {selectedFeedback.difficulties && (
                  <p>
                    <strong>{selectedFeedback.difficultiesHead}</strong>
                    <br />
                    {selectedFeedback.difficulties}
                  </p>
                )}
                {selectedFeedback.sponsor && (
                  <p>
                    <strong>{selectedFeedback.sponsorHead}</strong>
                    <br />
                    {selectedFeedback.sponsor}
                  </p>
                )}
              </div>

              <div className="mt-4 w-full">
                <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 p-2">
                  <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 p-2">
  {selectedFeedback?.images?.map((src, index) => (
    <img
      key={index}
      src={src}
      alt={`Gallery ${index}`}
      className="w-full rounded-lg object-cover break-inside-avoid shadow-md"
    />
  ))}
</div>

                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FeedbackSection;
