import { bodyCompositionPresets } from "./presets/bodyComposition.js";
import { healthPresets } from "./presets/health.js";
import { performancePresets } from "./presets/performance.js";
import { mobilityWellnessPresets } from "./presets/mobilityWellness.js";
import { adaptedPresets } from "./presets/adapted.js";

const allPresets = {
  ...bodyCompositionPresets,
  ...healthPresets,
  ...performancePresets,
  ...mobilityWellnessPresets,
  ...adaptedPresets,
};

export function getAgeProfile(age) {
  if (age >= 14 && age <= 25) return "young";
  if (age >= 26 && age <= 45) return "adult";
  if (age >= 46) return "senior";
  return "adult";
}

export function getPreset(goal) {
  return allPresets[goal] || allPresets["maintain"];
}