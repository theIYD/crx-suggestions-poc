import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { mountReactApp } from "./content";

const SuggestionBox = ({ emails }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    window.addEventListener("click", ({ target }) => {
      setShowSuggestions(false);
      if (target instanceof HTMLInputElement) {
        const rect = target.getBoundingClientRect();
        const box = document.getElementById("email-suggestion-box");
        box.style.top = `${rect.bottom + window.scrollY}px`;
        box.style.left = `${rect.left + window.scrollX}px`;

        setShowSuggestions(true);
      }
    });
  }, []);

  const handleEmailClick = (email) => {
    console.log(email + " clicked");
  };

  if (!showSuggestions) return null;

  return (
    <div
      id="suggestion-box"
      className="bg-white border rounded-md shadow-md p-2 max-w-xs"
      style={{
        background: "#fff",
        padding: "20px",
        border: "1px solid #000",
      }}
    >
      {emails.map((s, idx) => (
        <div
          onClick={() => handleEmailClick(s)}
          key={idx}
          className="hover:bg-gray-100 p-2 cursor-pointer"
        >
          {s}
        </div>
      ))}
    </div>
  );
};

// Render function
export const renderSuggestionBox = (emails) => {
  const root = ReactDOM.createRoot(mountReactApp());
  root.render(<SuggestionBox emails={emails} />);
};
