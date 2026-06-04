export const mobilityWellnessPresets = {
  flexibility: {
    intensity: "baja",
    exercises: [
      { name: "Yoga dinámico", sets: 1, reps: 40, bodyPart: "cuerpo completo", equipment: "esterilla" },
      { name: "Estiramientos estáticos profundos", sets: 1, reps: 30, bodyPart: "cuerpo completo", equipment: "esterilla" },
      { name: "Foam roller", sets: 1, reps: 20, bodyPart: "cuerpo completo", equipment: "foam roller" },
      { name: "Movilidad de caderas", sets: 2, reps: 15, bodyPart: "caderas", equipment: "ninguno" },
      { name: "Movilidad de hombros", sets: 2, reps: 15, bodyPart: "hombros", equipment: "ninguno" },
    ],
    nutrition: {
      caloricAdjustment: 0,
      proteinPerKg: 1.3,
      carbsPercent: 45,
      fatsPercent: 30,
      mealsPerDay: 3,
      guidelines: ["Hidratación alta", "Antiinflamatoria", "Rica en colágeno", "Omega-3", "Vitamina C y E"],
    },
  },
  stress_relief: {
    intensity: "baja",
    exercises: [
      { name: "Yoga restaurativo", sets: 1, reps: 45, bodyPart: "cuerpo completo", equipment: "esterilla" },
      { name: "Meditación y respiración", sets: 1, reps: 20, bodyPart: "mental", equipment: "ninguno" },
      { name: "Caminata en naturaleza", sets: 1, reps: 40, bodyPart: "cardiovascular", equipment: "ninguno" },
      { name: "Tai-chi", sets: 1, reps: 30, bodyPart: "cuerpo completo", equipment: "ninguno" },
      { name: "Estiramientos suaves", sets: 1, reps: 20, bodyPart: "cuerpo completo", equipment: "esterilla" },
    ],
    nutrition: {
      caloricAdjustment: 0,
      proteinPerKg: 1.3,
      carbsPercent: 45,
      fatsPercent: 30,
      mealsPerDay: 3,
      guidelines: ["Evitar cafeína en exceso", "Rica en magnesio y triptófano", "Reducir azúcar", "Infusiones relajantes", "Hidratación constante"],
    },
  },
  functional_mobility: {
    intensity: "baja-moderada",
    exercises: [
      { name: "Sentadilla funcional", sets: 3, reps: 12, bodyPart: "piernas", equipment: "ninguno" },
      { name: "Zancadas", sets: 3, reps: 10, bodyPart: "piernas", equipment: "ninguno" },
      { name: "Ejercicios de equilibrio", sets: 3, reps: 10, bodyPart: "equilibrio", equipment: "ninguno" },
      { name: "Movilidad de columna", sets: 2, reps: 12, bodyPart: "espalda", equipment: "esterilla" },
      { name: "Elevación de talones", sets: 3, reps: 15, bodyPart: "gemelos", equipment: "ninguno" },
    ],
    nutrition: {
      caloricAdjustment: 0,
      proteinPerKg: 1.4,
      carbsPercent: 45,
      fatsPercent: 30,
      mealsPerDay: 4,
      guidelines: ["Rica en calcio y vitamina D", "Proteína para masa muscular", "Antiinflamatoria", "Hidratación alta", "Frutas y verduras abundantes"],
    },
  },
  sleep_improvement: {
    intensity: "baja",
    exercises: [
      { name: "Yoga nocturno", sets: 1, reps: 30, bodyPart: "cuerpo completo", equipment: "esterilla" },
      { name: "Caminata matutina", sets: 1, reps: 30, bodyPart: "cardiovascular", equipment: "ninguno" },
      { name: "Respiración 4-7-8", sets: 3, reps: 5, bodyPart: "respiratorio", equipment: "ninguno" },
      { name: "Estiramientos suaves nocturnos", sets: 1, reps: 20, bodyPart: "cuerpo completo", equipment: "esterilla" },
      { name: "Cardio ligero matutino", sets: 1, reps: 25, bodyPart: "cardiovascular", equipment: "ninguno" },
    ],
    nutrition: {
      caloricAdjustment: 0,
      proteinPerKg: 1.3,
      carbsPercent: 45,
      fatsPercent: 30,
      mealsPerDay: 3,
      guidelines: ["Evitar cafeína después del mediodía", "Cena ligera", "Rica en triptófano (pavo, plátano, avena)", "Evitar alcohol", "Infusión de manzanilla o valeriana"],
    },
  },
};