"use client";

import { useState, useCallback } from "react";
import { ChatMessage, ChatResponse, Feedback } from "@/types/chat";
import { getWelcomeMessage } from "@/services/chatService";

/**
 * Custom hook that manages chat state and message handling.
 * Tracks messages, loading state, active feedback, and communicates with the API.
 */
export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([getWelcomeMessage()]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFeedback, setActiveFeedback] = useState<Feedback | null>(null);

  const sendMessage = useCallback(
    async (text: string) => {
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        contentFr: text,
        contentEn: text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text,
            messageCount: messages.length,
          }),
        });

        if (!res.ok) throw new Error("API error");

        const data: ChatResponse = await res.json();

        const assistantMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          contentFr: data.responseFr,
          contentEn: data.responseEn,
          timestamp: new Date(),
          feedback: data.feedback,
        };

        setMessages((prev) => [...prev, assistantMessage]);

        // If there's an image challenge, add it as a separate message
        if (data.imageChallenge) {
          const challengeMessage: ChatMessage = {
            id: `challenge-${Date.now()}`,
            role: "assistant",
            contentFr: data.imageChallenge.questionFr,
            contentEn: data.imageChallenge.questionEn,
            timestamp: new Date(),
            imageUrl: data.imageChallenge.imageUrl,
            imageQuestion: data.imageChallenge.questionFr,
          };
          setMessages((prev) => [...prev, challengeMessage]);
        }

        if (data.feedback) {
          setActiveFeedback(data.feedback);
        }
      } catch (error) {
        console.error("Failed to send message:", error);
        const errorMessage: ChatMessage = {
          id: `error-${Date.now()}`,
          role: "assistant",
          contentFr: "Désolé, une erreur s'est produite. Veuillez réessayer.",
          contentEn: "Sorry, an error occurred. Please try again.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages.length]
  );

  return { messages, isLoading, activeFeedback, sendMessage };
}
