import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number },
  weight: { type: Number },
  height: { type: Number },
  bmi: { type: Number },
  goal: { type: String, enum: ["lose_weight", "gain_muscle", "maintain", "rehabilitation"] },
  conditions: { type: [String], default: [] },
  dietPreferences: { type: [String], default: [] },
  activityLevel: { type: String, enum: ["sedentary", "light", "moderate", "active", "very_active"] },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("UserProfile", userProfileSchema);