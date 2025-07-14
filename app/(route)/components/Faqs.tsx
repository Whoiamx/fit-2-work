"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export const Faqs = () => {
  const faqs = [
    {
      question: "¿Cómo garantiza Fit2Work la privacidad de mis datos?",
      answer:
        "En Fit2Work, la privacidad de tus datos es nuestra máxima prioridad.",
    },
    {
      question:
        "¿La IA de Fit2Work  utiliza mis datos para entrenar sus modelos?",
      answer:
        "No, los datos que ingresas en Fit2Work  (como tu CV o descripciones de puestos) se utilizan únicamente para generar resultados personalizados para ti. No usamos tus datos personales para entrenar nuestros modelos de IA, asegurando que tu información permanezca confidencial y no se incorpore a futuros resultados de otros usuarios.",
    },
    {
      question: "¿Qué tan precisas son las sugerencias de la IA?",
      answer:
        "Nuestra IA está entrenada con una vasta cantidad de datos de éxito laboral y se actualiza constantemente para reflejar las últimas tendencias del mercado. Si bien las sugerencias son altamente precisas y personalizadas, siempre recomendamos revisar y adaptar el contenido generado para que se ajuste perfectamente a tu estilo y a los requisitos específicos de cada aplicación.",
    },
    {
      question:
        "¿Puedo descargar los documentos generados en diferentes formatos?",
      answer:
        "Sí, Fit2Work te permite descargar los documentos generados, como tu CV o cartas de presentación, en varios formatos populares como PDF y Word. Esto te asegura compatibilidad y facilidad de uso al momento de aplicar a diferentes ofertas de trabajo.",
    },
  ];

  return (
    <div className="m-24 p-6 max-w-3xl mx-auto text-left">
      <div className="flex items-center justify-center mb-8">
        <HelpCircle className="w-8 h-8 text-blue-600 mr-3" />
        <h2 className="text-3xl font-bold text-gray-900">
          Preguntas Frecuentes
        </h2>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
