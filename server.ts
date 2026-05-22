import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Lazy initialization for Gemini
  let ai: GoogleGenAI | null = null;

  function getGenAI() {
    if (!ai) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        throw new Error("GEMINI_API_KEY is not configured");
      }
      ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
    return ai;
  }

  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      const client = getGenAI();

      // According to guidelines, for chat we can use ai.chats.create
      const chat = client.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction: "You are the BTCLNT Command Assistant, an AI expert in Bitcoin Layer-2 infrastructure, Lightning nodes, and the LNT token economy. Be technical, helpful, and speak like a mission control officer. Use terms like 'Commander', 'Protocol', and 'Infrastructure'.",
        }
      });

      // Note: Re-injecting history if needed, but for now we send the current message
      const response = await chat.sendMessage({ message });
      
      res.json({ text: response.text });
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Failed to fetch response from AI Assistant" });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
