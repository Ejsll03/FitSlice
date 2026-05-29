import express from "express";
import WeeklyPlan from "../models/WeeklyPlan.js";
import UserProfile from "../models/UserProfile.js";
import { requireAuth } from "../middleware/auth.js";
import { generateWeeklyPlan } from "../services/aiService.js";
import { validate, generatePlanSchema } from "../middleware/validate.js";

const router = express.Router();

router.post("/generate", requireAuth, validate(generatePlanSchema), async (req, res) => {
  try {
    const profile = await UserProfile.findById(req.session.userId);
    if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });

    if (req.body.availableEquipment) {
      profile.availableEquipment = req.body.availableEquipment;
    }

    await WeeklyPlan.updateMany(
      { profileId: profile._id, status: "active" },
      { status: "archived" }
    );

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

router.get("/:id", requireAuth, async (req, res) => {
  try {
    const plan = await WeeklyPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ error: "Plan no encontrado" });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el plan" });
  }
});

export default router;