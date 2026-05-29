import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number },
  weight: { type: Number },
  height: { type: Number },
  bmi: { type: Number },
  goal: {
  type: String,
  enum: [
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
  ],
},
  conditions: { type: [String], default: [] },
  dietPreferences: { type: [String], default: [] },
  activityLevel: { type: String, enum: ["sedentary", "light", "moderate", "active", "very_active"] },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("UserProfile", userProfileSchema);