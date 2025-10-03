import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();
const app = express();
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // ⚠️ ahora usamos el modelo que sí existe
      contents: [
        { parts: [{ text: message }] } // estructura correcta según tu curl
      ],
    });

    const reply = response.candidates?.[0]?.content?.parts?.[0]?.text || "Sin respuesta";
    res.json({ reply });
  } catch (err) {
    console.error("Error conectando con Gemini:", err);
    res.status(500).json({ error: "Error al conectar con Gemini" });
  }
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`)
);
