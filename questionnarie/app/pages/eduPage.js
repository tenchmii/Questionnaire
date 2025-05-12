import React, { useState, useEffect } from "react";
import questionsData from "../data/education.json";

export default function EduPage({ formData = {}, updateFormData }) {
  const section = questionsData[0];
  const questions = section.questions.filter(Boolean);

  const [localData, setLocalData] = useState(() => {
    const initial = {};
    questions.forEach((q) => {
      initial[q.title] = formData[q.title] || "";
    });
    return initial;
  });

  useEffect(() => {
    updateFormData && updateFormData(localData);
  }, [localData]);

  const handleChange = (e, title) => {
    setLocalData((prev) => ({ ...prev, [title]: e.target.value }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8 text-center">{section.field}</h1>
      <form className="space-y-6">
        {questions.map((q, index) => (
          <div key={index}>
            <div className="flex">
              <label className="block text-sm font-medium mb-1">{q.title}</label>
              <span className="text-red-700">*</span>
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
            ) : (
              <input
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
