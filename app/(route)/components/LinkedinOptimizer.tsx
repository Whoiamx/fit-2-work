"use client";

import { Badge } from "@/components/ui/badge";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Linkedin,
  Sparkles,
  ArrowLeft,
  Home,
  Plus,
  Trash2,
  Loader2,
  Lightbulb,
  User,
  Briefcase,
  GraduationCap,
  Award,
  ListChecks,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Navbar } from "./Navbar";

interface ExperienceInput {
  id: string;
  title: string;
  company: string;
  description: string;
}

interface LinkedInRecommendations {
  headline: string;
  summary: string;
  experienceSuggestions: Array<{
    title: string;
    company: string;
    suggestion: string;
  }>;
  skills: string[];
  certifications: string[];
  tips: string[];
}

// --- Example Profile Data ---
const goodProfileExample = {
  headline:
    "Senior Software Engineer | React, Node.js, AWS | Building Scalable Web Applications | #OpenToWork",
  summary:
    "Ingeniero de Software Senior altamente motivado con más de 7 años de experiencia en el desarrollo y despliegue de aplicaciones web robustas y escalables. Historial probado en liderar equipos multifuncionales, optimizar el rendimiento y entregar soluciones innovadoras. Apasionado por el código limpio, el aprendizaje continuo y la contribución a proyectos de impacto. Buscando roles desafiantes en entornos tecnológicos dinámicos.",
  experience: [
    {
      title: "Senior Software Engineer",
      company: "Tech Innovators Inc.",
      description:
        "Lideré el desarrollo de una nueva arquitectura de microservicios, reduciendo la latencia en un 20% y mejorando la fiabilidad del sistema. Mentoricé a desarrolladores junior e implementé pipelines de CI/CD.",
    },
  ],
  skills: [
    "React",
    "Node.js",
    "TypeScript",
    "AWS",
    "Docker",
    "Metodologías Ágiles",
    "Liderazgo",
  ],
  whyGood:
    "Claro, conciso, usa palabras clave relevantes, destaca logros cuantificables, muestra liderazgo y habilidades demandadas. Incluye un llamado a la acción con #OpenToWork.",
};

const badProfileExample = {
  headline: "Desarrollador",
  summary: "Trabajo con computadoras. Me gusta programar. Busco trabajo.",
  experience: [
    {
      title: "Programador",
      company: "Empresa Antigua",
      description: "Hice cosas de programación.",
    },
  ],
  skills: ["Computadoras", "Internet", "Software"],
  whyBad:
    "Vago, sin detalles específicos, no usa palabras clave, no destaca logros ni responsabilidades. No es profesional y no atrae a reclutadores.",
};
// --- End Example Profile Data ---

export default function LinkedInOptimizer() {
  const [aboutMe, setAboutMe] = useState("");
  const [experiences, setExperiences] = useState<ExperienceInput[]>([
    { id: "1", title: "", company: "", description: "" },
  ]);
  const [recommendations, setRecommendations] =
    useState<LinkedInRecommendations | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddExperience = () => {
    setExperiences((prev) => [
      ...prev,
      { id: Date.now().toString(), title: "", company: "", description: "" },
    ]);
  };

  const handleUpdateExperience = (
    id: string,
    field: keyof ExperienceInput,
    value: string
  ) => {
    setExperiences((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const handleRemoveExperience = (id: string) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id));
  };

  const generateRecommendations = useCallback(async () => {
    setIsLoading(true);
    setRecommendations(null); // Clear previous recommendations

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const mockRecommendations: LinkedInRecommendations = {
      headline: `Profesional en ${
        experiences[0]?.title || "Tu Área"
      } | Experto en ${
        experiences[0]?.company || "Habilidades Clave"
      } | #OpenToWork`,
      summary: `Soy un profesional ${
        aboutMe.substring(0, 50) || "dinámico y orientado a resultados"
      } con experiencia en ${
        experiences.map((e) => e.title).join(", ") || "diversas áreas"
      }. Busco aplicar mis habilidades para impulsar el crecimiento y la innovación.`,
      experienceSuggestions: experiences.map((exp) => ({
        title: exp.title,
        company: exp.company,
        suggestion: `Enfócate en logros cuantificables: "Lideré un proyecto que aumentó X en Y%". Usa verbos de acción fuertes.`,
      })),
      skills: [
        "Gestión de Proyectos",
        "Análisis de Datos",
        "Comunicación Estratégica",
        "Liderazgo",
        "Resolución de Problemas",
      ],
      certifications: [
        "Certificación en Scrum Master",
        "Google Analytics Certified",
        "AWS Cloud Practitioner",
      ],
      tips: [
        "Asegúrate de que tu foto de perfil sea profesional y amigable.",
        "Conecta con al menos 500 personas relevantes en tu industria.",
        "Publica contenido de valor regularmente para aumentar tu visibilidad.",
        "Participa en grupos de LinkedIn relacionados con tu campo.",
        "Pide recomendaciones a antiguos colegas y gerentes.",
        "Personaliza tu URL de perfil de LinkedIn para que sea más limpia y fácil de recordar.",
        "Activa el modo 'Open To Work' si estás buscando activamente empleo.",
        "Añade una sección de 'Proyectos' para mostrar tu trabajo y logros.",
        "Valida las habilidades de tus conexiones y pídeles que validen las tuyas.",
        "Utiliza la función de 'Intereses' para seguir empresas y temas relevantes.",
      ],
    };

    setRecommendations(mockRecommendations);
    setIsLoading(false);
  }, [aboutMe, experiences]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navegación Superior */}
      <Navbar />

      {/* New Section: LinkedIn Profile Examples */}
      <div className="container mx-auto p-6 space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Ejemplos de Perfiles LinkedIn
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Compara un perfil optimizado con uno que necesita mejoras para
            entender qué buscan los reclutadores.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Good Profile Example Card */}
          <Card className="border-2 border-green-500 shadow-lg bg-green-50">
            <CardHeader className="flex flex-row items-center space-x-3 p-4 pb-2">
              <CheckCircle className="w-7 h-7 text-green-600" />
              <CardTitle className="text-2xl text-green-800">
                Perfil Óptimo
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-4">
              <div>
                <h4 className="font-semibold text-green-700 mb-1">Titular:</h4>
                <p className="text-green-900 font-medium">
                  {goodProfileExample.headline}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-green-700 mb-1">
                  Acerca de:
                </h4>
                <p className="text-green-900 text-sm leading-relaxed">
                  {goodProfileExample.summary}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-green-700 mb-1">
                  Experiencia (Ejemplo):
                </h4>
                <p className="text-green-900 text-sm">
                  <span className="font-medium">
                    {goodProfileExample.experience[0].title}
                  </span>{" "}
                  en {goodProfileExample.experience[0].company}
                </p>
                <p className="text-green-900 text-sm leading-relaxed mt-1">
                  {goodProfileExample.experience[0].description}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-green-700 mb-1">
                  Habilidades Clave:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {goodProfileExample.skills.map((skill, idx) => (
                    <Badge
                      key={idx}
                      className="bg-green-200 text-green-800 border-green-400"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="bg-green-100 border border-green-300 rounded-md p-3 mt-4">
                <h4 className="font-semibold text-green-700 mb-1">
                  ¿Por qué es bueno?
                </h4>
                <p className="text-green-800 text-sm">
                  {goodProfileExample.whyGood}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Bad Profile Example Card */}
          <Card className="border-2 border-red-500 shadow-lg bg-red-50">
            <CardHeader className="flex flex-row items-center space-x-3 p-4 pb-2">
              <XCircle className="w-7 h-7 text-red-600" />
              <CardTitle className="text-2xl text-red-800">
                Perfil a Mejorar
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-4">
              <div>
                <h4 className="font-semibold text-red-700 mb-1">Titular:</h4>
                <p className="text-red-900 font-medium">
                  {badProfileExample.headline}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-red-700 mb-1">Acerca de:</h4>
                <p className="text-red-900 text-sm leading-relaxed">
                  {badProfileExample.summary}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-red-700 mb-1">
                  Experiencia (Ejemplo):
                </h4>
                <p className="text-red-900 text-sm">
                  <span className="font-medium">
                    {badProfileExample.experience[0].title}
                  </span>{" "}
                  en {badProfileExample.experience[0].company}
                </p>
                <p className="text-red-900 text-sm leading-relaxed mt-1">
                  {badProfileExample.experience[0].description}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-red-700 mb-1">
                  Habilidades Clave:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {badProfileExample.skills.map((skill, idx) => (
                    <Badge
                      key={idx}
                      className="bg-red-200 text-red-800 border-red-400"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="bg-red-100 border border-red-300 rounded-md p-3 mt-4">
                <h4 className="font-semibold text-red-700 mb-1">
                  ¿Por qué es malo?
                </h4>
                <p className="text-red-800 text-sm">
                  {badProfileExample.whyBad}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex flex-1 flex-col lg:flex-row p-6 gap-6">
        {/* Panel Izquierdo - Formularios de Entrada */}
        <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Ingresa tu Información de LinkedIn
          </h2>
          <div className="space-y-6">
            {/* Acerca de ti */}
            <div>
              <Label
                htmlFor="about-me"
                className="text-gray-700 font-medium mb-2 block"
              >
                Acerca de ti (Resumen de tu perfil)
              </Label>
              <Textarea
                id="about-me"
                placeholder="Ej: Profesional de marketing digital con 5 años de experiencia..."
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
                className="min-h-[120px] resize-y"
              />
              <p className="text-sm text-gray-500 mt-1">
                Copia y pega el contenido de tu sección "Acerca de" de LinkedIn.
              </p>
            </div>

            {/* Experiencias */}
            <div>
              <Label className="text-gray-700 font-medium mb-3 block">
                Experiencia Laboral
              </Label>
              {experiences.map((exp, index) => (
                <Card
                  key={exp.id}
                  className="mb-4 p-4 bg-gray-50 border-gray-200"
                >
                  <CardHeader className="flex flex-row items-center justify-between p-0 pb-2">
                    <CardTitle className="text-lg font-semibold text-gray-800">
                      Experiencia {index + 1}
                    </CardTitle>
                    {experiences.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveExperience(exp.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="p-0 space-y-3">
                    <div>
                      <Label
                        htmlFor={`exp-title-${exp.id}`}
                        className="sr-only"
                      >
                        Puesto
                      </Label>
                      <Input
                        id={`exp-title-${exp.id}`}
                        placeholder="Puesto: Desarrollador Frontend"
                        value={exp.title}
                        onChange={(e) =>
                          handleUpdateExperience(
                            exp.id,
                            "title",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor={`exp-company-${exp.id}`}
                        className="sr-only"
                      >
                        Empresa
                      </Label>
                      <Input
                        id={`exp-company-${exp.id}`}
                        placeholder="Empresa: Tech Solutions"
                        value={exp.company}
                        onChange={(e) =>
                          handleUpdateExperience(
                            exp.id,
                            "company",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor={`exp-description-${exp.id}`}
                        className="sr-only"
                      >
                        Descripción
                      </Label>
                      <Textarea
                        id={`exp-description-${exp.id}`}
                        placeholder="Descripción de responsabilidades y logros..."
                        value={exp.description}
                        onChange={(e) =>
                          handleUpdateExperience(
                            exp.id,
                            "description",
                            e.target.value
                          )
                        }
                        className="min-h-[80px] resize-y"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                onClick={handleAddExperience}
                variant="outline"
                className="w-full mt-2 bg-transparent"
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Experiencia
              </Button>
            </div>

            <Button
              onClick={generateRecommendations}
              disabled={
                isLoading ||
                !aboutMe.trim() ||
                experiences.some(
                  (exp) =>
                    !exp.title.trim() ||
                    !exp.company.trim() ||
                    !exp.description.trim()
                )
              }
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg mt-8"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generando Recomendaciones...
                </>
              ) : (
                <>
                  Generar Recomendaciones
                  <Sparkles className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Panel Derecho - Recomendaciones y Tips */}
        <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Tus Recomendaciones y Tips de LinkedIn
          </h2>

          {isLoading && (
            <div className="flex flex-col items-center justify-center h-64 text-gray-600">
              <Loader2 className="h-12 w-12 animate-spin text-blue-500 mb-4" />
              <p className="text-lg">
                Analizando tu perfil y generando sugerencias...
              </p>
            </div>
          )}

          {!recommendations && !isLoading && (
            <div className="text-center text-gray-500 py-12">
              <Linkedin className="w-20 h-20 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">
                Ingresa tu información en el formulario para obtener
                recomendaciones personalizadas.
              </p>
            </div>
          )}

          {recommendations && (
            <div className="space-y-6">
              {/* Titular */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader className="flex flex-row items-center space-x-3 p-4 pb-2">
                  <User className="w-6 h-6 text-blue-600" />
                  <CardTitle className="text-xl text-blue-900">
                    Titular Sugerido
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-blue-800 font-medium">
                    {recommendations.headline}
                  </p>
                  <p className="text-sm text-blue-700 mt-2">
                    <Lightbulb className="inline w-4 h-4 mr-1 text-blue-500" />
                    Consejo: Incluye tu rol actual, habilidades clave y tu
                    estado (ej. #OpenToWork).
                  </p>
                </CardContent>
              </Card>

              {/* Resumen */}
              <Card className="bg-purple-50 border-purple-200">
                <CardHeader className="flex flex-row items-center space-x-3 p-4 pb-2">
                  <Briefcase className="w-6 h-6 text-purple-600" />
                  <CardTitle className="text-xl text-purple-900">
                    Resumen Sugerido
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-purple-800 whitespace-pre-line">
                    {recommendations.summary}
                  </p>
                  <p className="text-sm text-purple-700 mt-2">
                    <Lightbulb className="inline w-4 h-4 mr-1 text-purple-500" />
                    Consejo: Cuenta tu historia profesional, tus pasiones y lo
                    que buscas.
                  </p>
                </CardContent>
              </Card>

              {/* Sugerencias de Experiencia */}
              {recommendations.experienceSuggestions.length > 0 && (
                <Card className="bg-green-50 border-green-200">
                  <CardHeader className="flex flex-row items-center space-x-3 p-4 pb-2">
                    <GraduationCap className="w-6 h-6 text-green-600" />
                    <CardTitle className="text-xl text-green-900">
                      Sugerencias para Experiencias
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-4">
                    {recommendations.experienceSuggestions.map((exp, index) => (
                      <div key={index}>
                        <h4 className="font-semibold text-green-800">
                          {exp.title} en {exp.company}
                        </h4>
                        <p className="text-sm text-green-700">
                          {exp.suggestion}
                        </p>
                      </div>
                    ))}
                    <p className="text-sm text-green-700 mt-2">
                      <Lightbulb className="inline w-4 h-4 mr-1 text-green-500" />
                      Consejo: Usa el formato STAR (Situación, Tarea, Acción,
                      Resultado) para describir tus logros.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Habilidades */}
              {recommendations.skills.length > 0 && (
                <Card className="bg-yellow-50 border-yellow-200">
                  <CardHeader className="flex flex-row items-center space-x-3 p-4 pb-2">
                    <ListChecks className="w-6 h-6 text-yellow-600" />
                    <CardTitle className="text-xl text-yellow-900">
                      Habilidades Clave Sugeridas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex flex-wrap gap-2">
                      {recommendations.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-yellow-100 text-yellow-800 border-yellow-300"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-yellow-700 mt-2">
                      <Lightbulb className="inline w-4 h-4 mr-1 text-yellow-500" />
                      Consejo: Prioriza habilidades que coincidan con los
                      puestos que buscas.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Certificaciones */}
              {recommendations.certifications.length > 0 && (
                <Card className="bg-red-50 border-red-200">
                  <CardHeader className="flex flex-row items-center space-x-3 p-4 pb-2">
                    <Award className="w-6 h-6 text-red-600" />
                    <CardTitle className="text-xl text-red-900">
                      Certificaciones Sugeridas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <ul className="list-disc list-inside text-red-800 space-y-1">
                      {recommendations.certifications.map((cert, index) => (
                        <li key={index}>{cert}</li>
                      ))}
                    </ul>
                    <p className="text-sm text-red-700 mt-2">
                      <Lightbulb className="inline w-4 h-4 mr-1 text-red-500" />
                      Consejo: Las certificaciones validan tus habilidades y
                      aumentan tu credibilidad.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Tips Generales */}
              {recommendations.tips.length > 0 && (
                <Card className="bg-gray-50 border-gray-200">
                  <CardHeader className="flex flex-row items-center space-x-3 p-4 pb-2">
                    <Lightbulb className="w-6 h-6 text-gray-600" />
                    <CardTitle className="text-xl text-gray-900">
                      Tips Adicionales para tu Perfil
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {recommendations.tips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
