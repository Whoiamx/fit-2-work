"use client";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight } from "lucide-react";
import Image from "next/image";

export const AIPoweredFeaturesSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Main AI Explanation - Two Columns */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Column: Text */}
          <div>
            <Badge className="mb-4 bg-blue-100 text-blue-700">
              ✨ Potenciado por IA
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              La Inteligencia Artificial Detrás de JobAI Pro
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Fit2Work aprovecha el poder de modelos de lenguaje avanzados, como
              los utilizados en ChatGPT, para ofrecerte herramientas de búsqueda
              laboral sin precedentes.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Modelos de lenguaje de última generación</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Entrenado con datos de éxito laboral</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Resultados precisos y personalizados</span>
              </li>
            </ul>
            <Button className="mt-8 bg-blue-600 hover:bg-blue-700">
              Descubre el Poder de la IA
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Right Column: Image */}
          <div className="flex justify-center items-center">
            <Image
              src={"/openai.png"}
              width={500}
              height={500}
              alt="logoopenai
            "
            />
          </div>
        </div>
      </div>
    </section>
  );
};
