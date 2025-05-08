import React, { useEffect, useState } from "react";
import questionsData from "../data/skills.json";

export default function InfoPage({ formData, updateFormData }) {
  const section = questionsData[0];
  const questions = section.questions.filter(Boolean);

  const [localData, setLocalData] = useState(() => {
    const sectionData = {};
    questions.forEach(q => {
      sectionData[q.title] = formData[q.title] || "";
    });
    return sectionData;
  });

  useEffect(() => {
    updateFormData(localData);
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
            <label className="block text-sm font-medium mb-1">{q.title}</label>
            <p className="text-gray-500 text-xs mb-2">{q.description}</p>
            {q.type === "select" ? (
              <select
                value={localData[q.title] || ""}
                required={q.required}
                onChange={(e) => handleChange(e, q.title)}
                className="w-full border border-gray-300 rounded p-2"
              >
                <option value="">-- Sélectionner --</option>
                {q.options.map((opt, idx) => (
                  <option key={idx} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ) : (
              <input
                type={q.type}
                required={q.required}
                value={localData[q.title] || ""}
                onChange={(e) => handleChange(e, q.title)}
                className="w-full border border-gray-300 rounded p-2"
              />
            )}
          </div>
        ))}
      </form>
    </div>
  );
}
