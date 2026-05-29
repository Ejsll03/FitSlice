import { z } from "zod";

export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body ?? {});
  if (!result.success) {
    const errors = result.error?.errors?.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    })) ?? [{ field: "unknown", message: "Error de validación" }];
    return res.status(400).json({ errors });
  }
  req.body = result.data;
  next();
};

// Auth schemas
export const registerSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(50),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

// Profile schema
export const profileSchema = z.object({
  age: z.number().min(14, "Edad mínima 14 años").max(100, "Edad máxima 100 años"),
  weight: z.number().min(30, "Peso mínimo 30 kg").max(300, "Peso máximo 300 kg"),
  height: z.number().min(100, "Altura mínima 100 cm").max(250, "Altura máxima 250 cm"),
  goal: z.enum([
    "lose_weight",
    "gain_muscle",
    "maintain",
    "body_recomposition",
    "rehabilitation",
    "cardiovascular_health",
    "diabetes_management",
    "hypertension_management",
    "endurance",
    "athletic_performance",
    "race_preparation",
    "strength",
    "flexibility",
    "stress_relief",
    "functional_mobility",
    "sleep_improvement",
    "limited_mobility",
    "physical_disability",
    "postpartum",
    "active_senior",
  ], {
    errorMap: () => ({ message: "Objetivo inválido" }),
  }),
  conditions: z.array(z.string()).default([]),
  dietPreferences: z.array(z.string()).default([]),
  activityLevel: z.enum(["sedentary", "light", "moderate", "active", "very_active"], {
    errorMap: () => ({ message: "Nivel de actividad inválido" }),
  }),
  availableEquipment: z.string().max(300).optional().default("ninguno"),
});

// Plan schema
export const generatePlanSchema = z.object({
  availableEquipment: z.string().max(300).optional(),
});

// Chat schemas
export const createChatSchema = z.object({
  planId: z.string().min(1, "El planId es requerido"),
});

export const messageSchema = z.object({
  content: z.string().min(1, "El mensaje no puede estar vacío").max(1000, "Mensaje demasiado largo"),
});