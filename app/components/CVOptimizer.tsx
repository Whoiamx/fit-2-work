"use client";

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

import { Upload, Search, Target, CheckCircle, Loader2 } from "lucide-react";
import { Navbar } from "./Navbar";
import { analyzePdf } from "@/lib/use-cases/pdf-analizer.use-case";

export const CVOptimizer = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cvText, setCvText] = useState("");
  const [respuestaIA, setRespuestaIA] = useState("");
  const [textoExtraido, setTextoExtraido] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = useCallback((file: File) => {
    if (file.type === "application/pdf" && file.size <= 10 * 1024 * 1024) {
      setSelectedFile(file);
      setRespuestaIA("");
      setTextoExtraido("");
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

  const handleAnalyze = async () => {
    if (!selectedFile) {
      alert("Por favor, sube un archivo o pega tu CV en texto plano");
      return;
    }

    try {
      setIsLoading(true);
      const data = await analyzePdf(selectedFile);
      setTextoExtraido(data.textoExtraido);
      setRespuestaIA(data.respuestaIA);
    } catch (error) {
      alert("Error al analizar el PDF");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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

            {/* Botón de análisis */}
            <Button
              onClick={handleAnalyze}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
              disabled={!selectedFile || isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analizando...
                </div>
              ) : (
                "Analizar CV"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Resultado IA */}
        {respuestaIA && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Sugerencias del asistente
              </CardTitle>
              <CardDescription>
                Estas recomendaciones están pensadas para mejorar tu perfil
                profesional.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{
                  __html: respuestaIA.replace(/\n/g, "<br />"),
                }}
              />
            </CardContent>
          </Card>
        )}

        {/* Texto extraído */}
        {textoExtraido && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Texto extraído del PDF</CardTitle>
              <CardDescription>
                Este es el contenido leído desde tu archivo CV.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={textoExtraido}
                readOnly
                className="min-h-[200px]"
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
