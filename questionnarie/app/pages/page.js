"use client";

import React, { useState } from "react";
import InfoPage from "./infoPage";
import EduPage from "./eduPage";
import ExpPage from "./experiencePage";
import SkillsPage from "./skillsPage";
import CvPage from "./cvPage";
import ReviewPage from "./reviewPage";

export default function Main() {
   const [currentSlide, setCurrentSlide] = useState(0);
   const [formData, setFormData] = useState({});

   const updateFormData = (sectionData) =>
      setFormData((prev) => ({ ...prev, ...sectionData }));

   const slides = [
      <InfoPage formData={formData} updateFormData={updateFormData} />,
      <EduPage formData={formData} updateFormData={updateFormData} />,
      <ExpPage formData={formData} updateFormData={updateFormData} />,
      <SkillsPage formData={formData} updateFormData={updateFormData} />,
      <CvPage formData={formData} updateFormData={updateFormData} />,
      <ReviewPage formData={formData} />,
   ];

   const nextSlide = () => currentSlide < slides.length - 1 && setCurrentSlide(currentSlide + 1);
   const prevSlide = () => currentSlide > 0 && setCurrentSlide(currentSlide - 1);

   const handleSubmit = async () => {
      try {
         const res = await fetch("/api/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               section: "full-questionnaire",
               responses: formData,
            }),
         });

         const result = await res.json();
         if (result.success) alert("Data saved!");
         else alert("Error saving data.");
      } catch (err) {
         console.error(err);
         alert("Network or server error.");
      }
   };

   return (
      <div className="flex flex-col justify-center items-center w-full bg-gray-100 h-screen">
         <div className=" w-2/3 h-[500px] flex justify-center items-center bg-[#fefedf] rounded-xl">{slides[currentSlide]}</div>

         <div className="w-2/3 px-10 pb-6 flex justify-between mt-2">
            {currentSlide > 0 && (
               <button onClick={prevSlide} className="px-4 py-2 bg-black text-white rounded">
                  Previous
               </button>
            )}
            {/* if the form in the current slide is not complete, can't move to the next page */}
            
            {currentSlide < slides.length - 1 ? (
               <button onClick={nextSlide} className="px-4 py-2 bg-black text-white rounded">
                  Next
               </button>
            ) : (
               <button onClick={handleSubmit} className="px-4 py-2 bg-[#00c9a7] text-white rounded">
                  Submit
               </button>
            )}

         </div>
      </div>
   );
}
