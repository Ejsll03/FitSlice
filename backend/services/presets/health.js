export const healthPresets = {
  rehabilitation: {
    intensity: "muy baja",
    exercises: [
      { name: "Movilidad articular", sets: 2, reps: 10, bodyPart: "articulaciones", equipment: "ninguno" },
      { name: "Estiramientos estáticos", sets: 1, reps: 20, bodyPart: "cuerpo completo", equipment: "esterilla" },
      { name: "Natación suave", sets: 1, reps: 30, bodyPart: "cuerpo completo", equipment: "piscina" },
      { name: "Ejercicios isométricos", sets: 3, reps: 15, bodyPart: "cuerpo completo", equipment: "ninguno" },
    ],
    nutrition: {
      caloricAdjustment: 0,
      proteinPerKg: 1.6,
      carbsPercent: 45,
      fatsPercent: 30,
      mealsPerDay: 4,
      guidelines: ["Antiinflamatoria", "Rica en omega-3", "Colágeno en batidos", "Vitaminas C y D"],
    },
  },
  cardiovascular_health: {
    intensity: "moderada",
    exercises: [
      { name: "Caminata rápida", sets: 1, reps: 40, bodyPart: "cardiovascular", equipment: "ninguno" },
      { name: "Bicicleta estática", sets: 1, reps: 30, bodyPart: "cardiovascular", equipment: "bicicleta estática" },
      { name: "Natación moderada", sets: 1, reps: 30, bodyPart: "cuerpo completo", equipment: "piscina" },
      { name: "Cardio zona 2", sets: 1, reps: 45, bodyPart: "cardiovascular", equipment: "ninguno" },
      { name: "Respiración diafragmática", sets: 3, reps: 10, bodyPart: "respiratorio", equipment: "ninguno" },
    ],
    nutrition: {
      caloricAdjustment: -100,
      proteinPerKg: 1.4,
      carbsPercent: 45,
      fatsPercent: 30,
      mealsPerDay: 4,
      guidelines: ["Dieta mediterránea", "Reducir sodio", "Omega-3 alto", "Evitar grasas saturadas", "Rica en potasio y magnesio"],
    },
  },
  diabetes_management: {
    intensity: "moderada",
    exercises: [
      { name: "Caminata post-comida", sets: 1, reps: 20, bodyPart: "cardiovascular", equipment: "ninguno" },
      { name: "Fuerza con máquinas", sets: 3, reps: 15, bodyPart: "cuerpo completo", equipment: "máquinas" },
      { name: "Bicicleta estática", sets: 1, reps: 30, bodyPart: "cardiovascular", equipment: "bicicleta estática" },
      { name: "Estiramientos", sets: 1, reps: 20, bodyPart: "cuerpo completo", equipment: "esterilla" },
    ],
    nutrition: {
      caloricAdjustment: -200,
      proteinPerKg: 1.5,
      carbsPercent: 35,
      fatsPercent: 30,
      mealsPerDay: 5,
      guidelines: ["Índice glucémico bajo", "Carbohidratos distribuidos en el día", "Rica en fibra", "Evitar azúcar refinada", "5 comidas pequeñas al día"],
    },
  },
  hypertension_management: {
    intensity: "baja",
    exercises: [
      { name: "Caminata suave", sets: 1, reps: 35, bodyPart: "cardiovascular", equipment: "ninguno" },
      { name: "Yoga suave", sets: 1, reps: 30, bodyPart: "flexibilidad", equipment: "esterilla" },
      { name: "Natación suave", sets: 1, reps: 25, bodyPart: "cuerpo completo", equipment: "piscina" },
      { name: "Respiración profunda", sets: 3, reps: 10, bodyPart: "respiratorio", equipment: "ninguno" },
      { name: "Fuerza ligera", sets: 2, reps: 15, bodyPart: "cuerpo completo", equipment: "mancuernas ligeras" },
    ],
    nutrition: {
      caloricAdjustment: -150,
      proteinPerKg: 1.3,
      carbsPercent: 45,
      fatsPercent: 30,
      mealsPerDay: 4,
      guidelines: ["Dieta DASH", "Muy bajo en sodio", "Rico en potasio", "Evitar alcohol y cafeína", "Frutas y verduras abundantes"],
    },
  },
};