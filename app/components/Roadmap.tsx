"use client";

import type React from "react";

import {
  FileText,
  CheckCircle,
  Linkedin,
  Mail,
  MessageSquare,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface RoadmapItem {
  title: string;
  description: string;
  icon: React.ElementType;
  route: string;
}

const roadmapItems: RoadmapItem[] = [
  {
    title: "Creador de CV Profesional",
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
    icon: Linkedin,
    route: "/linkedin-optimizer",
  },
  {
    title: "Cartas de Presentación",
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
    <section className="bg-gradient-to-br from-gray-900 to-blue-950 py-16 text-white relative overflow-hidden">
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
        <div className="text-center mb-12">
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

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-600 rounded-full hidden md:block"></div>

          <div className="space-y-12 md:space-y-16">
            {roadmapItems.map((item, index) => {
              const IconComponent = item.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center md:items-stretch w-full ${
                    isEven ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  <Card
                    className={`relative w-full md:w-[calc(50%-2rem)] p-4 bg-gray-800 border border-gray-700 shadow-lg transition-all duration-300  hover:scale-[1.02]`}
                  >
                    <CardHeader className="p-0 pb-2 flex flex-row items-center gap-3">
                      <IconComponent className="w-5 h-5 text-white" />

                      <div>
                        <Link href={item.route} target="_blank">
                          <CardTitle className="text-xl font-semibold text-white hover:text-blue-500">
                            {item.title}
                          </CardTitle>
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Link href={item.route} target="_blank">
                        <p className="text-sm text-gray-300 mb-3">
                          {item.description}
                        </p>
                      </Link>
                    </CardContent>

                    <div
                      className={`absolute top-1/2 transform -translate-y-1/2 w-8 h-1 bg-blue-600 hidden md:block ${
                        isEven ? "right-[-2rem]" : "left-[-2rem]"
                      }`}
                    ></div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
