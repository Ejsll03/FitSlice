export const bodyCompositionPresets = {
  lose_weight: {
    intensity: "alta",
    exercises: [
      { name: "HIIT", sets: 3, reps: 20, bodyPart: "cuerpo completo", equipment: "ninguno" },
      { name: "Saltar cuerda", sets: 3, reps: 30, bodyPart: "cardiovascular", equipment: "cuerda" },
      { name: "Burpees", sets: 3, reps: 15, bodyPart: "cuerpo completo", equipment: "ninguno" },
      { name: "Sentadilla con salto", sets: 3, reps: 15, bodyPart: "piernas", equipment: "ninguno" },
      { name: "Plancha", sets: 3, reps: 45, bodyPart: "core", equipment: "ninguno" },
    ],
    nutrition: {
      caloricAdjustment: -300,
      proteinPerKg: 1.8,
      carbsPercent: 45,
      fatsPercent: 25,
      mealsPerDay: 4,
      guidelines: ["Alto en proteína", "Carbohidratos complejos", "Snacks saludables", "Rica en fibra"],
    },
  },
  gain_muscle: {
    intensity: "muy alta",
    exercises: [
      { name: "Sentadilla con barra", sets: 4, reps: 10, bodyPart: "piernas", equipment: "barra" },
      { name: "Press de banca", sets: 4, reps: 10, bodyPart: "pecho", equipment: "barra" },
      { name: "Peso muerto", sets: 4, reps: 8, bodyPart: "espalda", equipment: "barra" },
      { name: "Remo con barra", sets: 3, reps: 10, bodyPart: "espalda", equipment: "barra" },
      { name: "Curl de bíceps", sets: 3, reps: 12, bodyPart: "bíceps", equipment: "mancuernas" },
    ],
    nutrition: {
      caloricAdjustment: 300,
      proteinPerKg: 2.0,
      carbsPercent: 50,
      fatsPercent: 20,
      mealsPerDay: 5,
      guidelines: ["Superávit calórico", "Proteína alta", "Carbohidratos pre/post entreno", "5-6 comidas al día"],
    },
  },
  maintain: {
    intensity: "moderada",
    exercises: [
      { name: "Fuerza funcional", sets: 3, reps: 12, bodyPart: "cuerpo completo", equipment: "mancuernas" },
      { name: "Cardio moderado", sets: 1, reps: 30, bodyPart: "cardiovascular", equipment: "ninguno" },
      { name: "Yoga o estiramientos", sets: 1, reps: 30, bodyPart: "flexibilidad", equipment: "esterilla" },
      { name: "Plancha", sets: 3, reps: 45, bodyPart: "core", equipment: "ninguno" },
    ],
    nutrition: {
      caloricAdjustment: 0,
      proteinPerKg: 1.5,
      carbsPercent: 40,
      fatsPercent: 30,
      mealsPerDay: 3,
      guidelines: ["Balance 40/30/30", "3 comidas + 1 snack", "Poca comida procesada"],
    },
  },
  body_recomposition: {
    intensity: "alta",
    exercises: [
      { name: "Sentadilla con mancuernas", sets: 4, reps: 12, bodyPart: "piernas", equipment: "mancuernas" },
      { name: "Press de pecho con mancuernas", sets: 4, reps: 12, bodyPart: "pecho", equipment: "mancuernas" },
      { name: "Remo con mancuerna", sets: 3, reps: 12, bodyPart: "espalda", equipment: "mancuernas" },
      { name: "HIIT corto", sets: 2, reps: 15, bodyPart: "cardiovascular", equipment: "ninguno" },
      { name: "Plancha lateral", sets: 3, reps: 30, bodyPart: "core", equipment: "ninguno" },
    ],
    nutrition: {
      caloricAdjustment: 0,
      proteinPerKg: 2.0,
      carbsPercent: 40,
      fatsPercent: 25,
      mealsPerDay: 4,
      guidelines: ["Calorías de mantenimiento", "Proteína muy alta", "Carbohidratos en torno al entreno", "Déficit leve en días de descanso"],
    },
  },
};