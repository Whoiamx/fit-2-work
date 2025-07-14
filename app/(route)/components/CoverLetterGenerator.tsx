"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, RefreshCcw } from "lucide-react";
import { Navbar } from "./Navbar";

export const CoverLetterGenerator = () => {
  const [companyPosition, setCompanyPosition] = useState({
    company: "Creative Solutions Inc.",
    position: "Software Engineer",
  });
  const [workExperience, setWorkExperience] = useState(
    "Como Ingeniero de Software en Tech Innovators, he desarrollado soluciones de software robustas que mejoran la experiencia del usuario y el rendimiento del sistema. En mi rol anterior en Web Solutions Ltd. durante tres años, lideré un equipo en la implementación de una nueva arquitectura de microservicios que redujo los tiempos de respuesta en un 25% y mejoró la escalabilidad. Soy experto en JavaScript, React, Node.js y bases de datos SQL/NoSQL. Busco aplicar mis habilidades en un entorno dinámico y contribuir al éxito de proyectos innovadores."
  );
  const [educationBackground, setEducationBackground] = useState(
    "Tengo una Licenciatura en Ciencias de la Computación de la Universidad Tecnológica Nacional, que completé en Mayo de 2020. Para mejorar mis habilidades, obtuve una certificación en Computación en la Nube de Google Cloud en 2022 y un diplomado en Inteligencia Artificial en 2023."
  );
  const [language, setLanguage] = useState("Español");

  const [generatedLetter, setGeneratedLetter] = useState(
    `Estimado/a Gerente de Contratación,

Estoy emocionado/a de postularme para el puesto de ${companyPosition.position} en ${companyPosition.company}. Con una sólida trayectoria en [campo/industria relevante], aporto [X años] de experiencia en [habilidades/experiencia específicas] y una capacidad probada para generar resultados. Creo que mis habilidades se alinean bien con las necesidades de su equipo, y estoy ansioso/a por contribuir al éxito continuo de [Nombre de la Empresa].

Adjunto mi currículum vitae para su consideración y espero tener la oportunidad de conversar sobre cómo puedo ayudar a lograr sus objetivos.

Atentamente,
[Tu Nombre]`
  );
  const [score, setScore] = useState(3); // 3 estrellas por defecto
  const [modificationProposals, setModificationProposals] = useState([
    "Puedes ingresar tus años de experiencia laboral.",
    "Escribe logros destacados en el trabajo.",
    "Gracias por considerar mi aplicación. He adjuntado mi currículum para su revisión.",
  ]);

  const MAX_COMPANY_POSITION = 500;
  const MAX_WORK_EXPERIENCE = 800;
  const MAX_EDUCATION_BACKGROUND = 500;

  const handleRegenerate = useCallback(() => {
    // Simular la generación de una nueva carta
    const newLetter = `Estimado/a Gerente de Contratación,

Me dirijo a usted con gran entusiasmo para expresar mi interés en la posición de ${
      companyPosition.position
    } en ${
      companyPosition.company
    }. Mi experiencia en ${workExperience.substring(
      0,
      100
    )}... y mi formación en ${educationBackground.substring(
      0,
      100
    )}... me han preparado para contribuir significativamente a su equipo.

Estoy convencido/a de que mis habilidades y mi pasión por [mencionar área clave] son un excelente ajuste para su organización. Adjunto mi CV para su revisión y quedo a su disposición para una entrevista.

Saludos cordiales,
[Tu Nombre]`;
    setGeneratedLetter(newLetter);
    setScore(Math.floor(Math.random() * 5) + 1); // Puntuación aleatoria
    setModificationProposals([
      "Asegúrate de personalizar el saludo con el nombre del gerente si es posible.",
      "Incluye métricas o resultados cuantificables en tu experiencia laboral.",
      "Adapta el párrafo final para reflejar la cultura de la empresa.",
    ]);
    alert("Carta de presentación regenerada.");
  }, [companyPosition, workExperience, educationBackground]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navegación Superior */}
      <Navbar />

      <div className="flex flex-1">
        {/* Panel Izquierdo - Formulario */}
        <div className="w-full lg:w-1/2 bg-white border-r border-gray-200 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Company and Position */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label
                  htmlFor="company-position"
                  className="text-gray-700 font-medium"
                >
                  Empresa y Puesto
                </Label>
                <span className="text-sm text-gray-500">
                  {companyPosition.company.length +
                    companyPosition.position.length +
                    2}{" "}
                  / {MAX_COMPANY_POSITION}
                </span>
              </div>
              <Input
                id="company-name"
                placeholder="Empresa: Creative Solutions Inc."
                value={companyPosition.company}
                onChange={(e) =>
                  setCompanyPosition((prev) => ({
                    ...prev,
                    company: e.target.value,
                  }))
                }
                className="mb-2"
              />
              <Input
                id="position-name"
                placeholder="Puesto: Software Engineer"
                value={companyPosition.position}
                onChange={(e) =>
                  setCompanyPosition((prev) => ({
                    ...prev,
                    position: e.target.value,
                  }))
                }
              />
            </div>

            {/* Work Experience and Skills */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label
                  htmlFor="work-experience"
                  className="text-gray-700 font-medium"
                >
                  Experiencia Laboral y Habilidades
                </Label>
                <span className="text-sm text-gray-500">
                  {workExperience.length} / {MAX_WORK_EXPERIENCE}
                </span>
              </div>
              <Textarea
                id="work-experience"
                placeholder="Describe tu experiencia laboral y habilidades clave..."
                value={workExperience}
                onChange={(e) => setWorkExperience(e.target.value)}
                className="min-h-[150px] resize-y"
              />
            </div>

            {/* Education and Training Background */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label
                  htmlFor="education-background"
                  className="text-gray-700 font-medium"
                >
                  Formación y Educación
                </Label>
                <span className="text-sm text-gray-500">
                  {educationBackground.length} / {MAX_EDUCATION_BACKGROUND}
                </span>
              </div>
              <Textarea
                id="education-background"
                placeholder="Describe tu formación académica y certificaciones..."
                value={educationBackground}
                onChange={(e) => setEducationBackground(e.target.value)}
                className="min-h-[100px] resize-y"
              />
            </div>

            {/* Language */}
            <div>
              <Label
                htmlFor="language"
                className="text-gray-700 font-medium mb-2 block"
              >
                Idioma
              </Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un idioma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Español">Español</SelectItem>
                  <SelectItem value="Inglés">Inglés</SelectItem>
                  <SelectItem value="Portugués">Portugués</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Re-Generate Button */}
          <div className="mt-8 pb-4">
            <Button
              onClick={handleRegenerate}
              className="w-full bg-green-700 hover:bg-green-600 text-white py-3"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Re-Generar
            </Button>
          </div>
        </div>

        {/* Panel Derecho - Resultado */}
        <div className="w-full lg:w-1/2 bg-gray-50 p-6 overflow-y-auto">
          <Card className="shadow-none border-none bg-transparent">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Resultado
                </CardTitle>
              </div>

              {/* Placeholder para tiempo de lectura */}
            </CardHeader>
            <CardContent className="pt-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
                <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                  {generatedLetter}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
