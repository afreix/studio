import { SidebarInset } from "@/components/ui/sidebar";
import { ChatPageContent } from "@/components/chat/chat-page";
import { PageHeader } from "@/components/layout/page-header";

export default function ChatPage() {
  return (
    <SidebarInset>
      <PageHeader title="Ask My Life" />
      <main className="flex-1 flex flex-col">
        <ChatPageContent />
      </main>
    </SidebarInset>
  );
}
