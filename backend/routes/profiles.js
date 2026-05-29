import express from "express";
import UserProfile from "../models/UserProfile.js";
import { requireAuth } from "../middleware/auth.js";
import { validate, profileSchema } from "../middleware/validate.js";

const router = express.Router();

router.post("/", requireAuth, validate(profileSchema), async (req, res) => {
  try {
    const { age, weight, height, goal, conditions, dietPreferences, activityLevel, availableEquipment } = req.body;

    const bmi = parseFloat((weight / ((height / 100) ** 2)).toFixed(1));

    const profile = await UserProfile.findByIdAndUpdate(
      req.session.userId,
      { age, weight, height, bmi, goal, conditions, dietPreferences, activityLevel, availableEquipment },
      { new: true }
    ).select("-passwordHash");

    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: "Error al guardar perfil" });
  }
});

router.get("/:id", requireAuth, async (req, res) => {
  try {
    const profile = await UserProfile.findById(req.params.id).select("-passwordHash");
    if (!profile) return res.status(404).json({ error: "Perfil no encontrado" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener perfil" });
  }
});

router.put("/:id", requireAuth, validate(profileSchema.partial()), async (req, res) => {
  try {
    const { weight, height, goal, conditions, dietPreferences, activityLevel, availableEquipment } = req.body;

    const updateData = { weight, height, goal, conditions, dietPreferences, activityLevel, availableEquipment };
    if (weight && height) {
      updateData.bmi = parseFloat((weight / ((height / 100) ** 2)).toFixed(1));
    }

    const profile = await UserProfile.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select("-passwordHash");

    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar perfil" });
  }
});

export default router;