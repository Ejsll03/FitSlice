# Proyecto 1 — Componentes en el Frontend

> **Evaluación Sumativa 1 · 25% · Modalidad individual** Asignatura: Programación Basada en Componentes Catedrático: Ing. Victor Kneider Período académico: Trimestre 2026B

Documento de requerimientos técnicos, cronograma y rúbrica de evaluación del Proyecto 1. **Tema libre, restricción técnica precisa.**

---

## 1. Resumen ejecutivo

El Proyecto 1 es la evaluación sumativa de la **Unidad I** y representa el **25% de la calificación final** de la asignatura. El estudiante diseña, implementa, defiende y entrega una aplicación web propia que demuestre dominio del paradigma de programación basada en componentes.

**Principio rector:** el tema de la aplicación es libre, los requerimientos técnicos son obligatorios y verificables. El paradigma de componentes se aprende construyendo lo que a uno le interesa: la motivación intrínseca profundiza el aprendizaje técnico y permite defender con convicción las decisiones de diseño. Dos estudiantes pueden tener proyectos completamente distintos en su tema y ambos cumplir el 100% de los requerimientos.

### Tipos de aplicación válidos

Cualquier aplicación web que cumpla los diez requerimientos técnicos. Algunos ejemplos para inspirarse:

- **Productividad personal:** trackers de hábitos, gestores de tareas, diarios temáticos.
- **Catálogos navegables con búsqueda:** recetas, libros, películas, juegos, lugares.
- **Dashboards informativos:** clima, criptomonedas, transporte público, deportes.
- **Herramientas de aprendizaje:** diccionarios, glosarios, simuladores, quizzes.
- **Mini-redes sociales temáticas:** reseñas, listas compartidas, foros de nicho.

> Esta lista es ilustrativa, no exhaustiva. El catedrático aprueba o pide ajustes a la propuesta que cada estudiante presente en la Actividad 03.

### Datos clave

| Campo                 | Valor                                       |
| --------------------- | ------------------------------------------- |
| Modalidad             | Individual                                  |
| Período de desarrollo | 3 semanas                                   |
| Entregas parciales    | Previo a la entrega                         |
| Defensa final         | Semana 5 — presentación oral + demo en vivo |
| Peso académico        | 25% de la calificación final                |
| Calificación máxima   | 20 puntos                                   |

---

## 2. Marco técnico

El proyecto se desarrolla con **Slice.js**, framework basado en componentes desarrollado en la Escuela de Ingeniería de Computación de la Universidad Rafael Urdaneta y publicado en la Revista Tecnocientífica URU N.º 28 (2025).

### Capacidades de Slice.js que el proyecto debe utilizar

El proyecto debe utilizar **todas** las siguientes capacidades del framework:

| Capacidad                                   | Sistema en Slice.js |
| ------------------------------------------- | ------------------- |
| Gestor de contexto / state global           | Slice Context       |
| Gestor de eventos / event bus               | Slice Events        |
| Gestor de tema                              | Slice ThemeManager  |
| Sistema de routing                          | Slice Router        |
| Definición de componentes con ciclo de vida | Custom Elements     |

---

## 3. Los diez requerimientos técnicos

El proyecto debe cumplir los diez requerimientos descritos a continuación. Cada uno tiene criterios de cumplimiento verificables que el catedrático evalúa en la defensa final.

### R01 — Framework basado en componentes

La aplicación está construida con Slice.js. No se aceptan implementaciones basadas únicamente en HTML+JavaScript sin sistema de componentes.

### R02 — Gestor de contexto / state global

La aplicación utiliza el sistema de contexto de Slice.js para compartir estado entre componentes sin prop drilling. Debe haber al menos un dato compartido entre componentes que no sean directamente padre-hijo.

### R03 — Gestor de eventos

La aplicación utiliza el sistema de eventos de Slice.js para comunicación desacoplada entre componentes. Debe haber al menos un emisor y un suscriptor en componentes distintos. El modal del R07 debe abrirse y cerrarse vía eventos.

### R04 — Gestor de tema con modo claro y oscuro

La aplicación implementa el ThemeManager de Slice.js alternando al menos entre modo claro y modo oscuro. La preferencia debe persistir entre sesiones (localStorage o equivalente). El cambio de tema debe ser instantáneo, sin recarga.

### R05 — Tema visual propio

El proyecto define su propio sistema de diseño: paleta, tipografía, espaciados, bordes. No se acepta el tema por defecto del framework. Debe documentarse la decisión cromática y tipográfica en el README.

### R06 — Mínimo 3 entidades modeladas

La aplicación modela y persiste al menos 3 entidades distintas. Persistencia válida: localStorage, IndexedDB o backend si aplica. Debe haber al menos una relación entre dos de las entidades (una entidad referencia a otra).

### R07 — Modal interactivo

La aplicación incluye al menos un modal funcional que se abre y cierra vía sistema de eventos del framework (ver R03). El modal debe contener formularios o vistas detalladas reales, no decoración.

### R08 — Mínimo 3 vistas con router

La aplicación tiene al menos 3 vistas/rutas navegables, manejadas con el Slice Router. Las vistas deben ser semánticamente distintas (no la misma vista con parámetros).

### R09 — Consumo de API externa

La aplicación consume al menos un endpoint de una API REST pública. Debe manejar los estados de carga (loading), éxito (success) y error con feedback visual al usuario. El consumo debe estar abstraído en un módulo dedicado, no inline en componentes.

### R10 — Arquitectura completamente componentizada

No existe lógica monolítica concentrada en archivos largos. Los componentes tienen responsabilidad única. La estructura de carpetas separa: componentes, vistas, servicios (lógica de API), stores (gestión de estado), assets, utilidades.

---

### Formato de la propuesta (`PROPUESTA.md`)

El documento de propuesta del Avance 1 debe contener al menos las siguientes secciones:

1. **Idea del proyecto** — qué es la aplicación, qué problema resuelve, quién la usaría.
2. **Justificación** — por qué este tema. Conexión con un interés personal o académico real.
3. **Entidades** — listado de las 3 entidades con sus atributos principales y relaciones.
4. **Vistas** — listado de las 3 vistas con descripción de qué muestra cada una.
5. **API externa** — nombre de la API, URL, qué endpoint(s) se consumirán y para qué.
6. **Wireframes** — bocetos visuales de cada vista. Se admiten fotos de papel, capturas de Figma, dibujos en draw.io.
7. **Stack adicional** — librerías de terceros que se vayan a integrar más allá del framework base.

#### Plantilla mínima sugerida

```markdown
# PROPUESTA · [Nombre del proyecto]

## 1. Idea del proyecto
[2-4 líneas: qué es, qué problema resuelve, quién la usa]

## 2. Justificación
[Por qué este tema. Conexión con interés personal o académico]

## 3. Entidades

### Entidad 1: [Nombre]
- Atributos: campo1, campo2, ...
- Relación: [cómo se relaciona con otras entidades]

### Entidad 2: [Nombre]
- Atributos: ...
- Relación: ...

### Entidad 3: [Nombre]
- Atributos: ...
- Relación: ...

## 4. Vistas

| Ruta | Vista | Descripción |
|---|---|---|
| /             | Home              | [...] |
| /[recurso]    | Listado/Catálogo  | [...] |
| /[recurso]/:id | Detalle          | [...] |

## 5. API externa
- Nombre: [...]
- Documentación: [URL]
- Endpoints a consumir:
  - GET /xxxxx — para [...]
  - GET /yyyyy — para [...]

## 6. Wireframes
[Imágenes incrustadas o enlaces]

## 7. Stack adicional
- [librería]: para [...]
```

### Retroalimentación de la propuesta

El catedrático revisa cada propuesta y devuelve una de tres respuestas:

- **Aprobada** — el estudiante avanza con confianza.
- **Aprobada con observaciones** — el estudiante ajusta y avanza.
- **Requiere revisión** — el estudiante reformula la propuesta antes de avanzar.

---

## 5. Rúbrica de evaluación

Rúbrica tipo Likert con 5 criterios y escala 0–4. Total: 20 puntos.

| Criterio                                                                                                                                                                     | 0 — No cumple                                                                                                                                                                                 | 1 — Deficiente                                                                                                                                                               | 2 — Aceptable                                                                                                                                                                                            | 3 — Bueno                                                                                                                                                                                | 4 — Excelente                                                                                                                                                                                                   |      Pts      |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-----------: |
| **1. Cumplimiento técnico de requerimientos**<br/>_Implementación verificable de los 10 requerimientos R01–R10._                                                             | No entrega proyecto funcional o cumple 0–3 requerimientos.                                                                                                                                    | Cumple 4–5 requerimientos con calidad cuestionable. Faltan piezas centrales (state, eventos, router o API).                                                                  | Cumple 6–7 requerimientos con funcionamiento correcto. Algunos parciales o frágiles ante uso real.                                                                                                       | Cumple 8–9 requerimientos íntegramente. El faltante es accesorio o parcial pero documentado.                                                                                             | Cumple los 10 requerimientos íntegramente. Todos verificables en demo en vivo y soportados por código limpio.                                                                                                   |     \_\_      |
| **2. Arquitectura componentizada**<br/>_Separación de capas, responsabilidad única, ausencia de lógica monolítica._                                                          | Código monolítico. Toda la lógica concentrada en pocos archivos. No hay separación de capas.                                                                                                  | Hay componentes pero con responsabilidades mezcladas. La lógica de negocio vive dentro de componentes de presentación.                                                       | Separación parcial: componentes y vistas distinguidos pero servicios y stores no están aislados o son inconsistentes.                                                                                    | Separación clara: componentes, vistas, servicios y stores en carpetas propias. Componentes con responsabilidad mayormente única.                                                         | Arquitectura ejemplar: capas perfectamente separadas (componentes, vistas, servicios, stores, utils). Cada componente con responsabilidad única demostrable. Reutilización efectiva.                            |     \_\_      |
| **3. Calidad del código y buenas prácticas**<br/>_Legibilidad, naming, ausencia de código muerto, commits descriptivos._                                                     | Código ilegible, nombres genéricos (`x`, `data`, `temp`), sin commits descriptivos. Código comentado masivamente o copiado sin entender.                                                      | Naming inconsistente. Código muerto presente. Commits con mensajes vagos ("update", "fix"). Falta convenciones de estilo.                                                    | Naming aceptable, código legible en su mayoría. Algún código muerto o comentarios sin valor. Commits razonables aunque a veces masivos.                                                                  | Naming claro y consistente. Cero código muerto. Convenciones de estilo aplicadas. Commits atómicos y descriptivos.                                                                       | Código autoexplicativo, naming preciso, organización modélica. Formato automático. Historia de commits que cuenta la evolución del proyecto.                                                                    |     \_\_      |
| **3. Calidad del código y buenas prácticas**<br/>_Legibilidad, naming, ausencia de código muerto, commits descriptivos, visibilidad clara del ciclo de vida de componentes._ | Código ilegible, nombres genéricos (`x`, `data`, `temp`), sin commits descriptivos. Código comentado masivamente o copiado sin entender. No se evidencia el ciclo de vida de los componentes. | Naming inconsistente. Código muerto presente. Commits con mensajes vagos ("update", "fix"). Falta convenciones de estilo. Ciclo de vida de componentes poco claro o ausente. | Naming aceptable, código legible en su mayoría. Algún código muerto o comentarios sin valor. Commits razonables aunque a veces masivos. Ciclo de vida de componentes parcialmente visible o documentado. | Naming claro y consistente. Cero código muerto. Convenciones de estilo aplicadas. Commits atómicos y descriptivos. Ciclo de vida de componentes bien documentado y visible en el código. | Código autoexplicativo, naming preciso, organización modélica. Formato automático. Historia de commits que cuenta la evolución del proyecto. Ciclo de vida de componentes ejemplarmente expuesto y aprovechado. |     \_\_      |
| **4. Diseño visual y experiencia de usuario**<br/>_Tema propio, modo claro/oscuro, navegación intuitiva, manejo de estados._                                                 | No tiene tema propio (usa el por defecto del framework) o el diseño es ininteligible. Estados de carga/error ignorados.                                                                       | Tema rudimentario, paleta inconsistente. Modo claro/oscuro presente pero con bugs visuales. Estados de API parcialmente manejados.                                           | Tema propio reconocible. Modo claro/oscuro funcional. Algunos estados de carga/error presentes pero inconsistentes entre vistas.                                                                         | Sistema de diseño coherente: paleta y tipografía intencionales. Modo claro/oscuro pulido. Estados de carga, éxito y error manejados consistentemente.                                    | Sistema de diseño excelente: tema propio con identidad visual clara, transiciones cuidadas, accesibilidad considerada. UX que destaca por su atención al detalle.                                               |     \_\_      |
| **5. Documentación y defensa oral**<br/>_PROPUESTA.md, README, PROGRESS.md, presentación + Q&A._                                                                             | No entrega documentación o el README es inservible. En la defensa no logra explicar decisiones propias o se atribuye trabajo que no entiende.                                                 | Documentos presentes pero incompletos. PROPUESTA.md no fue aprobada en su momento. Defensa con dificultades para responder preguntas básicas.                                | Documentos cumplen lo mínimo. Defensa clara en aspectos de alto nivel pero flaquea ante preguntas técnicas específicas.                                                                                  | Documentación completa y útil: README ejecuta el proyecto sin fricción, PROGRESS.md actualizado. Defensa segura con buen dominio del código.                                             | Documentación de calidad profesional. Defensa fluida, demuestra dominio total del código y de las decisiones técnicas. Responde con criterio preguntas no previstas.                                            |     \_\_      |
|                                                                                                                                                                              |                                                                                                                                                                                               |                                                                                                                                                                              |                                                                                                                                                                                                          |                                                                                                                                                                                          | **TOTAL**                                                                                                                                                                                                       | **\_\_ / 20** |

---

## 6. Anexo · Ejemplos de propuestas

Para calibrar expectativas, los siguientes son ejemplos de propuestas que el catedrático aprobaría sin reservas y propuestas que pediría reformular.

### Propuestas válidas

#### Ejemplo válido 01 — Tracker de hábitos personal con clima

> Tres entidades: hábito, registro diario, objetivo mensual. Tres vistas: dashboard del día, historial calendario, configuración de hábitos. API: OpenWeatherMap (el clima del día se muestra en el dashboard porque algunos hábitos dependen del clima, ej: correr al aire libre). Modal: edición/creación de hábitos. Tema propio neutral con dos modos.

#### Ejemplo válido 02 — Catálogo personal de juegos pendientes

> Tres entidades: juego, lista (wishlist / playing / done), nota personal. Tres vistas: catálogo navegable, detalle de juego, mis listas. API: RAWG Video Games (búsqueda y metadatos). Modal: añadir un juego con sus datos completos. Tema con modo claro y modo oscuro tipo gaming.

### Propuestas que requieren reformular

#### Requiere revisión 01 — Calculadora con varios tipos de operaciones

> No tiene entidades persistibles claras, no necesita router (todo cabe en una vista), no tiene contexto que justifique consumir API externa. El dominio no encaja con los requerimientos.

#### Requiere revisión 02 — Blog estático con 3 artículos

> Aunque tiene 3 vistas (artículo 1, 2, 3) son semánticamente la misma vista con contenido distinto, no 3 vistas reales (incumple R08). No hay relación entre entidades. El consumo de API se forzaría artificialmente.

#### Requiere revisión 03 — Clon de Twitter completo

> Demasiado ambicioso para 3 semanas. No alcanza el tiempo, el estudiante terminará entregando funcionalidades a medias. El catedrático sugiere recortar a un alcance razonable (ej: feed de un solo tema, sin perfiles ni mensajes privados).

---

_Documento de uso académico — Universidad Rafael Urdaneta · Facultad de Ingeniería · Escuela de Ingeniería de Computación · Trimestre 2026B_
