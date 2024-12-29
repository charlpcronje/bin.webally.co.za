/* frontend/src/App.jsx */
/**
 * @file frontend/src/App.jsx
 * Main application component with ShadCN UI + dark theme styling.
 */
import React, { useState } from "react";
import axios from "axios";
import { Button } from "./components/ui/button.jsx";
import { Input } from "./components/ui/input.jsx";

/**
 * Main Pastebin application.
 * @returns {JSX.Element}
 */
export default function App() {
  const [content, setContent] = useState("");
  const [createdPaste, setCreatedPaste] = useState(null);
  const [retrievedPaste, setRetrievedPaste] = useState(null);
  const [pasteId, setPasteId] = useState("");

  /**
   * Creates a new paste by sending the content to the backend.
   */
  const handleCreatePaste = async () => {
    try {
      // Adjust your domain/port if needed:
      const res = await axios.post("https://api.bin.webally.co.za/api/pastes", {
        content,
      });
      setCreatedPaste(res.data.paste);
      setContent("");
      setRetrievedPaste(null);
    } catch (err) {
      alert(err?.response?.data?.error || err.message);
    }
  };

  /**
   * Retrieves an existing paste by ID.
   */
  const handleGetPaste = async () => {
    try {
      const res = await axios.get(`https://api.bin.webally.co.za/api/pastes/${pasteId}`);
      setRetrievedPaste(res.data.paste);
      setCreatedPaste(null);
    } catch (err) {
      alert(err?.response?.data?.error || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto py-10 px-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Featured Pastebin</h1>

        {/* Create Paste Section */}
        <div className="mb-8 space-y-3">
          <label className="block text-sm font-semibold">Paste Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your text here..."
            className="w-full rounded-md border border-gray-700 bg-gray-800 p-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600"
            rows="5"
          />
          <Button onClick={handleCreatePaste}>Create Paste</Button>

          {createdPaste && (
            <div className="mt-4 rounded-md border border-green-600 p-4 bg-green-900/30">
              <p className="font-semibold">Paste Created!</p>
              <p>ID: {createdPaste.id}</p>
              <p>Created At: {createdPaste.created_at}</p>
            </div>
          )}
        </div>

        {/* Retrieve Paste Section */}
        <div className="mb-8 space-y-3">
          <label className="block text-sm font-semibold">Paste ID:</label>
          <Input
            value={pasteId}
            onChange={(e) => setPasteId(e.target.value)}
            placeholder="123"
          />
          <Button onClick={handleGetPaste}>Get Paste</Button>

          {retrievedPaste && (
            <div className="mt-4 rounded-md border border-blue-600 p-4 bg-blue-900/30">
              <p className="font-semibold">Paste Found!</p>
              <p>ID: {retrievedPaste.id}</p>
              <p>Views: {retrievedPaste.views}</p>
              <p className="whitespace-pre-wrap mt-2">
                Content: {retrievedPaste.content}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
