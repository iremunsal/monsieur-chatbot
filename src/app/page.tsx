"use client";

import Header from "@/components/Header";
import ChatWindow from "@/components/ChatWindow";
import ChatInput from "@/components/ChatInput";
import FeedbackPanel from "@/components/FeedbackPanel";
import { useChat } from "@/hooks/useChat";

/**
 * Main page that composes the chat interface with a two-column layout:
 * left side shows the chat conversation, right side shows grammar feedback.
 */
export default function Home() {
  const { messages, isLoading, activeFeedback, sendMessage } = useChat();

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex overflow-hidden max-w-6xl w-full mx-auto">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-50 border-r border-gray-200">
          <ChatWindow messages={messages} isLoading={isLoading} />
          <ChatInput onSend={sendMessage} disabled={isLoading} />
        </div>

        {/* Feedback Sidebar */}
        <aside className="hidden md:flex w-80 flex-col bg-white border-l border-gray-100">
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <h2 className="text-sm font-semibold text-gray-700">
              Geri Bildirim
            </h2>
            <p className="text-xs text-gray-500">
              Son cevabınızın analizi
            </p>
          </div>
          <FeedbackPanel feedback={activeFeedback} />
        </aside>
      </main>
    </div>
  );
}
