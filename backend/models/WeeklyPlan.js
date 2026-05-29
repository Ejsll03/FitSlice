import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  exerciseId: String,
  name: String,
  sets: Number,
  reps: Number,
  bodyPart: String,
  equipment: String,
});

const mealSchema = new mongoose.Schema({
  type: { type: String, enum: ["breakfast", "lunch", "dinner", "snack"] },
  name: String,
  ingredients: [String],
  calories: Number,
  protein: Number,
  carbs: Number,
  fats: Number,
});

const dayPlanSchema = new mongoose.Schema({
  day: { type: String, enum: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"] },
  exercises: [exerciseSchema],
  meals: [mealSchema],
});

const weeklyPlanSchema = new mongoose.Schema({
  profileId: { type: mongoose.Schema.Types.ObjectId, ref: "UserProfile", required: true },
  generatedAt: { type: Date, default: Date.now },
  days: [dayPlanSchema],
  aiSummary: { type: String },
  warnings: { type: [String], default: [] },
  status: { type: String, enum: ["active", "archived"], default: "active" },
});

export default mongoose.model("WeeklyPlan", weeklyPlanSchema);