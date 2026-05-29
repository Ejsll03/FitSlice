import express from "express";
import ChatSession from "../models/ChatSession.js";
import WeeklyPlan from "../models/WeeklyPlan.js";
import { requireAuth } from "../middleware/auth.js";
import { chatWithAI } from "../services/aiService.js";

const router = express.Router();

// POST /api/chats
router.post("/", requireAuth, async (req, res) => {
  try {
    const { planId } = req.body;

    const plan = await WeeklyPlan.findById(planId);
    if (!plan) return res.status(404).json({ error: "Plan no encontrado" });

    const chat = await ChatSession.create({ planId });
    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ error: "Error al crear sesión de chat" });
  }
});

// POST /api/chats/:id/message
router.post("/:id/message", requireAuth, async (req, res) => {
  try {
    const { content } = req.body;

    const chat = await ChatSession.findById(req.params.id);
    if (!chat) return res.status(404).json({ error: "Chat no encontrado" });

    const plan = await WeeklyPlan.findById(chat.planId);
    if (!plan) return res.status(404).json({ error: "Plan no encontrado" });

    // Agregar mensaje del usuario
    chat.messages.push({ role: "user", content });

    // Obtener respuesta de la IA
    const aiResponse = await chatWithAI(chat.messages, plan);

    // Agregar respuesta de la IA
    chat.messages.push({ role: "model", content: aiResponse });
    chat.updatedAt = new Date();
    await chat.save();

    res.json({ response: aiResponse, messages: chat.messages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al procesar mensaje" });
  }
});

// GET /api/chats/:id
router.get("/:id", requireAuth, async (req, res) => {
  try {
    const chat = await ChatSession.findById(req.params.id);
    if (!chat) return res.status(404).json({ error: "Chat no encontrado" });
    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener chat" });
  }
});

export default router;