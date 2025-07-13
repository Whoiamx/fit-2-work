"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText,
  Settings,
  Eye,
  Plus,
  Trash2,
  ImageIcon,
  FileImage,
  ArrowLeft,
  Home,
  Sparkles,
  MessageSquare,
  Linkedin,
  Mail,
  CheckCircle,
  User,
  MapPin,
} from "lucide-react";

interface PersonalInfo {
  fullName: string;
  location: string;
  phone: string;
  email: string;
  links: Array<{ label: string; url: string }>;
}

interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
}

interface Skills {
  technical: string[];
  languages: Array<{ language: string; level: string }>;
}

export const CVCreator = () => {
  const [activeTab, setActiveTab] = useState("Personal");
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: "Juan Pérez",
    location: "Buenos Aires",
    phone: "+54 11 1234-5678",
    email: "juan.perez@ejemplo.com",
    links: [{ label: "LinkedIn", url: "www.linkedin.com/in/juan-perez" }],
  });

  const [summary, setSummary] = useState(
    "Profesional orientado a resultados con experiencia en impulsar el crecimiento empresarial y desarrollar habilidades en diversas áreas, buscando aprovechar la experiencia para lograr el éxito. Con una sólida base en español e inglés y una amplia gama de habilidades técnicas."
  );

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: "1",
      jobTitle: "Desarrollador Frontend",
      company: "Empresa Tecnológica",
      startDate: "Diciembre 2023",
      endDate: "Mayo 2024",
      description:
        "Responsable del desarrollo de interfaces de usuario modernas y responsivas utilizando React y TypeScript. Colaboré estrechamente con el equipo de diseño para implementar experiencias de usuario excepcionales y optimizar el rendimiento de las aplicaciones web.",
    },
    {
      id: "2",
      jobTitle: "Analista de Sistemas",
      company: "Consultora IT",
      startDate: "Junio 2022",
      endDate: "Noviembre 2023",
      description:
        "Análisis y diseño de sistemas de información empresariales. Participé en la implementación de soluciones tecnológicas que mejoraron la eficiencia operativa en un 30% y redujeron los tiempos de procesamiento de datos.",
    },
  ]);

  const [education, setEducation] = useState<Education[]>([
    {
      id: "1",
      degree: "Licenciatura en Sistemas de Información",
      institution: "Universidad Tecnológica Nacional",
      startDate: "Marzo 2018",
      endDate: "Diciembre 2022",
    },
  ]);

  const [skills, setSkills] = useState<Skills>({
    technical: [
      "Lenguajes: JavaScript, TypeScript, Python, Java",
      "Frontend: React, Vue.js, HTML5, CSS3, Tailwind CSS",
      "Backend: Node.js, Express, Django, Spring Boot",
      "Bases de Datos: PostgreSQL, MongoDB, MySQL",
    ],
    languages: [
      { language: "Español", level: "Nativo" },
      { language: "Inglés", level: "Avanzado" },
    ],
  });

  const tabs = [
    "Personal",
    "Resumen",
    "Experiencia",
    "Educación",
    "Habilidades",
  ];

  // Herramientas disponibles para navegación rápida
  const tools = [
    {
      id: "interview-simulator",
      name: "Simulador de Entrevistas",
      icon: MessageSquare,
    },
    { id: "cv-creator", name: "Creador de CV", icon: FileText, active: true },
    { id: "linkedin-strategy", name: "Estrategia LinkedIn", icon: Linkedin },
    { id: "cover-letter", name: "Cartas de Presentación", icon: Mail },
    { id: "cv-optimizer", name: "Optimizador de CV", icon: CheckCircle },
    { id: "linkedin-optimizer", name: "Optimizador LinkedIn", icon: User },
    { id: "job-roadmap", name: "Roadmap Personalizado", icon: MapPin },
  ];

  const addLink = () => {
    setPersonalInfo((prev) => ({
      ...prev,
      links: [...prev.links, { label: "", url: "" }],
    }));
  };

  const removeLink = (index: number) => {
    setPersonalInfo((prev) => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index),
    }));
  };

  const updateLink = (index: number, field: "label" | "url", value: string) => {
    setPersonalInfo((prev) => ({
      ...prev,
      links: prev.links.map((link, i) =>
        i === index ? { ...link, [field]: value } : link
      ),
    }));
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      jobTitle: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    setExperiences([...experiences, newExp]);
  };

  const updateExperience = (
    id: string,
    field: keyof Experience,
    value: string
  ) => {
    setExperiences((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      startDate: "",
      endDate: "",
    };
    setEducation([...education, newEdu]);
  };

  const updateEducation = (
    id: string,
    field: keyof Education,
    value: string
  ) => {
    setEducation((prev) =>
      prev.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter((edu) => edu.id !== id));
  };

  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = "#";
    link.download = `${personalInfo.fullName.replace(/\s+/g, "_")}_CV.pdf`;
    link.click();
    alert("Descargando CV como PDF...");
  };

  const downloadWord = () => {
    const link = document.createElement("a");
    link.href = "#";
    link.download = `${personalInfo.fullName.replace(/\s+/g, "_")}_CV.docx`;
    link.click();
    alert("Descargando CV como Word...");
  };

  const downloadPNG = () => {
    const link = document.createElement("a");
    link.href = "#";
    link.download = `${personalInfo.fullName.replace(/\s+/g, "_")}_CV.png`;
    link.click();
    alert("Descargando CV como PNG...");
  };

  const goToHome = () => {
    // Simular navegación al home
    alert("Navegando al inicio...");
    // En una app real: router.push('/') o window.location.href = '/'
  };

  const goToTool = (toolId: string) => {
    // Simular navegación a otra herramienta
    alert(`Navegando a: ${tools.find((t) => t.id === toolId)?.name}`);
    // En una app real: router.push(`/tools/${toolId}`)
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navegación Superior */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo y Navegación Principal */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">
                  Fit2Work
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToHome}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Inicio
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToHome}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver
                </Button>
              </div>
            </div>

            {/* Herramientas Rápidas */}
            <div className="hidden lg:flex items-center space-x-2">
              <span className="text-sm text-gray-500 mr-2">Herramientas:</span>
              {tools.slice(0, 4).map((tool) => {
                const IconComponent = tool.icon;
                return (
                  <Button
                    key={tool.id}
                    variant={tool.active ? "default" : "ghost"}
                    size="sm"
                    onClick={() => goToTool(tool.id)}
                    className={`text-xs ${
                      tool.active
                        ? "bg-purple-600 hover:bg-purple-700"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <IconComponent className="w-3 h-3 mr-1" />
                    {tool.name.split(" ")[0]}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      <div className="flex h-screen">
        {/* Panel Izquierdo - Formulario */}
        <div className="w-1/2 bg-gray-800 text-white overflow-y-auto">
          {/* Encabezado */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-semibold">Constructor de CV</h1>
            </div>

            {/* Botones de Exportación */}
            <div className="flex space-x-2">
              <Button
                size="sm"
                className="bg-[#1447E6] text-white"
                onClick={downloadPDF}
              >
                <FileText className="w-4 h-4 mr-1" />
                PDF
              </Button>
              <Button
                size="sm"
                className="bg-gray-600 hover:bg-gray-700 text-white"
                onClick={downloadPNG}
              >
                <ImageIcon className="w-4 h-4 mr-1" />
                PNG
              </Button>
              <Button
                size="sm"
                className="bg-blue-800  text-white"
                onClick={downloadWord}
              >
                <FileImage className="w-4 h-4 mr-1" />
                WORD
              </Button>
            </div>
          </div>

          {/* Pestañas */}
          <div className="flex border-b border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "text-white border-b-2 border-blue-500"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Contenido del Formulario */}
          <div className="p-6">
            {activeTab === "Personal" && (
              <div className="space-y-6">
                <div>
                  <Label className="text-gray-300 mb-2 block">
                    Nombre Completo
                  </Label>
                  <Input
                    value={personalInfo.fullName}
                    onChange={(e) =>
                      setPersonalInfo((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <Label className="text-gray-300 mb-2 block">Ubicación</Label>
                  <Input
                    value={personalInfo.location}
                    onChange={(e) =>
                      setPersonalInfo((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Ciudad, País"
                  />
                </div>

                <div>
                  <Label className="text-gray-300 mb-2 block">Teléfono</Label>
                  <Input
                    value={personalInfo.phone}
                    onChange={(e) =>
                      setPersonalInfo((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="+54 11 1234-5678"
                  />
                </div>

                <div>
                  <Label className="text-gray-300 mb-2 block">Email</Label>
                  <Input
                    value={personalInfo.email}
                    onChange={(e) =>
                      setPersonalInfo((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <Label className="text-gray-300 mb-2 block">Enlaces</Label>
                  {personalInfo.links.map((link, index) => (
                    <div
                      key={index}
                      className="space-y-2 mb-4 p-3 bg-gray-700 rounded"
                    >
                      <div className="flex items-center justify-between">
                        <Label className="text-gray-300 text-sm">
                          Etiqueta
                        </Label>
                        {personalInfo.links.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeLink(index)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <Input
                        value={link.label}
                        onChange={(e) =>
                          updateLink(index, "label", e.target.value)
                        }
                        className="bg-gray-600 border-gray-500 text-white"
                        placeholder="LinkedIn"
                      />
                      <Label className="text-gray-300 text-sm">URL</Label>
                      <Input
                        value={link.url}
                        onChange={(e) =>
                          updateLink(index, "url", e.target.value)
                        }
                        className="bg-gray-600 border-gray-500 text-white"
                        placeholder="www.linkedin.com/in/tu-perfil"
                      />
                    </div>
                  ))}
                  <Button
                    onClick={addLink}
                    className="w-full bg-[#1447E6] hover:bg-green-500 hover:text-black text-white"
                  >
                    Agregar Enlace
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "Resumen" && (
              <div>
                <Label className="text-gray-300 mb-2 block">
                  Resumen Profesional
                </Label>
                <Textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white min-h-[200px]"
                  placeholder="Escribe un resumen convincente de tu experiencia profesional..."
                />
              </div>
            )}

            {activeTab === "Experiencia" && (
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div
                    key={exp.id}
                    className="p-4 bg-gray-700 rounded space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-medium">
                        Experiencia {index + 1}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExperience(exp.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-300 text-sm">
                          Puesto de Trabajo
                        </Label>
                        <Input
                          value={exp.jobTitle}
                          onChange={(e) =>
                            updateExperience(exp.id, "jobTitle", e.target.value)
                          }
                          className="bg-gray-600 border-gray-500 text-white"
                          placeholder="Desarrollador Frontend"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-300 text-sm">Empresa</Label>
                        <Input
                          value={exp.company}
                          onChange={(e) =>
                            updateExperience(exp.id, "company", e.target.value)
                          }
                          className="bg-gray-600 border-gray-500 text-white"
                          placeholder="Nombre de la empresa"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-300 text-sm">
                          Fecha de Inicio
                        </Label>
                        <Input
                          value={exp.startDate}
                          onChange={(e) =>
                            updateExperience(
                              exp.id,
                              "startDate",
                              e.target.value
                            )
                          }
                          className="bg-gray-600 border-gray-500 text-white"
                          placeholder="Enero 2023"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-300 text-sm">
                          Fecha de Fin
                        </Label>
                        <Input
                          value={exp.endDate}
                          onChange={(e) =>
                            updateExperience(exp.id, "endDate", e.target.value)
                          }
                          className="bg-gray-600 border-gray-500 text-white"
                          placeholder="Actual"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-gray-300 text-sm">
                        Descripción
                      </Label>
                      <Textarea
                        value={exp.description}
                        onChange={(e) =>
                          updateExperience(
                            exp.id,
                            "description",
                            e.target.value
                          )
                        }
                        className="bg-gray-600 border-gray-500 text-white"
                        rows={4}
                        placeholder="Describe tus responsabilidades y logros en este puesto..."
                      />
                    </div>
                  </div>
                ))}

                <Button
                  onClick={addExperience}
                  className="w-full bg-[#1447E6] hover:bg-green-500 hover:text-black text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Experiencia
                </Button>
              </div>
            )}

            {activeTab === "Educación" && (
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div
                    key={edu.id}
                    className="p-4 bg-gray-700 rounded space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-medium">
                        Educación {index + 1}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEducation(edu.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-gray-300 text-sm">
                          Título/Carrera
                        </Label>
                        <Input
                          value={edu.degree}
                          onChange={(e) =>
                            updateEducation(edu.id, "degree", e.target.value)
                          }
                          className="bg-gray-600 border-gray-500 text-white"
                          placeholder="Licenciatura en Sistemas"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-300 text-sm">
                          Institución
                        </Label>
                        <Input
                          value={edu.institution}
                          onChange={(e) =>
                            updateEducation(
                              edu.id,
                              "institution",
                              e.target.value
                            )
                          }
                          className="bg-gray-600 border-gray-500 text-white"
                          placeholder="Universidad Nacional"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-gray-300 text-sm">
                            Fecha de Inicio
                          </Label>
                          <Input
                            value={edu.startDate}
                            onChange={(e) =>
                              updateEducation(
                                edu.id,
                                "startDate",
                                e.target.value
                              )
                            }
                            className="bg-gray-600 border-gray-500 text-white"
                            placeholder="Marzo 2018"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300 text-sm">
                            Fecha de Graduación
                          </Label>
                          <Input
                            value={edu.endDate}
                            onChange={(e) =>
                              updateEducation(edu.id, "endDate", e.target.value)
                            }
                            className="bg-gray-600 border-gray-500 text-white"
                            placeholder="Diciembre 2022"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  onClick={addEducation}
                  className="w-full bg-[#1447E6] hover:bg-green-500 hover:text-black text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Educación
                </Button>
              </div>
            )}

            {activeTab === "Habilidades" && (
              <div className="space-y-6">
                <div>
                  <Label className="text-gray-300 mb-2 block">
                    Habilidades Técnicas
                  </Label>
                  {skills.technical.map((skill, index) => (
                    <div key={index} className="mb-2">
                      <Input
                        value={skill}
                        onChange={(e) => {
                          const newSkills = [...skills.technical];
                          newSkills[index] = e.target.value;
                          setSkills((prev) => ({
                            ...prev,
                            technical: newSkills,
                          }));
                        }}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="JavaScript, React, Node.js..."
                      />
                    </div>
                  ))}
                  <Button
                    onClick={() =>
                      setSkills((prev) => ({
                        ...prev,
                        technical: [...prev.technical, ""],
                      }))
                    }
                    className="w-full bg-[#1447E6] hover:bg-green-500 hover:text-black text-white mt-2"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Categoría
                  </Button>
                </div>

                <div>
                  <Label className="text-gray-300 mb-2 block">Idiomas</Label>
                  {skills.languages.map((lang, index) => (
                    <div key={index} className="grid grid-cols-2 gap-2 mb-2">
                      <Input
                        value={lang.language}
                        onChange={(e) => {
                          const newLangs = [...skills.languages];
                          newLangs[index] = {
                            ...newLangs[index],
                            language: e.target.value,
                          };
                          setSkills((prev) => ({
                            ...prev,
                            languages: newLangs,
                          }));
                        }}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="Español"
                      />
                      <Input
                        value={lang.level}
                        onChange={(e) => {
                          const newLangs = [...skills.languages];
                          newLangs[index] = {
                            ...newLangs[index],
                            level: e.target.value,
                          };
                          setSkills((prev) => ({
                            ...prev,
                            languages: newLangs,
                          }));
                        }}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="Nativo"
                      />
                    </div>
                  ))}
                  <Button
                    onClick={() =>
                      setSkills((prev) => ({
                        ...prev,
                        languages: [
                          ...prev.languages,
                          { language: "", level: "" },
                        ],
                      }))
                    }
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white mt-2"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Idioma
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Panel Derecho - Vista Previa del CV */}
        <div className="w-1/2 bg-gray-100 p-8 overflow-y-auto">
          <div
            className="max-w-2xl mx-auto bg-white shadow-lg"
            style={{ aspectRatio: "8.5/11" }}
          >
            <div className="p-8 h-full">
              {/* Encabezado */}
              <div className="text-center mb-6 pb-4 border-b-2 border-gray-800">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {personalInfo.fullName || "Tu Nombre"}
                </h1>
                <div className="text-sm text-gray-600">
                  <span>{personalInfo.location}</span>
                  {personalInfo.location && personalInfo.phone && (
                    <span> • </span>
                  )}
                  <span>{personalInfo.phone}</span>
                  {personalInfo.phone && personalInfo.email && <span> • </span>}
                  <span>{personalInfo.email}</span>
                </div>
                {personalInfo.links.length > 0 && (
                  <div className="text-sm text-blue-600 mt-1">
                    {personalInfo.links.map((link, index) => (
                      <span key={index}>
                        {link.url}
                        {index < personalInfo.links.length - 1 && (
                          <span> • </span>
                        )}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Resumen */}
              {summary && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-800 pb-1">
                    RESUMEN
                  </h2>
                  <p className="text-sm text-gray-700 leading-relaxed text-justify">
                    {summary}
                  </p>
                </div>
              )}

              {/* Experiencia Laboral */}
              {experiences.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-800 pb-1">
                    EXPERIENCIA LABORAL
                  </h2>
                  {experiences.map((exp) => (
                    <div key={exp.id} className="mb-4">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <span className="font-semibold text-gray-900">
                            {exp.jobTitle}
                          </span>
                          {exp.company && (
                            <>
                              <span className="text-gray-700"> | </span>
                              <span className="text-gray-700">
                                {exp.company}
                              </span>
                            </>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          {exp.startDate} - {exp.endDate}
                        </div>
                      </div>
                      {exp.description && (
                        <p className="text-sm text-gray-700 leading-relaxed text-justify">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Educación */}
              {education.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-800 pb-1">
                    EDUCACIÓN
                  </h2>
                  {education.map((edu) => (
                    <div key={edu.id} className="mb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {edu.degree}
                          </div>
                          <div className="text-gray-700">{edu.institution}</div>
                        </div>
                        <div className="text-sm text-gray-600">
                          {edu.startDate} - {edu.endDate}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Información Adicional */}
              {(skills.technical.length > 0 || skills.languages.length > 0) && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-800 pb-1">
                    INFORMACIÓN ADICIONAL
                  </h2>

                  {skills.technical.length > 0 && (
                    <div className="mb-3">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Habilidades Técnicas
                      </h3>
                      <ul className="text-sm text-gray-700">
                        {skills.technical.map((skill, index) => (
                          <li key={index} className="mb-1">
                            • {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {skills.languages.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Idiomas
                      </h3>
                      <ul className="text-sm text-gray-700">
                        {skills.languages.map((lang, index) => (
                          <li key={index} className="mb-1">
                            • {lang.language}: {lang.level}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
