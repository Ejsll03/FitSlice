import express from "express";
import axios from "axios";
import { requireAuth } from "../middleware/auth.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const EXERCISE_DB_URL = process.env.EXERCISE_DB_URL || "https://exercisedb-api.vercel.app";

// GET /api/exercises
router.get("/", requireAuth, async (req, res) => {
  try {
    const { bodyPart, equipment, search, limit = 20, offset = 0 } = req.query;

    let url = `${EXERCISE_DB_URL}/api/v1/exercises?limit=${limit}&offset=${offset}`;
    if (bodyPart) url += `&bodyPart=${bodyPart}`;
    if (equipment) url += `&equipment=${equipment}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener ejercicios" });
  }
});

// GET /api/exercises/:id
router.get("/:id", requireAuth, async (req, res) => {
  try {
    const response = await axios.get(
      `${EXERCISE_DB_URL}/api/v1/exercises/${req.params.id}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener ejercicio" });
  }
});

export default router;