export const adaptedPresets = {
  limited_mobility: {
    intensity: "muy baja",
    exercises: [
      { name: "Ejercicios de brazos sentado", sets: 3, reps: 12, bodyPart: "brazos", equipment: "mancuernas ligeras" },
      { name: "Movilidad de cuello y hombros", sets: 2, reps: 10, bodyPart: "hombros", equipment: "ninguno" },
      { name: "Respiración diafragmática", sets: 3, reps: 10, bodyPart: "respiratorio", equipment: "ninguno" },
      { name: "Elevación de piernas sentado", sets: 3, reps: 10, bodyPart: "piernas", equipment: "silla" },
      { name: "Estiramiento de columna sentado", sets: 2, reps: 10, bodyPart: "espalda", equipment: "silla" },
    ],
    nutrition: {
      caloricAdjustment: -200,
      proteinPerKg: 1.4,
      carbsPercent: 45,
      fatsPercent: 30,
      mealsPerDay: 4,
      guidelines: ["Antiinflamatoria", "Rica en calcio y vitamina D", "Proteína para evitar sarcopenia", "Fibra alta", "Hidratación constante"],
    },
  },
  physical_disability: {
    intensity: "muy baja",
    exercises: [
      { name: "Ejercicios adaptados según discapacidad", sets: 2, reps: 10, bodyPart: "según capacidad", equipment: "según necesidad" },
      { name: "Movilidad articular suave", sets: 2, reps: 10, bodyPart: "articulaciones", equipment: "ninguno" },
      { name: "Respiración y relajación", sets: 3, reps: 10, bodyPart: "respiratorio", equipment: "ninguno" },
      { name: "Ejercicios isométricos suaves", sets: 2, reps: 10, bodyPart: "cuerpo completo", equipment: "ninguno" },
    ],
    nutrition: {
      caloricAdjustment: 0,
      proteinPerKg: 1.4,
      carbsPercent: 45,
      fatsPercent: 30,
      mealsPerDay: 4,
      guidelines: ["Adaptada a la condición específica", "Antiinflamatoria", "Rica en vitaminas y minerales", "Proteína para mantenimiento muscular", "Hidratación alta"],
    },
  },
  postpartum: {
    intensity: "muy baja",
    exercises: [
      { name: "Caminata suave", sets: 1, reps: 20, bodyPart: "cardiovascular", equipment: "ninguno" },
      { name: "Kegel", sets: 3, reps: 15, bodyPart: "suelo pélvico", equipment: "ninguno" },
      { name: "Respiración diafragmática", sets: 3, reps: 10, bodyPart: "core", equipment: "ninguno" },
      { name: "Estiramientos suaves", sets: 1, reps: 15, bodyPart: "cuerpo completo", equipment: "esterilla" },
      { name: "Hipopresivos", sets: 3, reps: 10, bodyPart: "suelo pélvico y core", equipment: "ninguno" },
    ],
    nutrition: {
      caloricAdjustment: 300,
      proteinPerKg: 1.7,
      carbsPercent: 50,
      fatsPercent: 25,
      mealsPerDay: 5,
      guidelines: ["Superávit calórico si está lactando", "Rica en hierro y calcio", "Omega-3 alto", "Hidratación muy alta", "Evitar alimentos que causen gases al bebé si lacta"],
    },
  },
  active_senior: {
    intensity: "baja-moderada",
    exercises: [
      { name: "Caminata diaria", sets: 1, reps: 35, bodyPart: "cardiovascular", equipment: "ninguno" },
      { name: "Fuerza con máquinas (baja carga)", sets: 3, reps: 15, bodyPart: "cuerpo completo", equipment: "máquinas" },
      { name: "Equilibrio y coordinación", sets: 3, reps: 10, bodyPart: "equilibrio", equipment: "ninguno" },
      { name: "Yoga suave o tai-chi", sets: 1, reps: 30, bodyPart: "flexibilidad", equipment: "esterilla" },
      { name: "Natación recreativa", sets: 1, reps: 30, bodyPart: "cuerpo completo", equipment: "piscina" },
    ],
    nutrition: {
      caloricAdjustment: 0,
      proteinPerKg: 1.5,
      carbsPercent: 45,
      fatsPercent: 30,
      mealsPerDay: 4,
      guidelines: ["Alta en calcio y vitamina D", "Proteína para evitar sarcopenia", "Fibra alta", "Poco sodio y azúcar", "3 comidas + 2 snacks pequeños"],
    },
  },
};