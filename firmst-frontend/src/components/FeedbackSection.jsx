import React, { useState } from "react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

//
const FeedbackSection = () => {
  const { t } = useTranslation();

  const feedbacks = t("feedbacks.content", { returnObjects: true });

  const [selectedFeedback, setSelectedFeedback] = useState(null);

  return (
    <div className="px-3 md:px-0 mt-12 flex flex-col items-center">
      <div className="bg-white rounded-2xl shadow-lg px-8 py-7 max-w-5xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.map((feedback, index) => (
            <Card
              key={index}
              className="flex flex-col items-center gap-4 p-4 text-center "
            >
              <img
                src={feedback.userImage}
                className="w-48 h-48 rounded-full  object-cover bg-gray-300 "
              />
              <div>
                <h3 className="font-bold  text-[#cf6239] ">
                  {feedback.name.toUpperCase()}
                </h3>
                <p className="text-purple-900 text-sm mt-2">
                  {feedback.designation}
                </p>
              </div>

              <Button
                className="mt-2 text-sm border border-black cursor-pointer"
                variant="outline"
                onClick={() => setSelectedFeedback(feedback)}
              >
                {t("feedbacks.button")}
              </Button>
            </Card>
          ))}
        </div>
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
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FeedbackSection;
