"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  Home,
  Sparkles,
  Users,
  Link,
  ExternalLink,
} from "lucide-react";
import { Navbar } from "./Navbar";

interface Community {
  name: string;
  description: string;
  links: Array<{ label: string; url: string }>;
}

const communities: Community[] = [
  {
    name: "Comunidad de Desarrolladores Argentina (CDA)",
    description:
      "Una de las comunidades de desarrollo más grandes de Argentina. Ofrecen meetups, charlas, y un espacio activo para compartir conocimientos y oportunidades laborales. Ideal para networking y aprender de otros profesionales.",
    links: [
      { label: "Sitio Web", url: "https://www.comunidaddev.com.ar/" },
      { label: "Discord", url: "https://discord.gg/examplecda" },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/comunidad-de-desarrolladores-argentina/",
      },
    ],
  },
  {
    name: "Mujeres en Tecnología (MeT)",
    description:
      "Comunidad dedicada a fomentar la participación y el crecimiento de mujeres en el ámbito tecnológico. Ofrecen mentorías, talleres y un fuerte apoyo para la inserción laboral y el desarrollo profesional.",
    links: [
      { label: "Sitio Web", url: "https://www.mujeresentecnologia.org/" },
      { label: "Slack", url: "https://slack.mujeresentecnologia.org/" },
    ],
  },
  {
    name: "Frontend Café",
    description:
      "Un espacio vibrante para entusiastas y profesionales del desarrollo frontend. Organizan eventos, comparten recursos y discuten las últimas tendencias. Excelente para mantenerse actualizado y encontrar colegas.",
    links: [
      { label: "Sitio Web", url: "https://frontend.cafe/" },
      { label: "YouTube", url: "https://www.youtube.com/c/FrontendCafe" },
    ],
  },
  {
    name: "Python Argentina",
    description:
      "La comunidad oficial de Python en Argentina. Realizan conferencias (PyCon Ar), meetups y mantienen foros activos. Un lugar clave para aprender Python, resolver dudas y conectar con la industria.",
    links: [
      { label: "Sitio Web", url: "https://python.org.ar/" },
      { label: "Telegram", url: "https://t.me/pythonargentina" },
    ],
  },
  {
    name: "Devs Uruguay",
    description:
      "Comunidad activa de desarrolladores en Uruguay. Fomentan el intercambio de conocimientos, la colaboración en proyectos y la difusión de oportunidades laborales en el sector tecnológico uruguayo.",
    links: [
      { label: "Sitio Web", url: "https://devs.uy/" },
      { label: "Discord", url: "https://discord.gg/devsuy" },
    ],
  },
  {
    name: "UX/UI Argentina",
    description:
      "Comunidad para profesionales y estudiantes de Diseño de Experiencia de Usuario (UX) e Interfaz de Usuario (UI). Comparten recursos, organizan workshops y facilitan el networking en el campo del diseño.",
    links: [
      { label: "Meetup", url: "https://www.meetup.com/es-ES/UX-UI-Argentina/" },
      {
        label: "Facebook",
        url: "https://www.facebook.com/groups/uxuiargentina/",
      },
    ],
  },
];

export default function CommunitiesSection() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="container mx-auto p-6 space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Conecta con Comunidades Clave
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Integrarse en comunidades es fundamental para tu búsqueda laboral.
            Aquí encontrarás apoyo, conocimientos, networking y oportunidades
            exclusivas. ¡Son el lugar ideal para crecer y encontrar tu próximo
            empleo!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map((community, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1"
            >
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <Users className="w-6 h-6 text-blue-600" />
                  <CardTitle className="text-xl group-hover:text-blue-700 transition-colors">
                    {community.name}
                  </CardTitle>
                </div>
                <CardDescription className="text-gray-600 min-h-[80px]">
                  {community.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {community.links.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      <Link className="w-4 h-4 mr-2 flex-shrink-0" />
                      {link.label}
                      <ExternalLink className="w-3 h-3 ml-1 text-blue-500" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
