"use client";

import Chat from "@/components/ui/Chat";
import { User, MessageSquare, FileText, Linkedin } from "lucide-react";

export const Chatbot = () => {
  const handleSendMessage = (message: string) => {
    console.log("Mensaje enviado:", message);
    // Aquí puedes agregar lógica para procesar el mensaje
  };

  const handleMessageAction = (messageId: string, action: string) => {
    console.log(`Acción ${action} en mensaje ${messageId}`);
    // Aquí puedes agregar lógica para manejar las acciones
  };

  const customTools = [
    { id: "cv-creator", name: "Crear CV", icon: FileText },
    { id: "interview-prep", name: "Entrevista", icon: MessageSquare },
    { id: "linkedin-help", name: "LinkedIn", icon: Linkedin },
    { id: "cover-letter", name: "Carta", icon: User },
  ];

  return (
    <div className="h-screen">
      <Chat
        title="Fit2Work Chatbot"
        subtitle="Tu asistente de búsqueda laboral"
        placeholder="Pregunta sobre CVs, entrevistas, LinkedIn..."
        initialMessage="¡Hola! Soy tu asistente especializado en búsqueda laboral. Puedo ayudarte con CVs, preparación de entrevistas, optimización de LinkedIn y mucho más. ¿En qué te puedo ayudar hoy? 😊"
        onSendMessage={handleSendMessage}
        onMessageAction={handleMessageAction}
        showTools={true}
        tools={customTools}
      />
    </div>
  );
};
