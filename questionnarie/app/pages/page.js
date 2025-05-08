"use client";

import React, { useState } from "react";
import InfoPage from "./infoPage";
import EduPage from "./eduPage";
import ExpPage from "./experiencePage";
import SkillsPage from "./skillsPage";
import CvPage from "./cvPage";

export default function Main() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({}); 

  const updateFormData = (sectionData) => {
    setFormData((prev) => ({ ...prev, ...sectionData }));
  };

  const slides = [
    <InfoPage formData={formData} updateFormData={updateFormData} />,
    <EduPage formData={formData} updateFormData={updateFormData} />,
    <ExpPage formData={formData} updateFormData={updateFormData} />,
    <SkillsPage formData={formData} updateFormData={updateFormData} />,
    <CvPage formData={formData} />,
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <div className="w-1/2 flex bg-gray-100">{slides[currentSlide]}</div>
      <div className="w-1/2 px-10 mb-4 flex justify-between">
        <div>
          {currentSlide > 0 && (
            <button onClick={prevSlide} className="bg-blue-500 text-white px-4 py-2 rounded">
              Previous
            </button>
          )}
        </div>
        <div>
          {currentSlide < slides.length - 1 ? (
            <button onClick={nextSlide} className="bg-blue-500 text-white px-4 py-2 rounded">
              Next
            </button>
          ) : (
            <button
              type="submit"
              onClick={() => console.log("Final Data:", formData)}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
