import express from "express";
import WeeklyPlan from "../models/WeeklyPlan.js";
import UserProfile from "../models/UserProfile.js";
import { requireAuth } from "../middleware/auth.js";
import { generateWeeklyPlan } from "../services/aiService.js";

const router = express.Router();

// POST /api/plans/generate
router.post("/generate", requireAuth, async (req, res) => {
  try {
    const profile = await UserProfile.findById(req.session.userId);
    if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

    // Archivar plan activo anterior si existe
    await WeeklyPlan.updateMany(
      { profileId: profile._id, status: "active" },
      { status: "archived" }
    );

    // Generar nuevo plan con IA
    const planData = await generateWeeklyPlan(profile);

    const plan = await WeeklyPlan.create({
      profileId: profile._id,
      days: planData.days,
      aiSummary: planData.aiSummary,
      warnings: planData.warnings,
    });

    res.status(201).json(plan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al generar el plan" });
  }
});

// GET /api/plans/:id
router.get("/:id", requireAuth, async (req, res) => {
  try {
    const plan = await WeeklyPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ error: "Plan no encontrado" });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el plan" });
  }
});

// GET /api/plans/active/me
router.get("/active/me", requireAuth, async (req, res) => {
  try {
    const plan = await WeeklyPlan.findOne({
      profileId: req.session.userId,
      status: "active",
    });
    if (!plan) return res.status(404).json({ error: "No hay plan activo" });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el plan activo" });
  }
});

export default router;