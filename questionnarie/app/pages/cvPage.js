'use client';

import React, { useState, useCallback, useEffect } from "react";
import questionsData from "../data/cv.json"; // Make sure this file exists

export default function CvPage() {
  const section = questionsData[0];
  const questions = section.questions.filter(Boolean);

  const [formData, setFormData] = useState({});

  // ✅ useCallback to avoid unnecessary re-renders
  const updateFormData = useCallback((data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const [localData, setLocalData] = useState(() => {
    const initial = {};
    questions.forEach((q) => {
      initial[q.title] = formData[q.title] || "";
    });
    return initial;
  });

  useEffect(() => {
    if (updateFormData) {
      updateFormData(localData);
    }
  }, [localData, updateFormData]); // ✅ No more warning

  const handleChange = (e, title) => {
    const value =
      e.target.type === "file" ? e.target.files[0]?.name || "" : e.target.value;
    setLocalData((prev) => ({ ...prev, [title]: value }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-8">{section.field}</h1>
      <form className="space-y-6">
        {questions.map((q, index) => (
          <div key={index}>
            <div className="flex items-center gap-1">
              <label className="block text-sm font-medium mb-1">{q.title}</label>
              {q.required && <span className="text-red-700">*</span>}
            </div>
            <p className="text-gray-500 text-xs mb-2">{q.description}</p>
            {q.type === "select" ? (
              <select
                value={localData[q.title] || ""}
                required={q.required}
                onChange={(e) => handleChange(e, q.title)}
                className="w-full border border-gray-300 rounded p-2 bg-white"
              >
                <option value="">-- Sélectionner --</option>
                {q.options.map((opt, idx) => (
                  <option key={idx} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : q.type === "file" ? (
              <input
                type="file"
                required={q.required}
                onChange={(e) => handleChange(e, q.title)}
                className="w-full border border-gray-300 rounded p-2 bg-white"
              />
            ) : (
              <textarea
                type={q.type}
                value={localData[q.title] || ""}
                required={q.required}
                onChange={(e) => handleChange(e, q.title)}
                className="w-full border border-gray-300 rounded p-2 bg-white"
              />
            )}
          </div>
        ))}
      </form>
    </div>
  );
}
