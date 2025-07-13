import { Sparkles } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold">
                Fit<span className=" text-blue-500">2</span>Work
              </span>
            </div>
            <p className="text-gray-400">
              La plataforma más completa para potenciar tu búsqueda laboral con
              IA.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Herramientas</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Creador de CV</li>
              <li>Simulador de Entrevistas</li>
              <li>Optimizador LinkedIn</li>
              <li>Cartas de Presentación</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Plantillas</li>
              <li>Soporte</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Sobre nosotros</li>
              <li>Contacto</li>
              <li>Privacidad</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
