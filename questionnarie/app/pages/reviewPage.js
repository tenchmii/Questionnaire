import React from "react";

export default function ReviewPage({ formData }) {
  return (
    <div className="w-full p-6 max-w-4xl mx-auto  h-[500px] overflow-auto rounded-lg">
      <h1 className="text-2xl font-bold mb-8 text-center">Review Your Answers</h1>
      <div className="">
        {Object.entries(formData).map(([key, value], index) => (
          <div key={index} className=" p-4">
            <p className="text-sm ">{key}</p>
            <p className="text-lg font-medium">{value || "—"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
