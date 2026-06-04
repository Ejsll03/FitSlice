export const performancePresets = {
  endurance: {
    intensity: "alta",
    exercises: [
      { name: "Cardio zona 2 largo", sets: 1, reps: 60, bodyPart: "cardiovascular", equipment: "ninguno" },
      { name: "Intervalos de carrera", sets: 5, reps: 5, bodyPart: "cardiovascular", equipment: "ninguno" },
      { name: "Bicicleta estática", sets: 1, reps: 45, bodyPart: "cardiovascular", equipment: "bicicleta estática" },
      { name: "Fuerza de piernas", sets: 3, reps: 15, bodyPart: "piernas", equipment: "mancuernas" },
      { name: "Core funcional", sets: 3, reps: 20, bodyPart: "core", equipment: "ninguno" },
    ],
    nutrition: {
      caloricAdjustment: 100,
      proteinPerKg: 1.6,
      carbsPercent: 55,
      fatsPercent: 20,
      mealsPerDay: 4,
      guidelines: ["Carbohidratos altos para energía", "Hidratación y electrolitos", "Proteína moderada", "Snack pre-entreno", "Recuperación post-entreno"],
    },
  },
  athletic_performance: {
    intensity: "muy alta",
    exercises: [
      { name: "Levantamiento olímpico", sets: 5, reps: 5, bodyPart: "cuerpo completo", equipment: "barra olímpica" },
      { name: "Sentadilla pesada", sets: 5, reps: 6, bodyPart: "piernas", equipment: "barra" },
      { name: "Pliometría", sets: 4, reps: 10, bodyPart: "piernas", equipment: "ninguno" },
      { name: "Sprint intervalado", sets: 6, reps: 30, bodyPart: "cardiovascular", equipment: "ninguno" },
      { name: "Core explosivo", sets: 4, reps: 15, bodyPart: "core", equipment: "ninguno" },
    ],
    nutrition: {
      caloricAdjustment: 400,
      proteinPerKg: 2.2,
      carbsPercent: 50,
      fatsPercent: 20,
      mealsPerDay: 6,
      guidelines: ["Superávit alto", "Proteína muy alta", "Carbohidratos periodizados", "Timing de nutrientes preciso", "Suplementación: creatina, cafeína, BCAAs"],
    },
  },
  race_preparation: {
    intensity: "alta",
    exercises: [
      { name: "Carrera larga (rodaje)", sets: 1, reps: 60, bodyPart: "cardiovascular", equipment: "ninguno" },
      { name: "Intervalos de velocidad", sets: 6, reps: 5, bodyPart: "cardiovascular", equipment: "ninguno" },
      { name: "Fuerza de piernas", sets: 3, reps: 12, bodyPart: "piernas", equipment: "mancuernas" },
      { name: "Estiramientos post-carrera", sets: 1, reps: 20, bodyPart: "cuerpo completo", equipment: "esterilla" },
      { name: "Cardio cruzado (bici o natación)", sets: 1, reps: 40, bodyPart: "cardiovascular", equipment: "ninguno" },
    ],
    nutrition: {
      caloricAdjustment: 200,
      proteinPerKg: 1.7,
      carbsPercent: 55,
      fatsPercent: 20,
      mealsPerDay: 5,
      guidelines: ["Carbohidratos como combustible principal", "Hidratación constante", "Proteína para recuperación", "Geles o snacks durante rodajes largos", "Descanso y sueño prioritarios"],
    },
  },
  strength: {
    intensity: "muy alta",
    exercises: [
      { name: "Sentadilla con barra", sets: 5, reps: 5, bodyPart: "piernas", equipment: "barra" },
      { name: "Press de banca", sets: 5, reps: 5, bodyPart: "pecho", equipment: "barra" },
      { name: "Peso muerto", sets: 5, reps: 4, bodyPart: "espalda", equipment: "barra" },
      { name: "Press militar", sets: 4, reps: 6, bodyPart: "hombros", equipment: "barra" },
      { name: "Remo con barra", sets: 4, reps: 6, bodyPart: "espalda", equipment: "barra" },
    ],
    nutrition: {
      caloricAdjustment: 250,
      proteinPerKg: 2.2,
      carbsPercent: 45,
      fatsPercent: 25,
      mealsPerDay: 5,
      guidelines: ["Superávit moderado", "Proteína muy alta", "Carbohidratos pre-entreno", "Creatina monohidratada", "Descanso entre sesiones obligatorio"],
    },
  },
};