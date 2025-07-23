"use client";

import Chat from "@/components/ui/Chat";
import { createThreadUseCase } from "@/lib/use-cases/create-thread.use-case";
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
  const [isTyping, setIsTyping] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  // Assistant AI code

  const [threadId, setThreadId] = useState<string>("");

  useEffect(() => {
    const threadId = localStorage.getItem("threadId");
    if (threadId) {
      setThreadId(threadId);
    } else {
      createThreadUseCase()
        .then((id) => {
          console.log("Nuevo threadId:", id);
          setThreadId(id);
          localStorage.setItem("threadId", id);
        })
        .catch((err) => {
          console.error("Error al crear thread:", err);
        });
    }
  }, []);

  // useEffect(() => {
  //   setMessages((prev) => {...prev,{text:}});
  // }, []);

  //OTHER CODE PREVIOUSLY ASSISTANT

  useEffect(() => {
    const welcomeMessage: Message = {
      id: crypto.randomUUID(),
      content:
        "Hola, soy Fito, tu asesor inteligente para prepararte en entrevistas laborales. ¿Para qué puesto querés prepararte? 😊",
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
    setIsTyping(true);
    setLoadingMessage(
      "A continuación te voy a generar posibles preguntas y consejos para el puesto al que estás apuntando..."
    );

    try {
      const result = await simulatorInterviewUseCase(message);

      const assistantMessages: Message[] = [];

      if (result.message.error) {
        assistantMessages.push({
          id: crypto.randomUUID(),
          content: result.message.error,
          role: "assistant",
          timestamp: new Date(),
        });
      } else {
        result.message.questions.forEach((q: string, index: number) => {
          assistantMessages.push({
            id: crypto.randomUUID(),
            content: `🧠 ${q}\n💡 ${result.message.recommended_answers[index]}`,
            role: "assistant",
            timestamp: new Date(),
          });
        });

        result.message.tips.forEach((tip: string) => {
          assistantMessages.push({
            id: crypto.randomUUID(),
            content: `✅ Consejo: ${tip}`,
            role: "assistant",
            timestamp: new Date(),
          });
        });

        assistantMessages.push({
          id: crypto.randomUUID(),
          content: result.message.next_step,
          role: "assistant",
          timestamp: new Date(),
        });
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
    } finally {
      setIsTyping(false);
      setLoadingMessage("");
    }
  };

  const handleMessageAction = (messageId: string, action: string) => {
    console.log(`Acción ${action} en mensaje ${messageId}`);
  };

  return (
    <div className="h-screen">
      <Chat
        title="Fito Chatbot"
        subtitle="Tu asistente de búsqueda laboral"
        onSendMessage={handleSendMessage}
        onMessageAction={handleMessageAction}
        messages={messages}
        loadingMessage={loadingMessage}
      />
    </div>
  );
};
