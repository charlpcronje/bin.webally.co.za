/* backend/src/server.js */
/**
 * @file backend/src/server.js
 * Main entry point for the Express server.
 */

import express from "express";
import cors from "cors";
import { pasteController } from "./controllers/PasteController.js";

const app = express();
// Enable CORS for your front-end domain
app.use(
    cors({
      origin: "https://bin.webally.co.za", // your front-end domain
      methods: ["GET", "POST"],
      credentials: true,
    })
  );
app.use(express.json());



// Routes
app.post("/api/pastes", async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: "Content is required." });
    }
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const paste = await pasteController.createPaste(content, ip);
    return res.json({ success: true, paste });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/api/pastes/:id", async (req, res) => {
  try {
    const paste = await pasteController.getPaste(req.params.id);
    return res.json({ success: true, paste });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

// Start the server
const PORT = 4000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Backend server running on http://0.0.0.0:${PORT}`);
  });
