import express from "express";
import bcrypt from "bcryptjs";
import UserProfile from "../models/UserProfile.js";

const router = express.Router();

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await UserProfile.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await UserProfile.create({ name, email, passwordHash });

    req.session.userId = user._id;
    res.status(201).json({ message: "Cuenta creada", userId: user._id });
  } catch (err) {
    res.status(500).json({ error: "Error al registrar usuario" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserProfile.findOne({ email });
    if (!user) return res.status(400).json({ error: "Credenciales inválidas" });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(400).json({ error: "Credenciales inválidas" });

    req.session.userId = user._id;
    res.json({ message: "Sesión iniciada", userId: user._id });
  } catch (err) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Sesión cerrada" });
});

// GET /api/auth/me
router.get("/me", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "No autenticado" });
  }
  try {
    const user = await UserProfile.findById(req.session.userId).select("-passwordHash");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener usuario" });
  }
});

export default router;