const presets = {
  young: {
    lose_weight: {
      intensity: "alta",
      exercises: [
        { name: "HIIT", sets: 3, reps: 20, bodyPart: "cuerpo completo", equipment: "ninguno" },
        { name: "Saltar cuerda", sets: 3, reps: 30, bodyPart: "cardiovascular", equipment: "cuerda" },
        { name: "Burpees", sets: 3, reps: 15, bodyPart: "cuerpo completo", equipment: "ninguno" },
        { name: "Abdominales en V", sets: 3, reps: 20, bodyPart: "core", equipment: "ninguno" },
        { name: "Sentadilla con salto", sets: 3, reps: 15, bodyPart: "piernas", equipment: "ninguno" },
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
  },

  adult: {
    lose_weight: {
      intensity: "moderada",
      exercises: [
        { name: "Cardio moderado (caminata rápida o bici)", sets: 1, reps: 45, bodyPart: "cardiovascular", equipment: "ninguno" },
        { name: "Circuito de fuerza funcional", sets: 3, reps: 12, bodyPart: "cuerpo completo", equipment: "mancuernas" },
        { name: "Pilates o yoga", sets: 1, reps: 40, bodyPart: "core y flexibilidad", equipment: "esterilla" },
        { name: "Plancha lateral", sets: 3, reps: 30, bodyPart: "core", equipment: "ninguno" },
      ],
      nutrition: {
        caloricAdjustment: -300,
        proteinPerKg: 1.6,
        carbsPercent: 40,
        fatsPercent: 30,
        mealsPerDay: 3,
        guidelines: ["Déficit moderado", "Reducir carbohidratos refinados", "Ayuno intermitente 16:8 opcional"],
      },
    },
    gain_muscle: {
      intensity: "alta",
      exercises: [
        { name: "Sentadilla con mancuernas", sets: 4, reps: 10, bodyPart: "piernas", equipment: "mancuernas" },
        { name: "Press de pecho con mancuernas", sets: 4, reps: 10, bodyPart: "pecho", equipment: "mancuernas" },
        { name: "Jalón al pecho", sets: 3, reps: 12, bodyPart: "espalda", equipment: "máquina" },
        { name: "Press de hombros", sets: 3, reps: 10, bodyPart: "hombros", equipment: "mancuernas" },
        { name: "Extensiones de tríceps", sets: 3, reps: 12, bodyPart: "tríceps", equipment: "mancuernas" },
      ],
      nutrition: {
        caloricAdjustment: 200,
        proteinPerKg: 1.8,
        carbsPercent: 45,
        fatsPercent: 25,
        mealsPerDay: 4,
        guidelines: ["Superávit moderado", "Proteína alta", "Carbohidratos post-entreno", "Creatina opcional"],
      },
    },
    maintain: {
      intensity: "baja-moderada",
      exercises: [
        { name: "Caminata rápida", sets: 1, reps: 30, bodyPart: "cardiovascular", equipment: "ninguno" },
        { name: "Fuerza con máquinas", sets: 3, reps: 12, bodyPart: "cuerpo completo", equipment: "máquinas" },
        { name: "Yoga o pilates", sets: 1, reps: 40, bodyPart: "flexibilidad", equipment: "esterilla" },
        { name: "Ciclismo recreativo", sets: 1, reps: 45, bodyPart: "cardiovascular", equipment: "bicicleta" },
      ],
      nutrition: {
        caloricAdjustment: 0,
        proteinPerKg: 1.4,
        carbsPercent: 45,
        fatsPercent: 30,
        mealsPerDay: 3,
        guidelines: ["Dieta mediterránea", "Rica en antioxidantes", "Reducir alcohol y ultraprocesados"],
      },
    },
    rehabilitation: {
      intensity: "muy baja",
      exercises: [
        { name: "Fisioterapia dirigida", sets: 2, reps: 10, bodyPart: "zona afectada", equipment: "ninguno" },
        { name: "Aqua-gym", sets: 1, reps: 30, bodyPart: "cuerpo completo", equipment: "piscina" },
        { name: "Estiramientos progresivos", sets: 2, reps: 15, bodyPart: "cuerpo completo", equipment: "esterilla" },
        { name: "Foam roller", sets: 1, reps: 15, bodyPart: "cuerpo completo", equipment: "foam roller" },
      ],
      nutrition: {
        caloricAdjustment: 0,
        proteinPerKg: 1.6,
        carbsPercent: 45,
        fatsPercent: 30,
        mealsPerDay: 4,
        guidelines: ["Antiinflamatoria", "Calcio y vitamina D", "Proteína para regeneración", "Hidratación alta"],
      },
    },
  },

  senior: {
    lose_weight: {
      intensity: "baja-moderada",
      exercises: [
        { name: "Caminata diaria", sets: 1, reps: 40, bodyPart: "cardiovascular", equipment: "ninguno" },
        { name: "Natación o aqua-gym", sets: 1, reps: 30, bodyPart: "cuerpo completo", equipment: "piscina" },
        { name: "Fuerza con máquinas (baja carga)", sets: 3, reps: 15, bodyPart: "cuerpo completo", equipment: "máquinas" },
        { name: "Tai-chi o yoga suave", sets: 1, reps: 30, bodyPart: "equilibrio y flexibilidad", equipment: "esterilla" },
      ],
      nutrition: {
        caloricAdjustment: -200,
        proteinPerKg: 1.5,
        carbsPercent: 45,
        fatsPercent: 30,
        mealsPerDay: 4,
        guidelines: ["Déficit leve", "Alto en calcio y vitamina D", "Fibra alta", "Poco sodio y azúcar"],
      },
    },
    gain_muscle: {
      intensity: "baja-moderada",
      exercises: [
        { name: "Sentadilla asistida", sets: 3, reps: 12, bodyPart: "piernas", equipment: "máquina" },
        { name: "Remo sentado", sets: 3, reps: 12, bodyPart: "espalda", equipment: "máquina" },
        { name: "Extensiones de pierna", sets: 3, reps: 15, bodyPart: "cuádriceps", equipment: "máquina" },
        { name: "Press de hombros liviano", sets: 3, reps: 12, bodyPart: "hombros", equipment: "mancuernas" },
        { name: "Elevación de gemelos", sets: 3, reps: 20, bodyPart: "gemelos", equipment: "ninguno" },
      ],
      nutrition: {
        caloricAdjustment: 150,
        proteinPerKg: 1.7,
        carbsPercent: 45,
        fatsPercent: 30,
        mealsPerDay: 4,
        guidelines: ["Superávit leve", "Omega-3", "Calcio y vitamina D", "Colágeno hidrolizado"],
      },
    },
    maintain: {
      intensity: "baja-moderada",
      exercises: [
        { name: "Caminata diaria", sets: 1, reps: 30, bodyPart: "cardiovascular", equipment: "ninguno" },
        { name: "Equilibrio y coordinación", sets: 2, reps: 10, bodyPart: "equilibrio", equipment: "ninguno" },
        { name: "Yoga suave", sets: 1, reps: 30, bodyPart: "flexibilidad", equipment: "esterilla" },
        { name: "Natación recreativa", sets: 1, reps: 30, bodyPart: "cuerpo completo", equipment: "piscina" },
      ],
      nutrition: {
        caloricAdjustment: 0,
        proteinPerKg: 1.4,
        carbsPercent: 45,
        fatsPercent: 30,
        mealsPerDay: 4,
        guidelines: ["Rica en antioxidantes", "Poca sal y azúcar", "Alta en fibra", "3 comidas + 2 snacks pequeños"],
      },
    },
    rehabilitation: {
      intensity: "muy baja",
      exercises: [
        { name: "Movilidad articular sentado", sets: 2, reps: 10, bodyPart: "articulaciones", equipment: "silla" },
        { name: "Aqua-gym dirigido", sets: 1, reps: 30, bodyPart: "cuerpo completo", equipment: "piscina" },
        { name: "Estiramientos asistidos", sets: 2, reps: 10, bodyPart: "cuerpo completo", equipment: "esterilla" },
        { name: "Tai-chi o qi-gong", sets: 1, reps: 20, bodyPart: "equilibrio y relajación", equipment: "ninguno" },
      ],
      nutrition: {
        caloricAdjustment: 0,
        proteinPerKg: 1.5,
        carbsPercent: 45,
        fatsPercent: 30,
        mealsPerDay: 5,
        guidelines: ["Antiinflamatoria estricta", "Omega-3 alto", "Calcio, vitamina D y K2", "Evitar alcohol, sal y azúcar"],
      },
    },
  },

  athlete: {
    lose_weight: {
      intensity: "muy alta",
      exercises: [
        { name: "HIIT intenso", sets: 5, reps: 20, bodyPart: "cuerpo completo", equipment: "ninguno" },
        { name: "Fuerza pesada (sentadilla, peso muerto)", sets: 4, reps: 8, bodyPart: "cuerpo completo", equipment: "barra" },
        { name: "Cardio zona 2 (largo)", sets: 1, reps: 60, bodyPart: "cardiovascular", equipment: "ninguno" },
        { name: "Pliometría", sets: 4, reps: 12, bodyPart: "piernas", equipment: "ninguno" },
      ],
      nutrition: {
        caloricAdjustment: -200,
        proteinPerKg: 2.2,
        carbsPercent: 45,
        fatsPercent: 20,
        mealsPerDay: 5,
        guidelines: ["Déficit controlado", "Proteína muy alta", "Carbohidratos periodizados", "Creatina, cafeína, BCAAs"],
      },
    },
    gain_muscle: {
      intensity: "muy alta",
      exercises: [
        { name: "Levantamiento olímpico", sets: 5, reps: 5, bodyPart: "cuerpo completo", equipment: "barra olímpica" },
        { name: "Sentadilla con barra", sets: 5, reps: 6, bodyPart: "piernas", equipment: "barra" },
        { name: "Press de banca pesado", sets: 5, reps: 6, bodyPart: "pecho", equipment: "barra" },
        { name: "Peso muerto", sets: 4, reps: 5, bodyPart: "espalda", equipment: "barra" },
        { name: "Pliometría y potencia", sets: 4, reps: 10, bodyPart: "piernas", equipment: "ninguno" },
      ],
      nutrition: {
        caloricAdjustment: 450,
        proteinPerKg: 2.4,
        carbsPercent: 50,
        fatsPercent: 20,
        mealsPerDay: 6,
        guidelines: ["Superávit alto", "Proteína muy alta", "Timing de nutrientes preciso", "Carbohidratos altos pre/post"],
      },
    },
    maintain: {
      intensity: "alta",
      exercises: [
        { name: "Fuerza compuesta 3x/semana", sets: 4, reps: 8, bodyPart: "cuerpo completo", equipment: "barra" },
        { name: "Cardio específico del deporte", sets: 1, reps: 45, bodyPart: "cardiovascular", equipment: "ninguno" },
        { name: "Movilidad y recuperación", sets: 1, reps: 30, bodyPart: "flexibilidad", equipment: "esterilla" },
        { name: "Técnica y habilidades", sets: 3, reps: 15, bodyPart: "específico del deporte", equipment: "específico" },
      ],
      nutrition: {
        caloricAdjustment: 0,
        proteinPerKg: 2.0,
        carbsPercent: 50,
        fatsPercent: 20,
        mealsPerDay: 5,
        guidelines: ["Calorías de mantenimiento alto", "Carbohidratos según actividad", "Hidratación y electrolitos"],
      },
    },
    rehabilitation: {
      intensity: "baja-moderada",
      exercises: [
        { name: "Fisioterapia deportiva específica", sets: 2, reps: 10, bodyPart: "zona afectada", equipment: "específico" },
        { name: "Trabajo en piscina", sets: 1, reps: 30, bodyPart: "cuerpo completo", equipment: "piscina" },
        { name: "Activación muscular progresiva", sets: 3, reps: 15, bodyPart: "zona afectada", equipment: "bandas" },
        { name: "Movilidad y ROM", sets: 2, reps: 15, bodyPart: "articulaciones", equipment: "esterilla" },
      ],
      nutrition: {
        caloricAdjustment: 0,
        proteinPerKg: 2.0,
        carbsPercent: 45,
        fatsPercent: 25,
        mealsPerDay: 5,
        guidelines: ["Proteína alta para recuperación", "Omega-3 y cúrcuma", "Colágeno + vitamina C", "Evitar alcohol totalmente"],
      },
    },
  },
};

export function getAgeProfile(age) {
  if (age >= 15 && age <= 25) return "young";
  if (age >= 26 && age <= 45) return "adult";
  if (age >= 46) return "senior";
  return "adult";
}

export function getPreset(age, goal, isAthlete = false) {
  const profile = isAthlete ? "athlete" : getAgeProfile(age);
  return presets[profile]?.[goal] || presets["adult"]["maintain"];
}