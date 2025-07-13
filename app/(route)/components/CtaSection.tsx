import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CtaSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-800 to-blue-600 py-16">
      <div className="container flex flex-col gap-4 p-2 mx-auto px-4 text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
          ¿Listo para conseguir tu trabajo ideal?
        </h3>
        <p className="text-xl text-nowrap text-blue-100 mb-8 max-w-2xl mx-auto">
          Perfecciona tu búsqueda laboral con nuestras herramientas impulsadas
          por <b>IA.</b>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3"
          >
            Comenzar Gratis
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-blue-900 hover:text-white text-lg px-8 py-3 bg-transparent"
          >
            Apoyar al proyecto
          </Button>
        </div>
      </div>
    </section>
  );
};
