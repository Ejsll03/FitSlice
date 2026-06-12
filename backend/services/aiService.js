import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { getPreset, getAgeProfile } from "./presetsService.js";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateWeeklyPlan(profile) {
  const isAthlete = profile.activityLevel === "very_active";
  const preset = getPreset(profile.age, profile.goal);
  const ageProfile = isAthlete ? "athlete" : getAgeProfile(profile.age);

  const prompt = `
Eres un entrenador personal y nutricionista experto. Tienes un plan base ya definido para un usuario con perfil "${ageProfile}" y objetivo "${profile.goal}". Tu tarea es ADAPTAR ese plan base según las condiciones médicas, discapacidades y preferencias del usuario. NO generes un plan desde cero, usa el plan base y ajústalo.

DATOS DEL USUARIO:
- Nombre: ${profile.name}
- Edad: ${profile.age} años
- Peso: ${profile.weight} kg
- Altura: ${profile.height} cm
- IMC: ${profile.bmi}
- Objetivo: ${profile.goal}
- Condiciones médicas: ${profile.conditions.length > 0 ? profile.conditions.join(", ") : "ninguna"}
- Preferencias alimenticias: ${profile.dietPreferences.length > 0 ? profile.dietPreferences.join(", ") : "ninguna"}
- Nivel de actividad: ${profile.activityLevel}

EQUIPAMIENTO DISPONIBLE: "${profile.availableEquipment || "ninguno"}"

⚠️ REGLA ESTRICTA DE EQUIPAMIENTO:
- SOLO puedes incluir ejercicios que se realicen con el equipamiento listado arriba
- Si el usuario dice "no tengo nada", "ninguno" o "sin equipamiento", TODOS los ejercicios deben ser con peso corporal (calistenia, estiramientos, cardio sin equipo)
- Si el usuario dice "solo mancuernas", NINGÚN ejercicio puede requerir máquinas, barras, piscina ni otro equipamiento
- Si el usuario menciona equipamiento específico, USA SOLO ESE equipamiento
- NUNCA sugieras ejercicios con equipamiento que el usuario no tiene
- Ejemplos de ejercicios sin equipamiento: sentadillas, flexiones, burpees, plancha, zancadas, abdominales, mountain climbers, saltos

PLAN BASE (ejercicios por sesión):
${JSON.stringify(preset.exercises, null, 2)}

NUTRICIÓN BASE:
- Ajuste calórico: ${preset.nutrition.caloricAdjustment > 0 ? "+" : ""}${preset.nutrition.caloricAdjustment} kcal
- Proteína: ${preset.nutrition.proteinPerKg}g por kg de peso (${Math.round(profile.weight * preset.nutrition.proteinPerKg)}g/día)
- Carbohidratos: ${preset.nutrition.carbsPercent}% de las calorías totales
- Grasas: ${preset.nutrition.fatsPercent}% de las calorías totales
- Comidas al día: ${preset.nutrition.mealsPerDay}
- Lineamientos: ${preset.nutrition.guidelines.join(", ")}

INSTRUCCIONES:
1. Usa los ejercicios del plan base como punto de partida para cada día
2. Si el usuario tiene condiciones médicas, reemplaza o elimina los ejercicios contraindicados
3. Adapta TODOS los ejercicios al equipamiento disponible del usuario
4. Varía los ejercicios a lo largo de la semana (no repitas los mismos 7 días)
5. Adapta las comidas a las preferencias alimenticias del usuario
6. Genera advertencias específicas según las condiciones médicas
7. Para cada ejercicio, incluye "englishName": el nombre en inglés tal como aparecería en una base de datos de ejercicios (ExerciseDB), en minúsculas y sin acentos.

Responde ÚNICAMENTE con un JSON válido con esta estructura exacta, sin texto adicional, sin markdown:
{
  "aiSummary": "resumen breve del plan adaptado",
  "warnings": ["advertencia1", "advertencia2"],
  "days": [
    {
      "day": "Lunes",
      "exercises": [
        {
          "name": "nombre del ejercicio en español",
          "englishName": "nombre del ejercicio en inglés para buscar en una base de datos de ejercicios (ej: 'barbell squat', 'push up', 'plank', 'dumbbell row', 'jumping jacks'), en minúsculas",
          "sets": 3,
          "reps": 12,
          "bodyPart": "parte del cuerpo",
          "equipment": "equipamiento"
        }
      ],
      "meals": [
        {
          "type": "breakfast",
          "name": "nombre de la comida",
          "ingredients": ["ingrediente1", "ingrediente2"],
          "calories": 400,
          "protein": 25,
          "carbs": 45,
          "fats": 10
        }
      ]
    }
  ]
}

Genera los 7 días (Lunes a Domingo). Cada día debe tener entre 3 y 5 ejercicios y 3 comidas (breakfast, lunch, dinner).
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text = response.text.replace(/```json|```/g, "").trim();
  return JSON.parse(text);
}

export async function chatWithAI(messages, planContext) {
  const systemContext = `
Eres el asistente personal de FitSlice. Tienes acceso al plan semanal activo del usuario:
${JSON.stringify(planContext, null, 2)}

Ayuda al usuario a ajustar su plan, responde preguntas sobre ejercicios y nutrición, y sugiere modificaciones cuando sea necesario. Sé conciso y amigable.
`;

  const contents = [
    { role: "user", parts: [{ text: systemContext }] },
    { role: "model", parts: [{ text: "Entendido, estoy listo para ayudarte con tu plan." }] },
    ...messages.map((m) => ({
      role: m.role,
      parts: [{ text: m.content }],
    })),
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents,
  });

  return response.text;
}