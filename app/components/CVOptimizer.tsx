"use client";

import type React from "react";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Upload,
  Search,
  Target,
  CheckCircle,
  Info,
  ArrowLeft,
  Home,
  Sparkles,
} from "lucide-react";
import { Navbar } from "./Navbar";

export const CVOptimizer = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cvText, setCvText] = useState("");
  const [analysisType, setAnalysisType] = useState("general");
  const [includeATS, setIncludeATS] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileUpload = useCallback((file: File) => {
    if (file.type === "application/pdf" && file.size <= 10 * 1024 * 1024) {
      setSelectedFile(file);
      console.log("Archivo subido:", file.name);
    } else {
      alert("Por favor, sube un archivo PDF de máximo 10MB");
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFileUpload(files[0]);
      }
    },
    [handleFileUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleAnalyze = () => {
    if (!selectedFile && !cvText.trim()) {
      alert("Por favor, sube un archivo o pega tu CV en texto plano");
      return;
    }

    console.log("Analizando CV:", {
      file: selectedFile?.name,
      textLength: cvText.length,
      analysisType,
      includeATS,
    });

    alert(
      "¡Análisis iniciado! En una aplicación real, aquí se procesaría tu CV."
    );
  };

  const goToHome = () => {
    alert("Navegando al inicio...");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            ¿Qué podes esperar de nuestro optimizador de CV?
          </h1>
          <Button variant="link" className="text-blue-600 hover:text-blue-800">
            Ver más
          </Button>
        </div>

        {/* Expectativas */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-blue-600" />
                <CardTitle className="text-lg">Análisis General</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Recibe sugerencias detalladas sobre la estructura, formato y
                contenido de tu CV.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-green-600" />
                <CardTitle className="text-lg">Análisis ATS</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Optimiza tu CV para los sistemas de seguimiento de candidatos
                (ATS) con sugerencias específicas.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Analiza tu CV */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Analiza tu CV</CardTitle>
            <CardDescription>
              Sube tu CV en PDF o pégalo como texto para recibir sugerencias de
              mejora
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* File Upload Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragOver
                  ? "border-blue-400 bg-blue-50"
                  : selectedFile
                  ? "border-green-400 bg-green-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="space-y-4">
                  {selectedFile ? (
                    <>
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                      <div>
                        <p className="text-green-700 font-medium">
                          {selectedFile.name}
                        </p>
                        <p className="text-sm text-green-600">
                          Archivo subido correctamente
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                      <div>
                        <p className="text-gray-700 font-medium">
                          Sube un archivo o arrástralo aquí
                        </p>
                        <p className="text-sm text-gray-500">PDF hasta 10MB</p>
                      </div>
                    </>
                  )}
                </div>
              </label>
            </div>

            {/* Text Area */}
            <div className="space-y-2">
              <Label
                htmlFor="cv-text"
                className="text-sm font-medium text-gray-700"
              >
                Pega tu CV en texto plano
              </Label>
              <Textarea
                id="cv-text"
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
                placeholder="Pega tu CV aquí..."
                className="min-h-[120px] resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Tipos de Análisis */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-xl text-blue-900">
              Tipos de Análisis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-blue-900">
                  Análisis General
                </h3>
                <p className="text-sm text-blue-800">
                  Ideal para una revisión general de tu CV. Recibirás
                  sugerencias sobre estructura, formato y contenido general.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-blue-900">
                  Análisis Específico
                </h3>
                <p className="text-sm text-blue-800">
                  Optimiza tu CV para un puesto específico. Al agregar la
                  descripción del puesto, recibirás sugerencias personalizadas
                  para destacar las habilidades y experiencia más relevantes.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-blue-900">
                  Análisis por Sección
                </h3>
                <p className="text-sm text-blue-800">
                  Enfócate en mejorar una sección específica de tu CV. Ideal
                  para perfeccionar áreas particulares.
                </p>
              </div>
            </div>

            {/* Radio Group */}
            <RadioGroup
              value={analysisType}
              onValueChange={setAnalysisType}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="general" id="general" />
                <Label htmlFor="general" className="text-sm font-medium">
                  Análisis General
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="specific" id="specific" />
                <Label htmlFor="specific" className="text-sm font-medium">
                  Análisis Específico
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="section" id="section" />
                <Label htmlFor="section" className="text-sm font-medium">
                  Análisis por Sección
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Analyze Button */}
        <Button
          onClick={handleAnalyze}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
        >
          Analizar CV
        </Button>

        {/* Footer Info */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600">
            ¿Tienes dudas sobre cómo funciona el optimizador?
          </p>
          <Button
            variant="link"
            className="text-blue-600 hover:text-blue-800 p-0"
          >
            <Info className="w-4 h-4 mr-1" />
            Ver información detallada
          </Button>
        </div>
      </div>
    </div>
  );
};
