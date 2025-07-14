"use client";

import {
  FileText,
  CheckCircle,
  Linkedin,
  Mail,
  MessageSquare,
  CheckLine,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface RoadmapItem {
  title: string;
  description: string;
  icon: React.ElementType;
  route: string;
}

const roadmapItems: RoadmapItem[] = [
  {
    title: "Creador de CV",
    description: "Genera un CV atractivo y optimizado para ATS.",
    icon: FileText,
    route: "/cv-creator",
  },
  {
    title: "Optimizador de CV",
    description: "Mejora tu CV existente con sugerencias de IA.",
    icon: CheckCircle,
    route: "/cv-optimizer",
  },
  {
    title: "Optimizador de LinkedIn",
    description: "Guía paso a paso para un perfil impactante.",
    icon: CheckLine,
    route: "/linkedin-optimizer",
  },
  {
    title: "Estrategia de Linkedin",
    description: "Ajusta tu estrategia de busqueda laboral en Linkedin con IA.",
    icon: Linkedin,
    route: "/linkedin-strategy",
  },
  {
    title: "Creador de Carta de Presentación",
    description: "Redacción personalizada con IA para cada aplicación.",
    icon: Mail,
    route: "/cover-letter",
  },
  {
    title: "Simulador de Entrevistas",
    description: "Practica y recibe feedback instantáneo de IA.",
    icon: MessageSquare,
    route: "/interview-simulator",
  },
];

export const Roadmap = () => {
  return (
    <section className="bg-gradient-to-br from-gray-900 to-blue-950 py-12 text-white relative overflow-hidden">
      {/* Fondo con patrón sutil */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <pattern
            id="grid-pattern"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M40 0H0V40H40V0ZM0 0V40H40V0H0Z"
              stroke="#ffffff"
              strokeOpacity="0.1"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col gap-4 text-center mb-10">
          <h2 className="text-4xl font-bold mb-3 text-white">
            Nuestro Roadmap de{" "}
            <span className="text-blue-500">
              <u>Éxito</u>
            </span>
          </h2>
          <p className="text-lg text-nowrap text-gray-300 max-w-3xl mx-auto">
            Un camino claro para potenciar tu búsqueda laboral con herramientas
            de IA en constante evolución.
          </p>
        </div>

        <div className="relative flex flex-col items-center">
          {/* Línea central del roadmap */}
          <div className="absolute h-full w-1 bg-blue-600 rounded-full left-1/2 transform -translate-x-1/2 hidden md:block"></div>

          <div className="grid md:grid-cols-2 gap-y-16 gap-x-12 w-full">
            {roadmapItems.map((item, index) => {
              const IconComponent = item.icon;
              const isEven = index % 2 === 0; // Para alternar izquierda/derecha en desktop

              return (
                <Link
                  href={item.route}
                  key={index}
                  className="w-full"
                  target="_blank"
                >
                  <div
                    className={`flex items-center w-full ${
                      isEven
                        ? "md:justify-end md:pr-16"
                        : "md:justify-start md:pl-16"
                    }`}
                  >
                    <div
                      className={`flex flex-col items-center text-center md:text-left ${
                        isEven ? "md:items-end" : "md:items-start"
                      } space-y-3 p-3 rounded-lg transition-all duration-300 hover:scale-105`}
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-lg`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-300 max-w-xs">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
