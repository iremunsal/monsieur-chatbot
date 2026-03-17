"use client";

import Header from "@/components/Header";
import ChatWindow from "@/components/ChatWindow";
import ChatInput from "@/components/ChatInput";
import FeedbackPanel from "@/components/FeedbackPanel";
import { useChat } from "@/hooks/useChat";

/**
 * Main page with an elevated card layout.
 * Left: chat conversation area. Right: feedback sidebar.
 * Wrapped in a themed container with subtle background gradient.
 */
export default function Home() {
  const { messages, isLoading, activeFeedback, sendMessage } = useChat();

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex max-w-7xl w-full mx-auto my-0 md:my-4 md:mx-6 lg:mx-auto">
          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-cream-50/50 md:rounded-l-2xl md:shadow-xl overflow-hidden border-r border-gray-200/40">
            <ChatWindow messages={messages} isLoading={isLoading} />
            <ChatInput onSend={sendMessage} disabled={isLoading} />
          </div>

          {/* Feedback Sidebar */}
          <aside className="hidden md:flex w-[320px] flex-col bg-white md:rounded-r-2xl md:shadow-xl overflow-hidden">
            <div className="px-4 py-3.5 border-b border-gray-100 bg-gradient-to-r from-cream-50 to-white">
              <h2 className="text-sm font-bold text-navy-900">
                Geri Bildirim
              </h2>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Son cevabınızın detaylı analizi
              </p>
            </div>
            <FeedbackPanel feedback={activeFeedback} />
          </aside>
        </div>
      </main>
    </div>
  );
}
