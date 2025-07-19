"use client";

import Chat from "@/components/ui/Chat";
import { simulatorInterviewUseCase } from "@/lib/use-cases/simulator.usecase";
import { useEffect, useState } from "react";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = async (message: string) => {
    // Agregamos el mensaje del usuario
    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: message,
      role: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const result = await simulatorInterviewUseCase(message);
      const { message: assistantMsg } = result;

      const assistantMessages = [
        assistantMsg.message,
        ...assistantMsg.sugerency,
        assistantMsg.call_to_action,
        assistantMsg.finally,
      ].map((text) => ({
        id: crypto.randomUUID(),
        content: text,
        role: "assistant" as const,
        timestamp: new Date(),
      }));

      setMessages((prev) => [...prev, ...assistantMessages]);
    } catch (error) {
      console.error("Error al obtener respuesta del simulador:", error);
      // Opcional: mostrar mensaje de error como mensaje del asistente
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          content:
            "Lo siento, hubo un error al obtener la respuesta. Por favor, intenta nuevamente.",
          role: "assistant",
          timestamp: new Date(),
        },
      ]);
    }
  };

  const handleMessageAction = (messageId: string, action: string) => {
    console.log(`Acción ${action} en mensaje ${messageId}`);
  };

  return (
    <div className="h-screen">
      <Chat
        title="Fit2Work Chatbot"
        subtitle="Tu asistente de búsqueda laboral"
        onSendMessage={handleSendMessage}
        onMessageAction={handleMessageAction}
        messages={messages}
      />
    </div>
  );
};
