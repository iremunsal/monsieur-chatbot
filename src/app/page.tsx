"use client";

import { useState } from "react";
import Header from "@/components/Header";
import ChatWindow from "@/components/ChatWindow";
import ChatInput from "@/components/ChatInput";
import FeedbackPanel from "@/components/FeedbackPanel";
import TranslatorWidget from "@/components/TranslatorWidget";
import { useChat } from "@/hooks/useChat";

/**
 * Main page with an elevated card layout.
 * Left: chat conversation area.
 * Right: tabbed sidebar with Feedback and FR-TR Dictionary.
 */
export default function Home() {
  const { messages, isLoading, activeFeedback, sendMessage } = useChat();
  const [activeTab, setActiveTab] = useState<"feedback" | "translator">(
    "feedback"
  );

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

          {/* Sidebar with Tabs */}
          <aside className="hidden md:flex w-[320px] flex-col bg-white md:rounded-r-2xl md:shadow-xl overflow-hidden">
            {/* Tab header */}
            <div className="flex border-b border-gray-100">
              <button
                onClick={() => setActiveTab("feedback")}
                className={`flex-1 px-3 py-3 text-xs font-semibold transition-colors cursor-pointer ${
                  activeTab === "feedback"
                    ? "text-navy-900 border-b-2 border-navy-900 bg-cream-50/50"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                }`}
              >
                📝 Geri Bildirim
              </button>
              <button
                onClick={() => setActiveTab("translator")}
                className={`flex-1 px-3 py-3 text-xs font-semibold transition-colors cursor-pointer ${
                  activeTab === "translator"
                    ? "text-navy-900 border-b-2 border-navy-900 bg-cream-50/50"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                }`}
              >
                🇫🇷 Sözlük (FR↔TR)
              </button>
            </div>

            {/* Tab content */}
            {activeTab === "feedback" ? (
              <FeedbackPanel feedback={activeFeedback} />
            ) : (
              <TranslatorWidget />
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
