"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb } from "lucide-react";

const tips = [
  "Optimiza tu CV con palabras clave relevantes del puesto al que aplicas.",
  "Prepara respuestas a preguntas conductuales usando el método STAR (Situación, Tarea, Acción, Resultado).",
  "Personaliza cada carta de presentación para la oferta de trabajo específica.",
  "Actualiza tu perfil de LinkedIn con tus logros y habilidades más recientes.",
  "Investiga a fondo la empresa y el entrevistador antes de cada entrevista.",
  "Practica tu 'elevator pitch' para presentarte de forma concisa y efectiva.",
  "Conecta con profesionales de tu sector en LinkedIn para expandir tu red.",
  "Pide feedback después de las entrevistas, incluso si no obtienes el puesto.",
  "No te desanimes, la búsqueda de empleo es un maratón, no una carrera de velocidad.",
  "Destaca tus habilidades blandas (comunicación, liderazgo) en tu CV y entrevistas.",
  "Asegúrate de que tu CV sea fácil de leer para los sistemas ATS (Applicant Tracking Systems).",
  "Envía un correo de agradecimiento después de cada entrevista.",
  "Define tus objetivos profesionales a corto y largo plazo.",
  "Considera hacer voluntariado o proyectos personales para ganar experiencia.",
  "Mantén una actitud positiva y proactiva durante todo el proceso.",
];

export const RandomTips = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-12 max-w-2xl mx-auto bg-white/70 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
      <div className="flex items-center space-x-3 text-gray-800">
        <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentTipIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-base font-medium"
            >
              {tips[currentTipIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
