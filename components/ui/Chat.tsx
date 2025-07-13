"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Send,
  Mic,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  ChevronDown,
} from "lucide-react";
import { Navbar } from "@/app/(route)/components/Navbar";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  initialMessage?: string;
  onSendMessage?: (message: string) => void;
  onMessageAction?: (messageId: string, action: string) => void;
  className?: string;
  showTools?: boolean;
  tools?: Array<{ id: string; name: string; icon?: any }>;
}

export default function Chat({
  title = "Fit2Work Chatbot",
  subtitle = "Asistente de búsqueda laboral",
  placeholder = "Pregunta lo que quieras sobre tu búsqueda laboral...",
  initialMessage = "¡Hola! Soy tu asistente de búsqueda laboral con IA. ¿En qué te puedo ayudar hoy? 😊",
  onSendMessage,
  onMessageAction,
  className = "",
  showTools = true,
  tools = [],
}: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: initialMessage,
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Callback para manejar el mensaje
    if (onSendMessage) {
      onSendMessage(inputValue);
    }

    // Simular respuesta de IA
    setIsTyping(true);
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Entiendo tu consulta. Te ayudo con eso de inmediato. ¿Podrías darme más detalles específicos?",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleMessageAction = (messageId: string, action: string) => {
    if (onMessageAction) {
      onMessageAction(messageId, action);
    }
    // Aquí puedes agregar lógica específica para cada acción
    console.log(`Acción ${action} en mensaje ${messageId}`);
  };

  return (
    <div
      className={`flex flex-col h-screen bg-gray-900 text-white ${className}`}
    >
      <Navbar />
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" className="text-white hover:bg-gray-800">
            {title}
            <ChevronDown className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <span>{subtitle}</span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          ></Button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((message) => (
          <div key={message.id} className="flex items-start space-x-3">
            {/* Message Content */}
            <div className="flex-1 space-y-2">
              <div className="bg-transparent">
                <p className="text-gray-100 leading-relaxed">
                  {message.content}
                </p>
              </div>

              {/* Message Actions (solo para mensajes del asistente) */}
              {message.role === "assistant" && (
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white hover:bg-gray-800 p-1 h-8 w-8"
                    onClick={() => handleMessageAction(message.id, "copy")}
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white hover:bg-gray-800 p-1 h-8 w-8"
                    onClick={() => handleMessageAction(message.id, "like")}
                  >
                    <ThumbsUp className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white hover:bg-gray-800 p-1 h-8 w-8"
                    onClick={() => handleMessageAction(message.id, "dislike")}
                  >
                    <ThumbsDown className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white hover:bg-gray-800 p-1 h-8 w-8"
                    onClick={() =>
                      handleMessageAction(message.id, "regenerate")
                    }
                  >
                    <RotateCcw className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-start space-x-3">
            <div className="flex space-x-1 items-center">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-700">
        <div className="relative">
          <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-3">
            {/* Tools Button */}
            {showTools && <div className="flex items-center space-x-2"></div>}

            {/* Input Field */}
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={placeholder}
              className="flex-1 bg-transparent border-none text-white placeholder-gray-400 focus:ring-0 focus:outline-none"
            />

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-gray-700 p-2"
              >
                <Mic className="w-4 h-4" />
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                size="sm"
                className="bg-white text-gray-900 hover:bg-gray-200 disabled:bg-gray-600 disabled:text-gray-400 p-2"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-500 text-center mt-2">
          Fit2Work Chatbot puede cometer errores. Considera verificar la
          información importante.
        </p>
      </div>
    </div>
  );
}
