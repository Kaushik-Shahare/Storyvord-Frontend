"use client";
import React, { useState, useRef, KeyboardEvent, ChangeEvent } from "react";
import dynamic from "next/dynamic";
import { jsPDF } from "jspdf";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// New: Characters state with id and name
interface Character {
  id: number;
  name: string;
}
// Update initialCharacters to a hardcoded array of four characters
const initialCharacters: Character[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "Dave" },
];

interface ScriptEntry {
  characterId: number;
  text: string;
}

// Add new style variables for a modern UI
const modernContainerStyle = {
  background: "linear-gradient(135deg, #eceff1, #ffffff)",
  padding: "2rem",
  minHeight: "100vh",
};

const modernWritingAreaStyle = {
  ...{
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    padding: "20px",
    margin: "20px auto",
    maxWidth: "800px",
    minHeight: "500px",
  },
  borderRadius: "8px",
};

const modernButtonStyle = {
  background: "linear-gradient(to right, #006400, #90ee90)",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  padding: "0.5rem 1rem",
  cursor: "pointer",
  marginRight: "0.5rem",
};

// Add new style for modern select elements
const modernSelectStyle = {
  padding: "0.5rem",
  border: "1px solid #ccc",
  borderRadius: "4px",
  backgroundColor: "#f9f9f9",
  appearance: "none",
  cursor: "pointer",
};

const Quills = () => {
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null);
  const [currentText, setCurrentText] = useState("");
  const [scriptEntries, setScriptEntries] = useState<ScriptEntry[]>([]);
  const [isRendered, setIsRendered] = useState(false);
  const [scriptTitle, setScriptTitle] = useState<string>("");
  const [isTitleEditing, setIsTitleEditing] = useState<boolean>(true);

  // New ref for PDF container
  const downloadRef = useRef<HTMLDivElement>(null);

  const [editingTextIndex, setEditingTextIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const [editingCharacterIndex, setEditingCharacterIndex] = useState<number | null>(null);
  // New state for hover effect
  const [hoveredTextIndex, setHoveredTextIndex] = useState<number | null>(null);
  // Add new state for hover effect on character name
  const [hoveredCharacterIndex, setHoveredCharacterIndex] = useState<number | null>(null);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCharacter(Number(e.target.value));
  };

  const submitEntry = () => {
    if (selectedCharacter && currentText.trim()) {
      setScriptEntries([...scriptEntries, { characterId: selectedCharacter, text: currentText }]);
      setSelectedCharacter(null);
      setCurrentText("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitEntry();
    }
  };

  const saveScript = async () => {
    // Simulate saving script to backend
    const payload = { scriptEntries, characters };
    console.log(payload);
  };

  const renderScriptHtml = () => {
    // If a conversation is being edited, save the changes immediately
    if (editingTextIndex !== null) {
      setScriptEntries((prev) =>
        prev.map((en, i) => (i === editingTextIndex ? { ...en, text: editingText } : en))
      );
      setEditingTextIndex(null);
    }
    setIsRendered(!isRendered);
  };

  const handleDownloadPdf = async () => {
    // Clear hovered states to remove any borders
    setHoveredTextIndex(null);
    setHoveredCharacterIndex(null);
    setEditingCharacterIndex(null);
    setEditingTextIndex(null);

    if (downloadRef.current) {
      const doc = new jsPDF("p", "mm", "a4");
      await doc.html(downloadRef.current, {
        callback: function (pdf) {
          // Use script title as file name; fallback to "script" if empty
          const fileName = scriptTitle.trim() ? `${scriptTitle.trim()}.pdf` : "script.pdf";
          pdf.save(fileName);
        },
        x: 0,
        y: 0,
        // Increased scale for better fidelity
        html2canvas: {
          scale: 0.235,
          useCORS: true,
        },
        margin: [10, 10, 10, 10],
      });
    }
  };

  // Update paperStyle for a more compact PDF layout
  const paperStyle = {
    width: "210mm",
    minHeight: "297mm",
    padding: "10mm", // Reduced padding
    margin: "10mm auto", // Reduced margin
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // Lighter shadow
    fontSize: "10pt", // Smaller font size
    lineHeight: "1.2", // Reduced line height
  };

  // Add helper function to clean extra newlines from text
  const cleanWhitespace = (text: string) => text.replace(/(\n\s*){3,}/g, "\n\n");

  return (
    <div style={modernContainerStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Movie Script Creator</h2>
      {/* Removed external dropdown */}

      {/* A4-like continuous document container */}
      <div ref={downloadRef} style={modernWritingAreaStyle}>
        {/* Updated Title Input and Display without an Edit button */}
        <div data-html2canvas-ignore="true" style={{ marginBottom: "10px" }}>
          {isTitleEditing ? (
            <input
              type="text"
              placeholder="Enter Script Title"
              value={scriptTitle}
              onChange={(e) => setScriptTitle(e.target.value)}
              style={{
                width: "100%",
                fontSize: "1.2em",
                padding: "5px",
                textAlign: "center",
                fontWeight: "bold",
              }}
              onBlur={() => {
                if (scriptTitle.trim()) setIsTitleEditing(false);
              }}
            />
          ) : (
            <h1
              style={{ textAlign: "center", fontWeight: "bold", cursor: "pointer" }}
              onClick={() => setIsTitleEditing(true)}
            >
              {scriptTitle}
            </h1>
          )}
        </div>

        {/* If no conversation exists, show dropdown at top (ignored in PDF) */}
        {!selectedCharacter && scriptEntries.length === 0 && (
          <div style={{ marginBottom: "10px" }} data-html2canvas-ignore="true">
            <label>
              Select Character:{" "}
              <select style={modernSelectStyle} onChange={handleSelectChange} defaultValue="">
                <option value="" disabled>
                  -- choose --
                </option>
                {characters.map((char) => (
                  <option key={char.id} value={char.id}>
                    {char.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}

        {/* Render written conversation */}
        {scriptEntries.map((entry, index) => {
          const char = characters.find((c) => c.id === entry.characterId);
          return (
            <p
              key={index}
              style={{ display: "flex", alignItems: "flex-start", margin: "0 0 5px 0" }}
            >
              <span
                style={{
                  fontWeight: "bold",
                  flexShrink: 0,
                  cursor: "pointer",
                  ...(editingCharacterIndex !== index && hoveredCharacterIndex === index
                    ? { border: "1px dashed #ccc", padding: "2px" }
                    : {}),
                }}
                onMouseEnter={() => setHoveredCharacterIndex(index)}
                onMouseLeave={() => setHoveredCharacterIndex(null)}
                onDoubleClick={() => {
                  setEditingCharacterIndex(index);
                }}
              >
                {editingCharacterIndex === index ? (
                  <select
                    style={modernSelectStyle}
                    value={entry.characterId}
                    onChange={(e) =>
                      setScriptEntries((prev) =>
                        prev.map((en, i) =>
                          i === index ? { ...en, characterId: Number(e.target.value) } : en
                        )
                      )
                    }
                    onBlur={() => setEditingCharacterIndex(null)}
                  >
                    <option value="" disabled>
                      -- choose --
                    </option>
                    {characters.map((char) => (
                      <option key={char.id} value={char.id}>
                        {char.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  (char ? char.name : "Unknown") + ":"
                )}
              </span>
              <span
                style={{
                  marginLeft: "1em",
                  cursor: "pointer",
                  width: "100%",
                  // Add border if not editing and hovered
                  ...(editingTextIndex !== index && hoveredTextIndex === index
                    ? { border: "1px dashed #ccc", padding: "2px" }
                    : {}),
                }}
                onMouseEnter={() => setHoveredTextIndex(index)}
                onMouseLeave={() => setHoveredTextIndex(null)}
                onDoubleClick={() => {
                  setEditingTextIndex(index);
                  setEditingText(entry.text);
                }}
              >
                {editingTextIndex === index ? (
                  <ReactQuill
                    value={editingText}
                    onChange={setEditingText}
                    onBlur={() => {
                      setScriptEntries((prev) =>
                        prev.map((en, i) => (i === index ? { ...en, text: editingText } : en))
                      );
                      setEditingTextIndex(null);
                    }}
                    theme="snow"
                  />
                ) : (
                  <span dangerouslySetInnerHTML={{ __html: cleanWhitespace(entry.text) }} />
                )}
              </span>
            </p>
          );
        })}

        {/* If conversation exists and no character is selected, show dropdown below (ignored in PDF) */}
        {!selectedCharacter && scriptEntries.length > 0 && (
          <div style={{ marginTop: "10px" }} data-html2canvas-ignore="true">
            <label>
              Select Character:{" "}
              <select style={modernSelectStyle} onChange={handleSelectChange} defaultValue="">
                <option value="" disabled>
                  -- choose --
                </option>
                {characters.map((char) => (
                  <option key={char.id} value={char.id}>
                    {char.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}

        {/* If a character is selected, show the editor */}
        {selectedCharacter && (
          <>
            <p>
              Writing as:{" "}
              <strong>{characters.find((c) => c.id === selectedCharacter)?.name}</strong>
            </p>
            <ReactQuill value={currentText} onChange={setCurrentText} />
            <button style={modernButtonStyle} onClick={submitEntry}>
              Next Character
            </button>
          </>
        )}
      </div>

      {/* Control buttons and preview section remain unchanged */}
      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <button style={modernButtonStyle} onClick={saveScript}>
          Save Script
        </button>
        <button style={modernButtonStyle} onClick={renderScriptHtml}>
          {isRendered ? "Hide" : "Render"} Preview
        </button>
      </div>
      {isRendered && (
        <div style={{ marginTop: "1rem" }}>
          <h3 style={{ textAlign: "center" }}>Rendered Script (A4 Hovering Paper)</h3>
          <div style={paperStyle}>
            {/* Include title in preview with center alignment and bold styling */}
            {scriptTitle.trim() && (
              <h1 style={{ textAlign: "center", fontWeight: "bold" }}>{scriptTitle}</h1>
            )}
            {scriptEntries.map((entry, index) => {
              const char = characters.find((c) => c.id === entry.characterId);
              return (
                <p
                  key={index}
                  style={{ display: "flex", alignItems: "flex-start", margin: "0 0 5px 0" }}
                >
                  <span style={{ fontWeight: "bold", flexShrink: 0 }}>
                    {char ? char.name : "Unknown"}:
                  </span>
                  <span
                    style={{ marginLeft: "1em" }}
                    dangerouslySetInnerHTML={{ __html: cleanWhitespace(entry.text) }}
                  />
                </p>
              );
            })}
          </div>
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <button style={modernButtonStyle} onClick={handleDownloadPdf}>
              Download as PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quills;
