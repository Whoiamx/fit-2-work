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
  const [ctaShown, setCtaShown] = useState(false);
  const [redirectShown, setRedirectShown] = useState(false);

  useEffect(() => {
    const welcomeMessage: Message = {
      id: crypto.randomUUID(),
      content:
        "¡Hola! Soy Fito, tu asesor inteligente de Fit2Work 😊 Estoy acá para ayudarte a preparar tus entrevistas de trabajo y que tengas éxito.",
      role: "assistant",
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleSendMessage = async (message: string) => {
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

      const assistantMessages: Message[] = [];

      // Agrega sugerencias
      assistantMsg.sugerency.forEach((s: any) => {
        assistantMessages.push({
          id: crypto.randomUUID(),
          content: s,
          role: "assistant",
          timestamp: new Date(),
        });
      });

      // call_to_action (una sola vez)
      if (assistantMsg.call_to_action && !ctaShown) {
        assistantMessages.push({
          id: crypto.randomUUID(),
          content: assistantMsg.call_to_action,
          role: "assistant",
          timestamp: new Date(),
        });
        setCtaShown(true);
      }

      // redirect_message (una sola vez)
      if (assistantMsg.redirect_message && !redirectShown) {
        assistantMessages.push({
          id: crypto.randomUUID(),
          content: assistantMsg.redirect_message,
          role: "assistant",
          timestamp: new Date(),
        });
        setRedirectShown(true);
      }

      setMessages((prev) => [...prev, ...assistantMessages]);
    } catch (error) {
      console.error("Error al obtener respuesta del simulador:", error);
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
