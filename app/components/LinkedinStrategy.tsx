"use client";

import { Badge } from "@/components/ui/badge";
import { useState, useCallback, useEffect, useRef } from "react"; // Import useRef
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Linkedin,
  Sparkles,
  ArrowLeft,
  Home,
  Feather,
  Lightbulb,
  Loader2,
  Network,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"; // Import Chevron icons
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "./Navbar";

interface PostIdea {
  title: string;
  content: string;
  hashtags: string[];
  reason: string; // Why this post is good for the algorithm
}

interface HRContactTip {
  title: string;
  description: string;
  keywords: string[];
}

// Static list of HR contact tips to rotate
const hrContactTips: HRContactTip[] = [
  {
    title: "Identifica a los reclutadores clave",
    description:
      "Busca personas con títulos como 'Talent Acquisition', 'Recruiter', 'HR Business Partner', 'Head of People' en empresas de tu interés.",
    keywords: [
      "Talent Acquisition",
      "Recruiter",
      "HR Business Partner",
      "People Operations",
    ],
  },
  {
    title: "Personaliza tus solicitudes de conexión",
    description:
      "En lugar de la invitación predeterminada, envía un mensaje breve y personalizado explicando por qué quieres conectar (ej. 'Vi tu perfil y me interesó tu trabajo en X empresa').",
    keywords: [],
  },
  {
    title: "Interactúa con sus publicaciones",
    description:
      "Comenta, reacciona y comparte contenido relevante de los reclutadores para que noten tu perfil antes de enviar una solicitud de conexión.",
    keywords: [],
  },
  {
    title: "Sigue a empresas y sus equipos de RRHH",
    description:
      "Mantente al tanto de las noticias de la empresa y las vacantes. Esto te dará temas para iniciar conversaciones.",
    keywords: [],
  },
  {
    title: "Participa en eventos virtuales de reclutamiento",
    description:
      "Muchos reclutadores organizan o asisten a webinars y ferias de empleo online. Es una excelente oportunidad para conectar.",
    keywords: [],
  },
  {
    title: "Usa la búsqueda avanzada de LinkedIn",
    description:
      "Filtra por 'Personas', 'Conexiones de 2º grado', y usa palabras clave como 'Recruiting Manager' o 'Talent Specialist' en tu sector.",
    keywords: ["Recruiting Manager", "Talent Specialist", "HR Manager"],
  },
];

// Static list of general strategy tips
const generalStrategyTips: string[] = [
  "Mantén tu perfil actualizado y completo con tus últimos logros y habilidades.",
  "Participa activamente en grupos de LinkedIn relacionados con tu industria.",
  "Publica contenido original o comparte artículos relevantes al menos 2-3 veces por semana.",
  "Valida las habilidades de tus conexiones y pide que validen las tuyas.",
  "Utiliza las 'Skills Endorsements' para destacar tus competencias clave.",
  "Activa el modo 'Open To Work' si estás buscando activamente empleo.",
  "Añade un 'Featured Section' para mostrar proyectos, artículos o videos relevantes.",
  "Pide recomendaciones a antiguos colegas y gerentes para aumentar tu credibilidad.",
];

export const LinkedInStrategy = () => {
  const [jobRole, setJobRole] = useState("");
  const [industry, setIndustry] = useState("");
  const [generatedPostIdeas, setGeneratedPostIdeas] = useState<PostIdea[]>([]);
  const [isLoadingContent, setIsLoadingContent] = useState(false);

  // State for rotating contact strategy tips
  const [currentContactTipIndex, setCurrentContactTipIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Ref to store the interval ID

  const resetInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentContactTipIndex(
        (prevIndex) => (prevIndex + 1) % hrContactTips.length
      );
    }, 30000); // Change every 30 seconds
  }, []);

  useEffect(() => {
    resetInterval(); // Start the interval when component mounts
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // Clear interval on unmount
      }
    };
  }, [resetInterval]);

  const handleNextTip = useCallback(() => {
    setCurrentContactTipIndex(
      (prevIndex) => (prevIndex + 1) % hrContactTips.length
    );
    resetInterval(); // Reset the interval timer on manual interaction
  }, [resetInterval]);

  const handlePrevTip = useCallback(() => {
    setCurrentContactTipIndex(
      (prevIndex) =>
        (prevIndex - 1 + hrContactTips.length) % hrContactTips.length
    );
    resetInterval(); // Reset the interval timer on manual interaction
  }, [resetInterval]);

  // Funcion que controla la generación de contenido (mockeada)
  const handleGenerateContent = useCallback(async () => {
    if (!jobRole.trim() || !industry.trim()) {
      alert(
        "Por favor, ingresa tu puesto e industria para generar ideas de contenido."
      );
      return;
    }

    setIsLoadingContent(true);
    setGeneratedPostIdeas([]);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate AI processing

    const mockPostIdeas: PostIdea[] = [
      {
        title: `Tendencias en ${industry}`,
        content: `¡Interesante artículo sobre las últimas tendencias en ${industry}! ¿Qué opinan sobre [mencionar una tendencia específica]? #${industry.replace(
          /\s/g,
          ""
        )} #Tendencias #Innovación`,
        hashtags: [
          `#${industry.replace(/\s/g, "")}`,
          "#Tendencias",
          "#Innovación",
        ],
        reason:
          "Fomenta la interacción y muestra que estás al día con el sector.",
      },
      {
        title: `Mi experiencia como ${jobRole}`,
        content: `Como ${jobRole}, he aprendido que [mencionar un aprendizaje clave]. ¿Cuál ha sido su mayor aprendizaje en su rol? #${jobRole.replace(
          /\s/g,
          ""
        )} #ExperienciaProfesional #Consejos`,
        hashtags: [
          `#${jobRole.replace(/\s/g, "")}`,
          "#ExperienciaProfesional",
          "#Consejos",
        ],
        reason:
          "Genera autenticidad y abre el diálogo sobre experiencias compartidas.",
      },
      {
        title: `Pregunta a la comunidad`,
        content: `Estoy explorando [un tema específico relacionado con tu rol/industria]. ¿Alguna recomendación de recursos o herramientas? ¡Leo sus comentarios! #PreguntaALaComunidad #${industry.replace(
          /\s/g,
          ""
        )} #${jobRole.replace(/\s/g, "")}`,
        hashtags: [
          "#PreguntaALaComunidad",
          `#${industry.replace(/\s/g, "")}`,
          `#${jobRole.replace(/\s/g, "")}`,
        ],
        reason: "Aumenta el engagement al pedir opiniones y recomendaciones.",
      },
    ];
    setGeneratedPostIdeas(mockPostIdeas);
    setIsLoadingContent(false);
  }, [jobRole, industry]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col lg:flex-row p-6 gap-6">
        {/* Panel Izquierdo - Formularios de Entrada */}
        <div className="w-full flex flex-col gap-8 lg:w-1/2 bg-white rounded-lg shadow-md p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Define tu Estrategia en LinkedIn para Mejorar tu{" "}
            <u className="text-blue-600 font-bold"> {""} Visibilidad</u>
          </h2>

          {/* Sección de Contenido */}
          <Card className="mb-6 bg-blue-50 border-blue-200">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Feather className="w-5 h-5 text-blue-600" />
                <CardTitle className="text-xl text-blue-900">
                  Generador de Contenido
                </CardTitle>
              </div>
              <CardDescription className="text-blue-800">
                Obtén ideas de publicaciones que resuenen con el algoritmo de
                LinkedIn.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label
                  htmlFor="job-role"
                  className="text-gray-700 font-medium mb-2 block"
                >
                  Tu Puesto de Trabajo
                </Label>
                <Input
                  id="job-role"
                  placeholder="Ej: Desarrollador Frontend, Gerente de Marketing"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                />
              </div>
              <div>
                <Label
                  htmlFor="industry"
                  className="text-gray-700 font-medium mb-2 block"
                >
                  Tu Industria
                </Label>
                <Input
                  id="industry"
                  placeholder="Ej: Tecnología, Finanzas, Salud"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                />
              </div>
              <Button
                onClick={handleGenerateContent}
                disabled={
                  isLoadingContent || !jobRole.trim() || !industry.trim()
                }
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2"
              >
                {isLoadingContent ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generando Ideas...
                  </>
                ) : (
                  <>
                    Generar Ideas de Publicación
                    <Sparkles className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Sección de Contactos y Red - Now with rotating tips and navigation */}
          <Card className="bg-purple-50 border-purple-200">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Network className="w-5 h-5 text-purple-600" />
                <CardTitle className="text-xl text-purple-900">
                  Estrategia de Contactos y Red
                </CardTitle>
              </div>
              <CardDescription className="text-purple-800">
                Descubre cómo identificar y conectar con profesionales clave de
                RRHH.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative min-h-[120px] flex items-center justify-center px-12">
              {" "}
              {/* Added px for button space */}
              {/* Previous Tip Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevTip}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-purple-700 hover:bg-purple-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              {/* Rotating Tip Display */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentContactTipIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center space-y-2"
                >
                  <h4 className="font-semibold text-purple-800 mb-1">
                    {hrContactTips[currentContactTipIndex].title}
                  </h4>
                  <p className="text-sm text-purple-700">
                    {hrContactTips[currentContactTipIndex].description}
                  </p>
                  {hrContactTips[currentContactTipIndex].keywords.length >
                    0 && (
                    <div className="mt-2 flex flex-wrap gap-1 justify-center">
                      <span className="text-xs text-purple-600 font-medium">
                        Palabras clave:
                      </span>
                      {hrContactTips[currentContactTipIndex].keywords.map(
                        (keyword, kwIndex) => (
                          <Badge
                            key={kwIndex}
                            variant="outline"
                            className="bg-purple-100 text-purple-700 border-purple-300"
                          >
                            {keyword}
                          </Badge>
                        )
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
              {/* Next Tip Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNextTip}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-purple-700 hover:bg-purple-100"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </CardContent>
          </Card>

          {generalStrategyTips.length > 0 && (
            <Card className="bg-green-50 border-green-200">
              <CardHeader className="flex flex-row items-center space-x-3 p-4 pb-2">
                <Lightbulb className="w-6 h-6 text-green-600" />
                <CardTitle className="text-xl text-green-900">
                  Tips Generales para tu Estrategia
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <ul className="list-disc list-inside text-green-700 space-y-1">
                  {generalStrategyTips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Panel Derecho - Recomendaciones y Tips */}
        <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Tus Recomendaciones de Estrategia
          </h2>

          {isLoadingContent ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-600">
              <Loader2 className="h-12 w-12 animate-spin text-blue-500 mb-4" />
              <p className="text-lg">
                Generando tu estrategia personalizada...
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Ideas de Publicación Generadas */}
              {generatedPostIdeas.length > 0 && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader className="flex flex-row items-center space-x-3 p-4 pb-2">
                    <Feather className="w-6 h-6 text-blue-600" />
                    <CardTitle className="text-xl text-blue-900">
                      Ideas de Publicación para LinkedIn
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-4">
                    {generatedPostIdeas.map((idea, index) => (
                      <div
                        key={index}
                        className="border-b border-blue-100 pb-3 last:border-b-0 last:pb-0"
                      >
                        <h4 className="font-semibold text-blue-800 mb-1">
                          {idea.title}
                        </h4>
                        <p className="text-sm text-blue-700 whitespace-pre-line">
                          {idea.content}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {idea.hashtags.map((tag, tagIndex) => (
                            <Badge
                              key={tagIndex}
                              variant="outline"
                              className="bg-blue-100 text-blue-700 border-blue-300"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-blue-600 mt-2">
                          <Lightbulb className="inline w-3 h-3 mr-1 text-blue-500" />
                          Por qué funciona: {idea.reason}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Tips Generales de Estrategia */}

              {!generatedPostIdeas.length && (
                <div className="text-center text-gray-500 py-12">
                  <Linkedin className="w-20 h-20 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg">
                    Ingresa tu información y genera tu estrategia personalizada
                    para LinkedIn.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
