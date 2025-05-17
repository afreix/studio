
"use client";

import { ChatInterface } from "@/components/chat/chat-interface";

export function ChatPageContent() {
  return (
    <div className="flex-1 flex flex-col h-full p-4 md:p-6 overflow-hidden">
      <ChatInterface />
    </div>
  );
}
