import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  CheckCircle,
  FileText,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Sparkles,
  User,
} from "lucide-react";

export const Navbar = () => {
  const tools = [
    {
      id: "interview-simulator",
      name: "Simulador de Entrevistas",
      icon: MessageSquare,
    },
    { id: "cv-creator", name: "Creador de CV", icon: FileText, active: true },
    { id: "linkedin-strategy", name: "Estrategia LinkedIn", icon: Linkedin },
    { id: "cover-letter", name: "Carta de Presentación", icon: Mail },
    { id: "cv-optimizer", name: "Optimizador de CV", icon: CheckCircle },
    { id: "linkedin-optimizer", name: "Optimizador LinkedIn", icon: User },
    { id: "job-roadmap", name: "Roadmap Personalizado", icon: MapPin },
  ];

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
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo y Navegación Principal */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                Fit<span className="text-blue-600">2</span>Work
              </span>
            </div>

            <div className="flex items-center space-x-4">
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
                      ? "bg-blue-600 hover:bg-blue-700"
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
  );
};
