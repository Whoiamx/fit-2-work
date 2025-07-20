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
import { Sparkles, WalletCards } from "lucide-react";
import { Navbar } from "./Navbar";
import { coverLetterGenerator } from "@/lib/use-cases/coverletter.usecase";

export const CoverLetterGenerator = () => {
  const [companyPosition, setCompanyPosition] = useState({
    company: "",
    position: "",
  });
  const [workExperience, setWorkExperience] = useState("");
  const [educationBackground, setEducationBackground] = useState("");
  const [language, setLanguage] = useState("Español");

  const [generatedLetter, setGeneratedLetter] = useState("");
  const [loading, setLoading] = useState(false);

  const MAX_COMPANY_POSITION = 500;
  const MAX_WORK_EXPERIENCE = 800;
  const MAX_EDUCATION_BACKGROUND = 500;

  const handleGenerate = useCallback(async () => {
    if (
      !companyPosition.company.trim() ||
      !companyPosition.position.trim() ||
      !workExperience.trim() ||
      !educationBackground.trim()
    ) {
      alert("Por favor completá todos los campos antes de generar la carta.");
      return;
    }

    setLoading(true);
    setGeneratedLetter("");

    try {
      const prompt = `
Empresa: ${companyPosition.company.trim()}
Puesto: ${companyPosition.position.trim()}
Experiencia laboral y habilidades: ${workExperience.trim()}
Formación y educación: ${educationBackground.trim()}
Idioma: ${language}
`;

      const data = await coverLetterGenerator(prompt);

      // Manejo flexible de la respuesta: puede venir como 'message' o 'content'
      const carta =
        typeof data === "object" && typeof data.message === "string"
          ? data.message
          : typeof data === "object" && typeof data.content === "string"
          ? data.content
          : typeof data === "string"
          ? data
          : null;

      if (carta) {
        setGeneratedLetter(carta.trim());
      } else {
        alert(
          "No se pudo generar la carta. Respuesta inesperada del servidor."
        );
        console.error("Respuesta inesperada:", data);
      }
    } catch (error) {
      console.error("Error al generar carta:", error);
      alert("Hubo un error al generar la carta. Reintentá más tarde.");
    } finally {
      setLoading(false);
    }
  }, [companyPosition, workExperience, educationBackground, language]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        {/* Formulario */}
        <div className="w-full lg:w-1/2 bg-white border-r border-gray-200 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Empresa y puesto */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-gray-700 font-medium">
                  Empresa y Puesto
                </Label>
                <span className="text-sm text-gray-500">
                  {companyPosition.company.length +
                    companyPosition.position.length}{" "}
                  / {MAX_COMPANY_POSITION}
                </span>
              </div>
              <Input
                placeholder="Ej: Meta"
                value={companyPosition.company}
                maxLength={MAX_COMPANY_POSITION}
                onChange={(e) =>
                  setCompanyPosition((prev) => ({
                    ...prev,
                    company: e.target.value,
                  }))
                }
                className="mb-2"
                disabled={loading}
              />
              <Input
                placeholder="Ej: Analista Funcional"
                value={companyPosition.position}
                maxLength={MAX_COMPANY_POSITION}
                onChange={(e) =>
                  setCompanyPosition((prev) => ({
                    ...prev,
                    position: e.target.value,
                  }))
                }
                disabled={loading}
              />
            </div>

            {/* Experiencia */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-gray-700 font-medium">
                  Experiencia Laboral y Habilidades
                </Label>
                <span className="text-sm text-gray-500">
                  {workExperience.length} / {MAX_WORK_EXPERIENCE}
                </span>
              </div>
              <Textarea
                placeholder="Describí tu experiencia laboral y principales habilidades..."
                value={workExperience}
                maxLength={MAX_WORK_EXPERIENCE}
                onChange={(e) => setWorkExperience(e.target.value)}
                className="min-h-[150px] resize-y"
                disabled={loading}
              />
            </div>

            {/* Educación */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-gray-700 font-medium">
                  Formación y Educación
                </Label>
                <span className="text-sm text-gray-500">
                  {educationBackground.length} / {MAX_EDUCATION_BACKGROUND}
                </span>
              </div>
              <Textarea
                placeholder="Contá tu formación académica o técnica..."
                value={educationBackground}
                maxLength={MAX_EDUCATION_BACKGROUND}
                onChange={(e) => setEducationBackground(e.target.value)}
                className="min-h-[100px] resize-y"
                disabled={loading}
              />
            </div>

            {/* Idioma */}
            <div>
              <Label className="text-gray-700 font-medium mb-2 block">
                Idioma
              </Label>
              <Select
                value={language}
                onValueChange={setLanguage}
                disabled={loading}
              >
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

          {/* Botón */}
          <div className="mt-8 pb-4">
            <Button
              onClick={handleGenerate}
              className="w-full bg-green-700 hover:bg-green-600 text-white py-3"
              disabled={loading}
              type="button"
            >
              <WalletCards className="mr-2 h-5 w-5" />
              {loading ? "Generando..." : "Generar Carta de Presentación"}
            </Button>
          </div>
        </div>

        {/* Resultado */}
        <div className="w-full lg:w-1/2 bg-gray-50 p-6 overflow-y-auto">
          <Card className="shadow-none border-none bg-transparent">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Resultado
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              {generatedLetter ? (
                <>
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
                    <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                      {generatedLetter}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(generatedLetter);
                      alert("Carta copiada al portapapeles.");
                    }}
                    disabled={loading}
                  >
                    Copiar carta al portapapeles
                  </Button>
                </>
              ) : (
                <p className="text-gray-500">Tu carta aparecerá aquí…</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
