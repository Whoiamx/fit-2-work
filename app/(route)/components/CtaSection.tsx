import { Button } from "@/components/ui/button";
import { ArrowRight, HandCoins } from "lucide-react";
import Link from "next/link";

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
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link href="#tools">
            <Button
              size="lg"
              className="bg-white text-blue-600 cursor-pointer hover:bg-gray-100 text-lg px-8 py-3"
            >
              Comenzar
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white text-center cursor-pointer  hover:bg-blue-900 hover:text-white text-lg px-8 py-3 bg-transparent"
          >
            <Link
              href="https://cafecito.app/gaastontimchuk"
              target="_blank"
            ></Link>
            Apoyar al proyecto <HandCoins />
          </Button>
        </div>
        <p className="text-sm text-blue-200 mt-4">
          <i>
            * Tu apoyo es fundamental para seguir mejorando y ofreciendo nuevas
            funcionalidades.
          </i>{" "}
        </p>
      </div>
    </section>
  );
};
