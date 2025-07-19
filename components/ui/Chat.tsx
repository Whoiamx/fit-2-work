"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Send, Copy, ThumbsUp, ThumbsDown, ChevronDown } from "lucide-react";

import { Navbar } from "@/app/(route)/components/Navbar";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ChatProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  messages?: Message[];
  onSendMessage?: (message: string) => void;
  onMessageAction?: (messageId: string, action: string) => void;
  className?: string;
  showTools?: boolean;
}

export default function Chat({
  title = "Fito Chatbot Inteligente",
  subtitle = "Asistente de búsqueda laboral",
  messages = [],
  onSendMessage,
  onMessageAction,
  className = "",
  showTools = true,
  placeholder = "Escribí tu mensaje...",
}: ChatProps) {
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    onSendMessage?.(inputValue.trim());
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => setIsTyping(false), 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      className={`flex flex-col h-screen bg-gray-900 text-white ${className}`}
    >
      <Navbar />

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
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 group ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="flex-1 max-w-xl space-y-2">
              <div
                className={`rounded-lg p-3 ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-100"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>

              {msg.role === "assistant" && (
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white hover:bg-gray-800 p-1 h-8 w-8"
                    onClick={() => onMessageAction?.(msg.id, "copy")}
                    aria-label="Copiar mensaje"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}

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

      <div className="p-4 border-t border-gray-700">
        <div className="relative">
          <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-3">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="flex-1 bg-transparent border-none text-white placeholder-gray-400 focus:ring-0 focus:outline-none"
              spellCheck={false}
              autoComplete="off"
              autoFocus
            />
            <div className="flex items-center space-x-2">
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                size="sm"
                className="bg-white text-gray-900 hover:bg-gray-200 disabled:bg-gray-600 disabled:text-gray-400 p-2"
                aria-label="Enviar mensaje"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500 text-center mt-2">
          Fit2Work Chatbot puede cometer errores. Considera verificar la
          información importante.
        </p>
      </div>
    </div>
  );
}
