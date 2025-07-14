"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  MessageSquare,
  Linkedin,
  Mail,
  CheckCircle,
  User,
  ArrowRight,
} from "lucide-react";
import { Footer } from "./Footer";
import { CtaSection } from "./CtaSection";
import Link from "next/link";
import { LinkedInPostCard } from "@/components/ui/LinkedinPostCard";
import Image from "next/image";
import { Roadmap } from "./Roadmap";
import { RandomTips } from "@/components/ui/randomTips";
import { AIPoweredFeaturesSection } from "./AIPowered";

const tools = [
  {
    id: "interview-simulator",
    title: "Simulador de Entrevistas",
    description:
      "Practica entrevistas laborales según tu puesto y rubro deseado",
    icon: MessageSquare,
    color: "bg-blue-500",
    features: [
      "Feedback automático",
      "Preguntas personalizadas",
      "Análisis de respuestas",
    ],
    route: "/interview-simulator",
  },
  {
    id: "cv-creator",
    title: "Creador de CV Profesional",
    description: "Genera un CV atractivo y profesional con formulario guiado",
    icon: FileText,
    color: "bg-purple-500",
    features: [
      "Diseños modernos",
      "Optimizado para ATS",
      "Descarga instantánea",
    ],
    route: "/cv-creator",
  },
  {
    id: "linkedin-strategy",
    title: "Estrategia LinkedIn",
    description:
      "Diseña publicaciones estratégicas para aumentar tu visibilidad",
    icon: Linkedin,
    color: "bg-blue-600",
    features: [
      "Contenido personalizado",
      "Calendario de posts",
      "Análisis de engagement",
    ],
    route: "/linkedin-strategy",
  },
  {
    id: "cover-letter",
    title: "Generador de Cover Letters",
    description:
      "Redacta cartas y correos personalizados para cada aplicación laboral",
    icon: Mail,
    color: "bg-green-500",
    features: [
      "Personalización automática",
      "Carta personalizada para tu trabajo ideal",
      "Plantilla profesional",
    ],
    route: "/cover-letter",
  },
  {
    id: "cv-optimizer",
    title: "Optimizador de CV",
    description: "Mejora tu CV existente con sugerencias inteligentes",
    icon: CheckCircle,
    color: "bg-orange-500",
    features: [
      "Análisis detallado",
      "Sugerencias de mejora",
      "Comparación con ofertas",
    ],
    route: "/cv-optimizer",
  },
  {
    id: "linkedin-optimizer",
    title: "Optimizador LinkedIn",
    description: "Optimiza tu perfil con guía paso a paso y ejemplos",
    icon: User,
    color: "bg-indigo-500",
    features: ["Guía completa", "Ejemplos reales", "Checklist de optimización"],
    route: "/linkedin-optimizer",
  },
];

export const HeroPage = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-gray-900">
              Fit<span className="text-blue-500">2</span>Work
            </span>

            <div className="w-10 h-10   flex items-center justify-center">
              <Image src={"/iconfit.svg"} width={100} height={100} alt="icon" />
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="#roadmap"
              className="text-gray-600 hover:text-blue-900 hover:underline "
            >
              Roadmap
            </Link>
            <Link
              href="#tools"
              className="text-gray-600 hover:text-blue-900 hover:underline"
            >
              Herramientas
            </Link>
            <Link
              href="#features"
              className="text-gray-600 hover:text-blue-900 hover:underline"
            >
              Características
            </Link>
            <Link
              href="#pricing"
              className="text-gray-600 hover:text-blue-900 hover:underline"
            >
              Sobre Nosotros
            </Link>
          </nav>
        </div>
      </header>

      <section className="container mx-auto px-4 py-16 text-center">
        <div className=" flex  flex-col items-center gap- max-w-4xl mx-auto">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">
            ✨ Potenciado por Inteligencia Artificial
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Mejora tu búsqueda laboral con{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              IA
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Todas las herramientas que necesitas para conseguir tu trabajo
            ideal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="#tools">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
              >
                Comenzar Ahora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 bg-transparent"
            >
              Ver Demo
            </Button>
          </div>
          <div className="relative max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <LinkedInPostCard
                fullName="John Doe"
                jobTitle="Analista QA | #OpenToWork"
                timeAgo="1 día"
                postContent={
                  "Estoy abierto a nuevas oportunidades laborales. Si conoces alguna vacante que se ajuste a mi perfil, ¡agradecería mucho tu ayuda!"
                }
                avatarSrc={
                  " https://avatars.githubusercontent.com/u/12345678?v=4"
                }
              />
            </div>
          </div>
        </div>
      </section>
      <RandomTips />
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60"></div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Herramientas Completas para tu{" "}
            <span className="text-blue-500">
              <i>
                <u>Éxito</u>
              </i>
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Todo lo que necesitas para destacar en tu búsqueda laboral, desde la
            preparación hasta la aplicación.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <Card
                key={tool.id}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg hover:-translate-y-1"
                onClick={() => setSelectedTool(tool.id)}
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                    <Link href={tool.route} target="_BLANK">
                      {tool.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tool.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full border-2 text-md text-white font-bold bg-blue-500 mt-4 hover:bg-green-500 transition-colors">
                    <Link href={tool.route} target="_BLANK">
                      Usar Herramienta
                    </Link>
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
      <section id="roadmap">
        <Roadmap />
      </section>
      {/* Features Section */}
      <AIPoweredFeaturesSection />

      <CtaSection />

      <Footer />
    </div>
  );
};
